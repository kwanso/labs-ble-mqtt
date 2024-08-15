## Step 0: Create an mqtt server
   1. Go to any open source mqtt server like HiveMQ https://www.hivemq.com/ and create an account.
      You can choose free plan.
   2. Create an organization and then create a Cluster.
   3. Use a port number typically 8883.
   4. Use Cluster Url value in Hostname
   5. Get your username and password from the webclient.
   6. Create a topic named 'led'.
## Step 1: Make sure you have node installed on your machine
## Step 2: Make sure you have npm installed on your machine
## Step 3: npm i mqtt
## Step 4: npm i onoff
## Step 5: run 'node Mqtt.js' on terminal

##  Prerequisites
 **Raspberry Pi Device Specs**

Model : Raspberry Pi 4 Model B Rev 1.2
Raspberian OS : Linux version 5.10.103-v7l+ (dom@buildbot) (arm-linux-gnueabihf-gcc-8 (Ubuntu/Linaro 8.4.0-3ubuntu1) 8.4.0, GNU ld (GNU Binutils for Ubuntu) 2.34) #1529 SMP Tue Mar 8 12:24:00 GMT 2022


 **Raspberry Pi Device Using Node**

- If you are not logged in as root user then use sudo before every command execution.
- Install node version 16.X on your Pi device or you can install the latest version.
- Confirm node version node js version using node -v or nodejs -v commands.
- Install latest npm version.
- Run command sudo npm install onoff - An npm package to control GPIO pins on Pi device.
