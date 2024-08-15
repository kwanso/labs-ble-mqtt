import { Box, IconButton, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { ToggleButton } from './assets';
import Button from '@mui/material/Button';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import FlashOffIcon from '@mui/icons-material/FlashOff';
import mqtt, { IClientOptions, IClientPublishOptions, MqttClient } from 'mqtt';
import { CLIENT_ID, CONNECT, DISCONNECT, HOST, LED_RESPONSE_OFF, LED_RESPONSE_ON, PASSWORD, TOPIC, USER_NAME } from './Constants';


function ProcessScreen() {

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

  const [connectionStatus, setConnectionStatus] = useState(Connection.DisConnected);
  const [connectButtonText, setConnectButtonText] = useState(updateConnectButtonText());
  const [ledResponse, setLedResponse] = useState<string>(LED_RESPONSE_OFF);

  const [client, setClient] = useState<MqttClient>();
  useEffect(() => {
    if (client) {
      console.log(client);
      client.on('connect', () => {
        setConnectionStatus(Connection.Connected)
        console.log('connected');
      });
      client.on('error', (err: any) => {
        setConnectionStatus(Connection.DisConnected)
        console.error('Connection error: ', err);
        client.end();
      });
      client.on('reconnect', () => {
        console.error('reconnecting');
      });
      client.on('message', (topic: any, msg: any) => {
        console.log('message:', msg.toString());
        if (msg.toString().includes('0')) {
          setLedResponse(LED_RESPONSE_OFF)
        }
        if (msg.toString().includes('1')) {
          setLedResponse(LED_RESPONSE_ON)
        }
      });
      // subscribe to topic 'my/test/topic'
      client.subscribe(TOPIC);

      // publish message 'Hello' to topic 'my/test/topic'
      // client.publish('led', '1');
    }
  }, [client]);

  useEffect(() => {
    setConnectButtonText(updateConnectButtonText())
  }, [connectionStatus]);

  const publishOpt: IClientPublishOptions = { retain: true }

  const sendDataOn = async () => {
    client?.publish(TOPIC, '1', publishOpt);
  }

  const sendDataOff = async () => {
    client?.publish(TOPIC, '0', publishOpt);
  }

  const handleConnect = async () => {
    if (connectionStatus == Connection.DisConnected) {
      console.log('connecting...')
      var options: IClientOptions = {
        username: USER_NAME,
        password: PASSWORD,
        clientId: CLIENT_ID,
        clean: false,
        queueQoSZero: true
      }

      // initialize the MQTT client
      const clientConnected = mqtt.connect(HOST, options);
      setClient(clientConnected)
    }
    else {
      console.log('Disconnecting...')
      client?.removeAllListeners()
      client?.end()
      setConnectionStatus(Connection.DisConnected)
    }
  }


  return (
    <>
      <Box>
        <Typography color="white" sx={{ textAlign: 'center', fontSize: '40px', mt: "5px", ml: "10px", fontWeight: '600' }} >
          Pi Device Control Panel - MQTT
        </Typography>
        <Box sx={{ width: '100%', marginTop: '50px', alignItems: 'center', alignContent: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'column' }}>
          {connectionStatus === Connection.Connected && <IconButton sx={{ backgroundColor: 'transparent', background: 'none !important' }}
            onClick={() => { ledResponse === LED_RESPONSE_OFF ? sendDataOn() : sendDataOff() }}>
            <ToggleButton color={ledResponse === LED_RESPONSE_OFF ? 'white' : 'yellow'} />
          </IconButton>
          }
          <Button
            variant="contained"
            onClick={() => { handleConnect() }}
            sx={{ fontSize: '20px', width: '15%', marginTop: '50px', backgroundColor: 'gray', color: 'white', '&:hover': { backgroundColor: 'gray' } }}
            startIcon={connectionStatus === Connection.Connected ? <FlashOnIcon /> : <FlashOffIcon />}>
            {connectButtonText}
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default ProcessScreen;
