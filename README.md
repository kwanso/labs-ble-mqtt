<h1 align="center">
  KIOT MQTT
</h1>

# What is the idea?

In this project, we have controlled an LED connected to the Raspberry Pi GPIO port. The Raspberry device port will be controlled
from anywhere around the globe using the KIOT MQTT products.

# What is the MQTT?

MQTT is a global standard protocol used in IOT and many real-time POS systems as well.

# How does it work?

To make things work we will have to configure a mqtt server. We have used the HiveMQ mqtt server for the project.

## Create an mqtt server using HiveMQ (Preferred)
   1. Go to any open source mqtt server like HiveMQ https://www.hivemq.com/ and create an account.
      You can choose a free plan.
   2. Create an organization and then create a Cluster.
   3. Get your username and password from the web client.
   4. Create a topic named 'led'.
   5. Use this topic subscription in all three products.
   
## OR

## Use iot_microserivce-backend and frontend-mosquito-supported

  🎯 **iot_microserivce-backend** - It is a webservice for implementing mosquito server.
   
   It is a microservice to start a mosquito server on a backend machine. You can use it instead of HiveMQ but we prefer to use HiveMQ for proper working of all three products.

   You can see mosquito server apis implemented by frontend-mosquito-supported. 
   
  🎯 **frontend-mosquito-supported** - It is a web front-end implementing mosquito server apis.


# 🚀 Products?
KIOT MQTT has three key products: 

🎯 **kiot-mqtt-mobile** - To control a Raspberry Pi GPIO port (LED) from the mobile.

🎯 **web-app** - To control a Raspberry Pi GPIO port (LED) from the web.

🎯 **raspberry-desktop** - The running program that will run on a Raspberry Pi device.


# 📱 kiot-mqtt-mobile

The kiot-mqtt-mobile is a mobile application made on React Native. You will run it on an Android Device.

# 💻 web-app

The web-app is a web app made on React. You will run it on any Windows/Linux/Mac device.

# 💻 raspberry-desktop (Where you will see the magic)

You will run the Mqtt.js file on Raspberry Pi Desktop (A raspbian OS). For this, you will need Node installed on your
raspberry desktop and have configured the required node-modules as well. 

After starting the Mqtt.JS using sudo node Mqtt.js you will connect the LED using a breadboard using two GPIO ports
  1. The continuous 5v GPIO port.
  2. The GPIO port 14 which we will control using Mqtt.

##  Prerequisites
  **Raspberry Pi Device Specs**
 
  Model: Raspberry Pi 4 Model B Rev 1.2
  Raspberian OS : Linux version 5.10.103-v7l+ (dom@buildbot) (arm-linux-gnueabihf-gcc-8 (Ubuntu/Linaro 8.4.0-3ubuntu1) 8.4.0, GNU ld (GNU Binutils for Ubuntu) 2.34) #1529 SMP Tue Mar 8 12:24:00 GMT 2022


 **Raspberry Pi Device Using Node**

- If you are not logged in as a root user then use sudo before every command execution.
- Install node version 16.X on your Pi device or you can install the latest version.
- Confirm node version node js version using node -v or nodejs -v commands.
- Install latest npm version.
- Run command sudo npm install onoff - An npm package to control GPIO pins on Pi device.

## 🗒️ Credits
**Kwanso Mobile Team**