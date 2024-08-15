import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MqttService } from './mqtt.service';
import { CreateMqttDto } from './dto/create-mqtt.dto';
import { UpdateMqttDto } from './dto/update-mqtt.dto';

@Controller()
export class MqttController {
  constructor(private readonly mqttService: MqttService) { }


  /**
   * Messages pattern
   * @param payload 
   */
  @MessagePattern('yourExpectedTopic')
  handleMessage(@Payload() payload: any): void {
    console.log('Received message:', payload);
    // Handle the message in your microservice
  }

  // For MQTT
  /**
   * Messages pattern
   * @param data 
   * @returns message1 
   */
  @MessagePattern('mqtt-topic')
  handleMessage1(data: any): string {
    console.log('------------------> Received message:', data);
    return 'Hello, MQTT!';
  }

  /**
   * Messages pattern
   * @returns  
   */
  @MessagePattern('turn-on')
  turnOn() {
    return this.mqttService.turnOnLed();
  }

  /**
   * Messages pattern
   * @returns  
   */
  @MessagePattern('turn-off')
  turnOff() {
    return this.mqttService.turnOffLed();
  }

  /**
   * Messages pattern
   * @param value 
   * @returns  
   */
  @MessagePattern('blink')
  blink(@Payload() value: any) {
    console.log(">>>>>>>>>>>?><>", value)
    return this.mqttService.blink(value);

  }

  /**
   * Messages pattern
   * @returns  
   */
  @MessagePattern('blue-led')
  blueLed() {
    return this.mqttService.blueLed();

  }

  /**
   * Messages pattern
   * @returns  
   */
  @MessagePattern('green-led')
  greenLed() {
    return this.mqttService.greenLed();

  }

  /**
   * Messages pattern
   * @returns  
   */
  @MessagePattern('red-led')
  redLed() {
    return this.mqttService.redLed();

  }

  /**
   * Messages pattern
   * @returns  
   */
  @MessagePattern('yellow-led')
  yellowLed() {
    return this.mqttService.yellowLed();

  }

  /**
   * Messages pattern
   * @returns  
   */
  @MessagePattern('white-led')
  whiteLed() {
    return this.mqttService.whiteLed();

  }

  /**
   * Messages pattern
   * @returns  
   */
  @MessagePattern('blink-slow')
  blinkSlow() {
    return this.mqttService.blinkSlow();
  }


  /**
   * Messages pattern
   * @returns  
   */
  @MessagePattern('blink-fast')
  blinkfast() {
    return this.mqttService.blinkFast();
  }

  /**
   * Messages pattern
   * @returns  
   */
  @MessagePattern('random-blink')
  randomBlink() {
    return this.mqttService.randomBlink();
  }


  // @MessagePattern('updateMqtt')
  // update(@Payload() updateMqttDto: UpdateMqttDto) {
  //   return this.mqttService.update(updateMqttDto.id, updateMqttDto);
  // }

  // @MessagePattern('removeMqtt')
  // remove(@Payload() id: number) {
  //   return this.mqttService.remove(id);
  // }
}
