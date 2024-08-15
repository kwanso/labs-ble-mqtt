import { Module } from '@nestjs/common';
import { RestService } from './rest.service';
import { RestController } from './rest.controller';
import { IotLogsModule } from '../iot-logs/iot-logs.module';

@Module({
  imports: [IotLogsModule],
  controllers: [RestController],
  providers: [RestService],
})
export class RestModule { }
