import { Module } from '@nestjs/common';
import { IotLogsService } from './iot-logs.service';
import { MongooseModule } from '@nestjs/mongoose';
import { IotLogsSchema, Iot_logs } from './schemas/iot-logs.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Iot_logs.name, schema: IotLogsSchema }])],
  providers: [IotLogsService],
  exports: [IotLogsService]
})
export class IotLogsModule { }
