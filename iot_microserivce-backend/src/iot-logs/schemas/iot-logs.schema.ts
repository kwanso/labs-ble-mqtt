import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { now } from "mongoose";

export enum LightStatus {
    ON = 'on',
    OFF = 'off',
    DISMISS = 'dismiss',
}

@Schema({ timestamps: true })
export class Iot_logs {
    @Prop({ type: Number })
    rasberry_pin: number

    @Prop({ type: String })
    version: string

    @Prop({ type: String, enum: Object.values(LightStatus), default: LightStatus.OFF })
    lightStatus: LightStatus;

    @Prop({ default: now() })
    createdAt: Date;

    @Prop({ default: now() })
    updatedAt: Date;
}

export const IotLogsSchema = SchemaFactory.createForClass(Iot_logs);