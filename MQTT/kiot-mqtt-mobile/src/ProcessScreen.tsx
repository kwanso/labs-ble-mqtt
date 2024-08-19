
import LottieView from 'lottie-react-native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MQTT, { IMqttClient } from 'sp-react-native-mqtt';
import { ToastTypes, showRNToast } from './common/utility';
import { BTN_COLOR, CLIENT_ID, CONNECT, CONNECTED, DISCONNECT, HOST, LED_ICON_SIZE, LED_RESPONSE_OFF, LED_RESPONSE_ON, PASSWORD, TOPIC, USER_NAME } from './Constants';
import Toast from 'react-native-toast-message';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const ProcessScreen = () => {

  enum Connection {
    Connected,
    DisConnected
  }

  const updateConnectButtonText = () => {
    switch (connectionStatus) {
      case Connection.Connected:
        return DISCONNECT;
      case Connection.DisConnected:
        return CONNECT;
      default:
        return CONNECT;
    }
  }

  const [connectedClient, setConnectedClient] = useState<IMqttClient>()
  const [connectionStatus, setConnectionStatus] = useState(Connection.DisConnected);
  const [connectButtonText, setConnectButtonText] = useState(updateConnectButtonText());
  const [ledResponse, setLedResponse] = useState<string>(LED_RESPONSE_OFF);


  useEffect(() => {
    if (connectedClient) {
      connectedClient.on('closed', function () {
        setConnectionStatus(Connection.DisConnected)
        console.log('mqtt.event.closed');
      });

      connectedClient.on('error', function (msg) {
        setConnectionStatus(Connection.DisConnected)
        console.log('mqtt.event.error', msg);
        showRNToast(msg, ToastTypes.ERROR_TOAST)
      });

      connectedClient.on('message', function (msg) {
        console.log('mqtt.event.message', msg);
        if (msg.data.toString().includes('0')) {
          setLedResponse(LED_RESPONSE_OFF)
        }
        if (msg.data.toString().includes('1')) {
          setLedResponse(LED_RESPONSE_ON)
        }
      });

      connectedClient.on('connect', function () {
        setConnectionStatus(Connection.Connected)
        console.log('mqtt.event.connect', 'connected');
        showRNToast(CONNECTED, ToastTypes.SUCCESS_TOAST)
      });

      connectedClient.subscribe(TOPIC, 1)
    }
  }, [connectedClient]);

  useEffect(() => {
    setConnectButtonText(updateConnectButtonText())
  }, [connectionStatus]);

  const handleConnect = async () => {
    if (connectionStatus == Connection.DisConnected) {
      //   MQTT.removeClient();
      MQTT.disconnectAll();
      /* create mqtt client */
      const client = await MQTT.createClient({
        uri: HOST,
        clientId: CLIENT_ID,
        user: USER_NAME,
        pass: PASSWORD,
        protocol: 'mqtts',
        auth: true,
        clean: false
      });
      client.connect()
      setConnectedClient(client)
    } else {
      MQTT.disconnectAll();
      connectedClient?.disconnect();
    }
  }

  const sendDataOn = async () => {
    connectedClient?.publish(TOPIC, '1', 1, true);
  }

  const sendDataOff = async () => {
    connectedClient?.publish(TOPIC, '0', 1, true);
  }

  const DataBtn = () => {
    return (
      (ledResponse === LED_RESPONSE_OFF ?
        (
          < TouchableOpacity style={{ margin: 50 }} onPress={() => {
            sendDataOn()
          }}>
            <LottieView source={require('./assets/bulb_on.json')}
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
            sendDataOff()
          }}>
            <LottieView source={require('./assets/bulb_off.json')}
              autoPlay
              loop
              style={{
                width: LED_ICON_SIZE,
                height: LED_ICON_SIZE
              }} />
            <Text style={{ textAlign: 'center', color: 'black' }}>Press Bulb to Turn Off</Text>
          </TouchableOpacity>
        )))



  }

  return (
    <View style={{ alignContent: 'center', alignItems: 'center' }}>

      {connectionStatus == Connection.Connected ? <View style={{ height: 400 }}><DataBtn />
      </View> : (<View style={{ height: 400, justifyContent: 'center' }}>
        <Text> No bulb found</Text>
      </View>)
      }
      <View style={{ height: 70, marginBottom: 50, width: '90%' }}>
        <TouchableOpacity style={styles.scanButton} onPress={() => { handleConnect() }}>
          {<Text style={styles.scanButtonText}>{connectButtonText}</Text>}
        </TouchableOpacity>
      </View>
      <Toast />

    </View >
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
  }
});

export default ProcessScreen;
