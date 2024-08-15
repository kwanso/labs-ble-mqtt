import { Injectable } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { IotLogsService } from '../iot-logs/iot-logs.service';
import { LightStatus } from '../iot-logs/schemas/iot-logs.schema';

@Injectable()
export class RestService {
  private client: ClientProxy;
  constructor(
    private readonly iotLogsService: IotLogsService
  ) {
    this.client = ClientProxyFactory.create({
      transport: Transport.MQTT,
      options: {
        url: 'mqtt://localhost:1883', // Replace with your MQTT broker URL
      },
    });
  }

  /**
   * Gets connected
   * @returns  
   * this function is used to check connection
   */
  async getConnected() {
    console.log('---------------> here is the connection is establishing!')
    this.client.emit<any>('mqtt-topic', { data: '----------------> message from MQTT' });
    return "connection created!"
  }


  /**
   * Turns on
   * @returns  
   */
  async turnOn() {
    console.log('-----------------> Turning on...')
    this.client.emit<any>('turn-on', { data: '----------------> message from MQTT' });
    await this.iotLogsService.createLog({ rasberry_pin: 18, version: 'ex_1', lightStatus: LightStatus.ON })
    await this.iotLogsService.findAllLogs()
    return "LED turning on"
  }


  /**
   * Turns off
   * @returns  
   */
  async turnOff() {
    this.client.emit<any>('turn-off', { data: '----------------> message from MQTT' });
    return "LED turning off"
  }

  /**
   * Blinks rest service
   * @param value 
   * @returns  
   */
  async blink(value: any) {
    this.client.emit<any>('blink', { data: value.value });
    return `LED Blinking with value ${value.value}`
  }

  /**
   * Blinks slow
   * @returns  
   */
  async blinkSlow() {
    this.client.emit<any>('blink-slow', { data: '----------------> message from MQTT' });
    return "LED Blinking slow"
  }

  /**
   * Blinks fast
   * @returns  
   */
  async blinkFast() {
    this.client.emit<any>('blink-fast', { data: '----------------> message from MQTT' });
    return "LED Blinking fast"
  }

  /**
   * Blues rest service
   * @returns  
   */
  async blue() {
    this.client.emit<any>('blue-led', { data: '----------------> message from MQTT' });
    return "LED blue is on"
  }

  /**
   * Greens rest service
   * @returns  
   */
  async green() {
    this.client.emit<any>('green-led', { data: '----------------> message from MQTT' });
    return "LED green is on"
  }

  /**
   * Yellows rest service
   * @returns  
   */
  async yellow() {
    this.client.emit<any>('yellow-led', { data: '----------------> message from MQTT' });
    return "LED yellow is on"
  }

  /**
   * Whites rest service
   * @returns  
   */
  async white() {
    this.client.emit<any>('white-led', { data: '----------------> message from MQTT' });
    return "LED white is on"
  }

  /**
   * Red rest service
   * @returns  
   */
  async red() {
    this.client.emit<any>('red-led', { data: '----------------> message from MQTT' });
    return "LED red is on"
  }

  /**
   * Randoms blink
   * @returns  
   */
  async randomBlink() {
    this.client.emit<any>('random-blink', { data: '----------------> message from MQTT' });
    return "LED random blink is on"
  }
}
