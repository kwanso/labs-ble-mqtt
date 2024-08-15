# Project Title

IoT base project running of rasberry pi

## Description

This Nest.js project aims to create a comprehensive Internet of Things (IoT) solution using a Raspberry Pi 4. The system consists of a RESTful API server, an MQTT microservice, a Mosquitto broker, GPIO control to manage LEDs on a connected breadboard, and a React frontend for user interaction or operate by postman.

## Project Flow

## Frontend Request:

The React frontend sends HTTP requests to the Nest.js REST API.

## REST API Processing:

Nest.js REST API processes the incoming requests, validating and extracting relevant information.

Communication with MQTT Microservice:
Processed data is forwarded to the MQTT microservice using the Nest.js Microservices module.

## MQTT Microservice Operations:

MQTT microservice handles the communication with the Mosquitto broker and orchestrates GPIO operations on the Raspberry Pi.

## Mosquitto Broker Handling:

Mosquitto broker facilitates communication between the REST API and the Raspberry Pi by routing MQTT messages.

## Raspberry Pi GPIO Control:

The onoff npm package is utilized to control GPIO pins based on the received instructions.

## LED Interaction:

LEDs on the breadboard respond to GPIO changes, turning on or off according to the instructions.

React Frontend Interaction:
Users interact with the React frontend, controlling LEDs through buttons and switches.

## Code Structure

## RESTful API (Nest.js):

Controllers: Handle HTTP requests, validate inputs.
Services: Process business logic, communicate with the MQTT microservice.

## MQTT Microservice (Nest.js):

Microservice Module: Handles MQTT communication.
GPIO Service: Orchestrates GPIO control based on MQTT messages.

## Mosquitto Broker (Mosquitto):

Configuration: Set up and configure Mosquitto for managing MQTT communication.

## Raspberry Pi GPIO (Node.js):

GPIO Control Module: Uses onoff package for GPIO interactions.
MQTT Client: Connects to the Mosquitto broker, subscribes to relevant topics.

## React Frontend:

Components: Buttons, switches, and UI elements for user interaction.
Services: Communicates with the Nest.js API to send control commands.
