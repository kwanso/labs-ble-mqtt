## Step 0: Create an mqtt server
   1. Go to any open source mqtt server like HiveMQ https://www.hivemq.com/ and create an account.
      You can choose free plan.
   2. Create an organization and then create a Cluster.
   3. Use a port number typically 8883.
   4. Use Cluster Url value in Hostname.
   5. Get your username and password from the webclient.
   6. Create a topic named 'led'.
## Step 1: Make sure you have node installed on your machine
## Step 2: Make sure you have npm installed on your machine
## Step 3: Run 'yarn' to install all node-mudules
## Step 4: Run 'npm start' 
First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.
To start Metro, run the following command from the _root_ of your React Native project:
# using npm
npm start
# OR using Yarn
yarn start

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android
--- using npm
npm run android

--- OR using Yarn
yarn android

### For iOS
npm run ios
--- OR using Yarn
yarn ios

