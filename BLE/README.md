<h1 align="center">
  KIOT BLE
</h1>

# What is the idea?

In this project, we have controlled an LED connected to the Raspberry Pi GPIO port. The Raspberry device port will be controlled
using the kiot-ble-mobile App.

# What is the BLE?

BLE is a global standard protocol used to control or receive data from devices using bluetooth.

# What is the Central and Peripheral Concept?

A central is the entity which will be a master and can have connections with multiple peripheral (slave devices).
In our case Mobile Application is Central and Raspberry Pi Device will be central. Mobile application will look for 
Raspberry Pi device and make connection with it.

##  Prerequisites
  **Raspberry Pi Device Specs**
 
  Model: Raspberry Pi 4 Model B Rev 1.2
  Raspberian OS : Linux version 5.10.103-v7l+ (dom@buildbot) (arm-linux-gnueabihf-gcc-8 (Ubuntu/Linaro 8.4.0-3ubuntu1) 8.4.0, GNU ld (GNU Binutils for Ubuntu) 2.34) #1529 SMP Tue Mar 8 12:24:00 GMT 2022


 **Raspberry Pi Device Using Node**

- If you are not logged in as root user then use sudo before every command execution.
- Install node version 16.X on your Pi device or you can install the latest version.
- Confirm node version node js version using node -v or nodejs -v commands.
- Install latest npm version.
- Run command sudo npm install onoff - An npm package to control GPIO pins on Pi device.
- Run command sudo npm install ble-host - An npm package to control ble connections and making peripherals.
It will be used by  Pi device to declare pi device as peripheral.
- Run command sudo npm install hci-socket - An npm package for bluetooth sockets.
- After all the packages needed run the file bleNode.js by locating its location 
- Use command sudo node bleNode.js
- You will see the Kwanso ble device braodcasting as peripheral on KIOT Mobile App.



# 🚀 Product?
KIOT BLE has two key products: 

🎯 **kiot-ble-mobile** - To control a Raspberry Pi GPIO port (LED) from the mobile.

🎯 **raspberry-desktop** - The running program that will run on a Raspberry Pi device.


# 📱 kiot-ble-mobile

The kiot-ble-mobile is a mobile application made on React Native. You will run it on an Android Device.


# 💻 raspberry-desktop (Where you will see the magic)

You will run the bleNode.js file on Raspberry Pi Desktop (A raspbian OS). For this, you will need Node installed on your
raspberry desktop and have configured the required node-modules as well. 

After starting the bleNode.js using sudo node bleNode.js you will connect the LED using a breadboard using two GPIO ports
  1. The continuous 5v GPIO port.
  2. The GPIO port 14 which we will control using BLE.

## 🗒️ Credits
**Kwanso Mobile Team**