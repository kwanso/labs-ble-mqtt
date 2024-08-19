const HciSocket = require('hci-socket');
const NodeBleHost = require('ble-host');
const Gpio = require('onoff').Gpio;
const led = new Gpio(14, 'out');
const BleManager = NodeBleHost.BleManager;
const AdvertisingDataBuilder = NodeBleHost.AdvertisingDataBuilder;
const HciErrors = NodeBleHost.HciErrors;
const AttErrors = NodeBleHost.AttErrors;
const SERVICE_UUID = '5c583bd5-683b-44ab-9b4a-3675633e6f4b'
const CHARACTERISTIC_WRITE_UUID = 'f1996375-b82f-4c02-936c-c9b292c7f691'

var ledState = '0'
led.writeSync(1)


const deviceName = 'Kwanso';

var transport = new HciSocket();

var options = {
    // optional properties go here
};

BleManager.create(transport, options, function (err, manager) {
    if (err) {
        console.error(err);
        return;
    }

    manager.gattDb.setDeviceName(deviceName);
    manager.gattDb.addServices([
        {
            uuid: SERVICE_UUID,
            characteristics: [
                {
                    uuid: CHARACTERISTIC_WRITE_UUID,
                    properties: ['write'],
                    onWrite: function (connection, needsResponse, value, callback) {
                        console.log('led command:', value.toString());
                        // console.log('A new value was written:', ledState);
                        if (ledState == '0') {
                            ledState = '1'
                            led.writeSync(0)
                            //   console.log('A new value was written: 1 ', ledState);
                        }
                        else {
                            ledState = '0'
                            led.writeSync(1)
                            //        console.log('A new value was written: 0 ', ledState);
                        }

                        callback(AttErrors.SUCCESS); // actually only needs to be called when needsResponse is true
                    }
                }
            ]
        }
    ]);

    const advDataBuffer = new AdvertisingDataBuilder()
        .addFlags(['leGeneralDiscoverableMode', 'brEdrNotSupported'])
        .addLocalName(true, deviceName)
        .add128BitServiceUUIDs(true, [SERVICE_UUID])
        .build();
    manager.setAdvertisingData(advDataBuffer);
    startAdv();

    function startAdv() {
        manager.startAdvertising({/*options*/ }, connectCallback);
    }

    function connectCallback(status, conn) {
        if (status != HciErrors.SUCCESS) {
            setTimeout(startAdv, 10000);
            return;
        }
        conn.on('disconnect', startAdv); // restart advertising after disconnect
        // console.log('Connection established!', conn);
    }
});