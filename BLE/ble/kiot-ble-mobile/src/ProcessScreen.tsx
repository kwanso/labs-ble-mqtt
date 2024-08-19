import React, { useState, useEffect, useRef } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  NativeModules,
  NativeEventEmitter,
  Platform,
  PermissionsAndroid,
  FlatList,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';

const SECONDS_TO_SCAN_FOR = 3;
const SERVICE_UUIDS: string[] = [];
const ALLOW_DUPLICATES = true;

import BleManager, {
  BleDisconnectPeripheralEvent,
  BleManagerDidUpdateValueForCharacteristicEvent,
  BleScanCallbackType,
  BleScanMatchMode,
  BleScanMode,
  Peripheral,
  PeripheralInfo,
} from 'react-native-ble-manager';
import {
  BCK_BLE_ITEM_CONNECTED, BCK_BLE_ITEM_NOT_CONNECTED, BTN_COLOR, CHARACTERISTIC_READ_UUID,
  CHARACTERISTIC_WRITE_UUID, ENCODED_OFF, ENCODED_ON, INSTRUCTION_CLICK_BULB, INSTRUCTION_CLICK_PERIPHERAL,
  INSTRUCTION_DEVICE_CONNECTED, INSTRUCTION_DEVICE_DISCONNECTED, INSTRUCTION_ENABLE_BLUETOOTH,
  INSTRUCTION_WAIT_FOR_COMMAND, LED_ICON_SIZE, LED_RESPONSE_OFF, LED_RESPONSE_ON, SERVICE_NAME, SERVICE_UUID,
  TIMEOUT_FOR_ACKNOWLEDGMENT
} from '../src/Constants';
import Toast from 'react-native-toast-message';
import { ToastTypes, showRNToast } from '../src/common/utility';
import LottieView from 'lottie-react-native';
const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

declare module 'react-native-ble-manager' {
  interface Peripheral {
    connected?: boolean;
    connecting?: boolean;
  }
}

