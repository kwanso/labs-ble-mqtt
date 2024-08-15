import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { LightStatus } from "../schemas/iot-logs.schema";

export class CreateIotLogDto {
    @IsNotEmpty()
    @IsNumber()
    rasberry_pin: number

    @IsNotEmpty()
    @IsString()
    version: string

    @IsNotEmpty()
    @IsEnum(LightStatus)
    lightStatus: LightStatus;
}