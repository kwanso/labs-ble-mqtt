const USER_NAME = "Your Username"
const PASSWORD = 'Your Password'
const TOPIC = 'led' // use this
const PORT = '8883' // use this
const CONNECTED = 'Connected'
const HOST = 'Your Hostname'


var mqtt = require('mqtt');
const Gpio = require('onoff').Gpio;
const led = new Gpio(14, 'out');
var options = {
  host: HOST,
  port: PORT,
  protocol: 'mqtts',
  username: USER_NAME,
  password: PASSWORD,

}

// initialize the MQTT client
var client = mqtt.connect(options);

// setup the callbacks
client.on('connect', function () {
  console.log(CONNECTED);
  console.log(client)
});

client.on('error', function (error) {
  console.log(error);
});

client.on('message', function (topic, message) {
  // called each time a message is received
  console.log('Received message:', topic, message.toString());
  if (message.toString().includes('0')) { led.writeSync(1) }
  if (message.toString().includes('1')) { led.writeSync(0) }
});

client.subscribe(TOPIC);
