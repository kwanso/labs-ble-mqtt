## Step 1: Make sure you have node installed on your machine
## Step 2: Make sure you have npm installed on your machine
## Step 3: npm i hci-socket
## Step 4: npm i ble-host
## Step 5: npm i onoff
## Step 6: run 'node bleNode.js' on terminal



# Prerequisites
 **Raspberry Pi Device Specs**

Model : Raspberry Pi 4 Model B Rev 1.2
Raspberian OS : Linux version 5.10.103-v7l+ (dom@buildbot) (arm-linux-gnueabihf-gcc-8 (Ubuntu/Linaro 8.4.0-3ubuntu1) 8.4.0, GNU ld (GNU Binutils for Ubuntu) 2.34) #1529 SMP Tue Mar 8 12:24:00 GMT 2022


 **Raspberry Pi Device Using Node**

- If you are not logged in as root user then use sudo before every command execution.
- Install node version 16.X on your Pi device or you can install the latest version.
- Confirm node version node js version using node -v or nodejs -v commands.
- Install latest npm version.
- Run command sudo npm install onoff - An npm package to control GPIO pins on Pi device.
- Run command sudo npm install ble-host - An npm package to control ble connections and making peripherals. It will be used by Pi device to declare pi device as peripheral.
- Run command sudo npm install hci-socket - An npm package for bluetooth sockets.
- After all the packages needed run the file bleNode.js by locating its location 
- Use command sudo node bleNode.js
- You will see the Kwanso ble device braodcasting as peripheral on KIOT Mobile App.