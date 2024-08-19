Project IOT (BLE/MQTT) Showcasing BLE and MQTT Connectivity between a React Native Mobile Application, MQTT Server and a Pi Device.

Overview:

Project IOT (BLE/MQTT) is an innovative internal project designed to illustrate the seamless integration of Bluetooth Low Energy (BLE) and Message Queuing Telemetry Transport (MQTT) using a Pi device as receiver of commands in which we can see the LEDs functional. The project follows a series of experiments available on our repo as well.

Components:

1. Raspberry Pi:

- BLE Peripheral Role: Configured to operate as a BLE peripheral, the Raspberry Pi continuously advertises its presence to nearby devices. It broadcasts specific data packets that can be discovered by BLE-enabled mobile devices.

- Sensor Integration: Various sensors (e.g., temperature, humidity, light sensors) are connected to the Raspberry Pi. These sensors collect real-time data, which the Pi processes and packages into standardized BLE advertising packets.

- BLE Advertisements: The Raspberry Pi uses GATT (Generic Attribute Profile) services and characteristics to structure the data it sends out. It regularly updates these characteristics with new sensor data.

2. React Native Mobile Application:

- Discovery and Connection: Developed with React Native, the mobile application scans for nearby BLE devices. Upon discovering the Raspberry Pi, the app connects to it using standardized BLE connection procedures.
- Serve as client: Mobile App can also connect to a remote MQTT server (any open source available) and one can ask MQTT server to send a switch on or off to the Pi Device (connected to MQTT server)

- Command Transmission: Once connected, the mobile application can send commands to the Raspberry Pi. These commands include requests for specific sensor data, configuration changes, or triggering specific actions on the Pi.

- Real-Time Updates: The mobile app listens for notifications or indications from the Raspberry Pi, allowing it to receive real-time updates whenever new sensor data is available or when a specific event occurs.

3. MQTT Server:

- Data Broker: An MQTT server acts as the intermediary for data transmission between the Raspberry Pi and the mobile application. The Raspberry Pi publishes sensor data to specific MQTT topics, which the mobile application subscribes to.

- Command Handling: When the mobile application sends a command, it publishes it to a designated MQTT topic, which the Raspberry Pi is subscribed to. This decoupled communication model ensures scalability and allows for more advanced feature implementation in the future.

- Efficiency and Scalability: MQTT, known for its lightweight and efficient message handling, is ideal for this project. It ensures that communication remains fast and reliable, even over constrained networks.

Under the hood:

- BLE Configuration on Raspberry Pi: We have Used Node on the Pi Device and using node package manager (npm) we have used ble-host to control the Pi device. All this has been done using JS.

- Sensor Data Acquisition: JS scripts run on the Raspberry Pi to continuously read data from the connected sensors. These scripts are responsible for updating the BLE characteristics with new sensor values.

- MQTT Communications: The Node MQTT packages are used on the Raspberry Pi to publish collected data to the MQTT server. The React Native application uses a compatible MQTT client library, such as react-native-mqtt to handle subscriptions and publish commands.

User Experience:

- Interaction Ease: Users can effortlessly connect to the Raspberry Pi from their mobile devices, view live sensor data, and send commands with just a few taps.

- Real-Time Monitoring: The React Native app provides real-time monitoring, with data updating almost instantaneously thanks to the efficient MQTT protocol.

- Scalability and Extensibility: The project's architecture supports the addition of more sensors, more complex commands, and additional features such as data logging and alerts, making it a versatile and scalable IoT solution.

Conclusion:

Project BLE/MQTT successfully demonstrates the practical application of BLE and MQTT in an IoT ecosystem. The integration of a Raspberry Pi, a React Native mobile application, and an MQTT server provides a robust framework that can be adapted for various real-world applications, such as smart home systems, industrial monitoring, and environmental sensing. Through this project, the potential of combining these technologies to create efficient and scalable IoT solutions is vividly showcased.