const ProcessScreen = () => {
  const [peripheralData, setPeripheralInfo] = useState<PeripheralInfo>();
  const [isScanning, setIsScanning] = useState(false);
  const [ledResponse, setLedResponse] = useState<string>(LED_RESPONSE_OFF);
  const [isBulbClickable, setBulbClickable] = useState(true)
  const [peripherals, setPeripherals] = useState(
    new Map<Peripheral['id'], Peripheral>(),
  );


  const startScan = () => {
    if (!isScanning) {
      setPeripheralInfo(undefined)
      setPeripherals(new Map<Peripheral['id'], Peripheral>());

      try {
        console.debug('kiot-ble-mobile -> starting scan...');
        setIsScanning(true);
        BleManager.scan(SERVICE_UUIDS, SECONDS_TO_SCAN_FOR, ALLOW_DUPLICATES, {
          matchMode: BleScanMatchMode.Sticky,
          scanMode: BleScanMode.LowLatency,
          callbackType: BleScanCallbackType.AllMatches,
        })
          .then(() => {
            console.debug('kiot-ble-mobile -> scan promise returned successfully.');
          })
          .catch((err: any) => {
            console.error('kiot-ble-mobile -> ble scan returned in error', err);
          });
      } catch (error) {
        console.error('kiot-ble-mobile -> ble scan error thrown', error);
      }
    }
  };

  const handleStopScan = () => {
    setIsScanning(false);
    console.debug('kiot-ble-mobile -> scan is stopped.');
  };

  const handleDisconnectedPeripheral = (
    event: BleDisconnectPeripheralEvent,
  ) => {
    console.log("======>", 'disconnected');
    console.debug(
      `kiot-ble-mobile ->[${event.peripheral}] disconnected.`,
    );
    setPeripherals(map => {
      let p = map.get(event.peripheral);
      if (p) {
        p.connected = false;
        return new Map(map.set(event.peripheral, p));
      }
      return map;
    });
    setPeripheralInfo(undefined)
    handleStopScan()
    showRNToast(INSTRUCTION_DEVICE_DISCONNECTED, ToastTypes.ERROR_TOAST)
    setPeripherals(new Map<Peripheral['id'], Peripheral>())

  };

  const handleConnectPeripheral = (event: any) => {
    console.log(`kiot-ble-mobile ->[${event.peripheral}] connected.`);
  };

  const handleUpdateValueForCharacteristic = (
    data: BleManagerDidUpdateValueForCharacteristicEvent,
  ) => {
    console.debug(
      `kiot-ble-mobile -> received data from '${data.peripheral}' with characteristic='${data.characteristic}' and value='${data.value}'`,
    );

  };


  const handleDiscoverPeripheral = (peripheral: Peripheral) => {
    if (peripheral.name === SERVICE_NAME) {
      console.debug('kiot-ble-mobile -> new BLE peripheral=', peripheral);
      if (!peripheral.name) {
        peripheral.name = 'NO NAME';
      }
      setPeripherals(map => {
        return new Map(map.set(peripheral.id, peripheral));
      });
      showRNToast(INSTRUCTION_CLICK_PERIPHERAL, ToastTypes.INFO_TOAST)
    }
  };

  const togglePeripheralConnection = async (peripheral: Peripheral) => {
    if (peripheral && peripheral.connected) {
      try {
        await BleManager.disconnect(peripheral.id);
        showRNToast(INSTRUCTION_DEVICE_DISCONNECTED, ToastTypes.INFO_TOAST)
        setPeripheralInfo(undefined)
      } catch (error) {
        console.error(
          `kiot-ble-mobile ->[${peripheral.id}] error when trying to disconnect device.`,
          error,
        );
      }
    } else {
      await connectPeripheral(peripheral);
      showRNToast(INSTRUCTION_DEVICE_CONNECTED, ToastTypes.INFO_TOAST)
    }
  };


  const connectPeripheral = async (peripheral: Peripheral) => {
    try {
      if (peripheral) {
        setPeripherals(map => {
          let p = map.get(peripheral.id);
          if (p) {
            p.connecting = true;
            return new Map(map.set(p.id, p));
          }
          return map;
        });

        await BleManager.connect(peripheral.id);
        console.debug(`kiot-ble-mobile ->[${peripheral.id}] connected.`);

        setPeripherals(map => {
          let p = map.get(peripheral.id);
          if (p) {
            p.connecting = false;
            p.connected = true;
            return new Map(map.set(p.id, p));
          }
          return map;
        });

        // before retrieving services, it is often a good idea to let bonding & connection finish properly
        await sleep(900);

        /* Test read current RSSI value, retrieve services first */
        const desiredPeripheralData = await BleManager.retrieveServices(peripheral.id);


        setPeripheralInfo(desiredPeripheralData);
        showRNToast(INSTRUCTION_CLICK_BULB, ToastTypes.INFO_TOAST)
      }
    } catch (error) {
      console.error(
        `kiot-ble-mobile ->[${peripheral.id}] connectPeripheral error`,
        error,
      );
    }
  };

  function sleep(ms: number) {
    return new Promise<void>(resolve => setTimeout(resolve, ms));
  }


  // const convertDecimalToString = (data: number[]) => {
  //   var str = "";
  //   data.forEach((dat) => {
  //     str += String.fromCharCode(dat)
  //   })
  //   return str;
  // }

  useEffect(() => {

    try {
      BleManager.start({ showAlert: false })
        .then(() => console.debug('BleManager started.'))
        .catch((error: any) =>
          console.error('BeManager could not be started.', error),
        );
    } catch (error) {
      console.error('unexpected error starting BleManager.', error);
      return;
    }

    const listeners = [
      bleManagerEmitter.addListener(
        'BleManagerDiscoverPeripheral',
        handleDiscoverPeripheral,
      ),
      bleManagerEmitter.addListener('BleManagerStopScan', handleStopScan),
      bleManagerEmitter.addListener(
        'BleManagerDisconnectPeripheral',
        handleDisconnectedPeripheral,
      ),
      bleManagerEmitter.addListener(
        'BleManagerDidUpdateValueForCharacteristic',
        handleUpdateValueForCharacteristic,
      ),
      bleManagerEmitter.addListener(
        'BleManagerConnectPeripheral',
        handleConnectPeripheral,
      ),
    ];

    handleAndroidPermissions();

    return () => {
      console.debug('[app] main component unmounting. Removing listeners...');
      for (const listener of listeners) {
        listener.remove();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);



  const enableBluetooth = () => {
    BleManager.enableBluetooth()
      .then(() => {
        // showRNToast('Bluetooth enabled');
        startScan()
      })
      .catch((error) => {
        handleStopScan()
        showRNToast(INSTRUCTION_ENABLE_BLUETOOTH, ToastTypes.ERROR_TOAST);
      });

  }

  const handleAndroidPermissions = () => {
    if (Platform.OS === 'android' && Platform.Version >= 31) {
      PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
      ]).then(result => {
        if (result) {
          console.debug(
            'kiot-ble-mobile -> User accepts runtime permissions android 12+',
          );
        } else {
          console.error(
            'kiot-ble-mobile -> User refuses runtime permissions android 12+',
          );
        }
      });
    } else if (Platform.OS === 'android' && Platform.Version >= 23) {
      PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      ).then(checkResult => {
        if (checkResult) {
          console.debug(
            'kiot-ble-mobile -> runtime permission Android <12 already OK',
          );
        } else {
          PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          ).then(requestResult => {
            if (requestResult) {
              console.debug(
                'kiot-ble-mobile -> User accepts runtime permission android <12',
              );
            } else {
              console.error(
                'kiot-ble-mobile -> User refuses runtime permission android <12',
              );
            }
          });
        }
      });
    }
  };

  const renderItem = ({ item }: { item: Peripheral }) => {
    const backgroundColor = item.connected ? BCK_BLE_ITEM_CONNECTED : BCK_BLE_ITEM_NOT_CONNECTED;
    return (
      <TouchableHighlight
        underlayColor='transparent'
        onPress={() => togglePeripheralConnection(item)}>
        <View style={[styles.row, { backgroundColor }]}>
          <Text style={{
            fontSize: 12,
            marginTop: 5,
            textAlign: 'center',
            color: 'white'
          }} > Scanned IOT Device</Text>
          <Text style={styles.peripheralName}>
            {/* completeLocalName (item.name) & shortAdvertisingName (advertising.localName) may not always be the same */}
            {item.name} - {item?.advertising?.localName}
            {item.connecting && ' - Connecting...'}
          </Text>
          <Text style={styles.rssi}>RSSI: {item.rssi}</Text>
          <Text style={styles.peripheralId}>{item.id}</Text>
        </View>
      </TouchableHighlight >
    );
  };


  const sendDataOn = async () => {
    setBulbClickable(false)
    await BleManager.write(peripheralData?.id, SERVICE_UUID, CHARACTERISTIC_WRITE_UUID, [ENCODED_ON]).then(() => {
      setBulbClickable(true)
      setLedResponse(LED_RESPONSE_ON)
      console.log("===> led response send data = ", ledResponse)
    }).catch(() => {
      setBulbClickable(true)
    })
    // BleManager.write(peripheralData?.id, SERVICE_UUID, CHARACTERISTIC_WRITE_UUID, [ENCODED_ONE]) // 1 
  }

  const sendDataOff = async () => {
    setBulbClickable(false)
    await BleManager.write(peripheralData?.id, SERVICE_UUID, CHARACTERISTIC_WRITE_UUID, [ENCODED_OFF]).then(() => {
      setBulbClickable(true)
      setLedResponse(LED_RESPONSE_OFF)
      console.log("===> led response send data = ", ledResponse)
    }).catch(() => {
      setBulbClickable(true)
      //   ledResponse.current = LED_RESPONSE_OFF
    })
    // BleManager.write(peripheralData?.id, SERVICE_UUID, CHARACTERISTIC_WRITE_UUID, [ENCODED_ZERO]) // 0
  }

  const DataBtn = () => {
    return (
      isBulbClickable ?
        (ledResponse === LED_RESPONSE_OFF ?
          (
            < TouchableOpacity style={{ margin: 50 }} onPress={() => {
              isBulbClickable ? sendDataOn() : showRNToast(INSTRUCTION_WAIT_FOR_COMMAND, ToastTypes.INFO_TOAST)
            }}>
              <LottieView source={require('../src/assets/bulb_on.json')}
                autoPlay
                loop
                style={{
                  width: LED_ICON_SIZE,
                  height: LED_ICON_SIZE
                }} />
              <Text style={{ textAlign: 'center', color: 'black' }}>Press Bulb to Turn On</Text>
            </TouchableOpacity >
          )
          :
          (
            <TouchableOpacity style={{ margin: 50 }} onPress={() => {
              isBulbClickable ? sendDataOff() : showRNToast(INSTRUCTION_WAIT_FOR_COMMAND, ToastTypes.INFO_TOAST)
            }}>
              <LottieView source={require('../src/assets/bulb_off.json')}
                autoPlay
                loop
                style={{
                  width: LED_ICON_SIZE,
                  height: LED_ICON_SIZE
                }} />
              <Text style={{ textAlign: 'center', color: 'black' }}>Press Bulb to Turn Off</Text>
            </TouchableOpacity>
          )) : (
          <View style={{ margin: 50 }}>
            <LottieView source={require('../src/assets/loader-updated.json')}
              autoPlay={true}
              loop={true}
              style={{
                width: LED_ICON_SIZE,
                height: LED_ICON_SIZE
              }} />
            <Text style={{ textAlign: 'center', color: 'black' }}>Please wait for confirmation</Text>
          </View>
        ))



  }

  return (
    <SafeAreaView style={styles.body}>
      {peripheralData ? <View style={{ height: 400 }}><DataBtn /></View> : (<View style={{ height: 400, justifyContent: 'center' }}>
        <Text> No bulb found</Text>
      </View>)
      }
      < View style={{ width: '95%', height: 200 }}>
        <FlatList
          data={Array.from(peripherals.values())}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
      <View style={{ height: 70, marginBottom: 50, width: '90%' }}>
        <TouchableOpacity style={styles.scanButton} onPress={enableBluetooth}>
          <Text style={styles.scanButtonText}>
            {isScanning ? 'Scanning...' : 'Scan Devices'}
          </Text>
        </TouchableOpacity>
      </View>
      <Toast />
    </SafeAreaView >
  );
};

const boxShadow = {
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
};

const styles = StyleSheet.create({
  engine: {
    position: 'absolute',
    right: 10,
    bottom: 0,
    color: Colors.black,
  },
  scanButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: BTN_COLOR,
    borderRadius: 12,
    ...boxShadow,
    width: '100%'
  },
  scanButtonText: {
    fontSize: 20,
    letterSpacing: 0.25,
    color: Colors.white,
  },
  body: {
    alignContent: 'center',
    justifyContent: "center",
    alignItems: 'center',
    backgroundColor: '#e8e8e3',
    width: '100%',
    height: '100%',
  },
  sectionContainer: {
    marginTop: 32,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  peripheralName: {
    fontSize: 20,
    textAlign: 'center',
    padding: 10,
    color: 'white'
  },
  rssi: {
    fontSize: 15,
    textAlign: 'center',
    padding: 2,
    color: 'white'
  },
  peripheralId: {
    fontSize: 15,
    textAlign: 'center',
    padding: 2,
    paddingBottom: 20,
    color: 'white'
  },
  row: {
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 20,
    margin: 20,
    ...boxShadow,
  },
  noPeripherals: {
    margin: 10,
    textAlign: 'center',
    color: Colors.white,
  },
});

export default ProcessScreen;
