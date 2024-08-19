import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RestService } from './rest.service';

@Controller('rest')
export class RestController {
  constructor(private readonly restService: RestService) { }

  /**
   * Gets rest controller
   * @returns  
   */
  @Get()
  async getConnection() {
    return await this.restService.getConnected()
  }


  /**
   * Gets rest controller
   * @returns  
   */
  @Get('/on')
  async turnOn() {
    console.log('--------> request received')
    return await this.restService.turnOn()
  }

  /**
   * Gets rest controller
   * @returns  
   */
  @Get('/off')
  async turnOff() {
    console.log('--------> request received')
    return await this.restService.turnOff()
  }

  /**
   * Posts rest controller
   * @param value 
   * @returns  
   */
  @Post('/blink')
  async blink(@Body() value: any) {
    return await this.restService.blink(value)
  }

  /**
   * Gets rest controller
   * @returns  
   */
  @Get('/blink-slow')
  async blinkSlow() {
    return await this.restService.blinkSlow()
  }

  /**
   * Gets rest controller
   * @returns  
   */
  @Get('/blink-fast')
  async blinkFast() {
    return await this.restService.blinkFast()
  }

  /**
   * Gets rest controller
   * @returns  
   */
  @Get('/on-blue')
  async blue() {
    return await this.restService.blue()
  }

  /**
   * Gets rest controller
   * @returns  
   */
  @Get('/on-red')
  async red() {
    return await this.restService.red()
  }

  /**
   * Gets rest controller
   * @returns  
   */
  @Get('/on-green')
  async green() {
    return await this.restService.green()
  }

  /**
   * Gets rest controller
   * @returns  
   */
  @Get('/on-yellow')
  async yellow() {
    return await this.restService.yellow()
  }

  /**
   * Gets rest controller
   * @returns  
   */
  @Get('/on-white')
  async white() {
    return await this.restService.white()
  }

  /**
   * Gets rest controller
   * @returns  
   */
  @Get('/random-blink')
  async randomBlink() {
    return await this.restService.randomBlink()
  }
}
