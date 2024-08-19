import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MqttModule } from './mqtt/mqtt.module';
import { RestModule } from './rest/rest.module';
import { MongoModule } from './config/mongo.moudle';
import { IotLogsModule } from './iot-logs/iot-logs.module';

@Module({
  imports: [RestModule, MongoModule, IotLogsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
