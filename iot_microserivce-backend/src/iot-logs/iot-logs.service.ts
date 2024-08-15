import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Iot_logs } from './schemas/iot-logs.schema';
import { Model } from 'mongoose';
import { CreateIotLogDto } from './dto/iot_logs.dto';

@Injectable()
export class IotLogsService {
    constructor(
        @InjectModel(Iot_logs.name) private readonly iotLogsModel: Model<Iot_logs>
    ) { }

    async createLog(logDetail: CreateIotLogDto): Promise<Iot_logs> {
        const iotLog = new this.iotLogsModel(logDetail);
        return iotLog.save();
    }

    async findAllLogs(): Promise<Iot_logs[]> {
        const logs = await this.iotLogsModel.find().lean();
        return logs
    }

}
