import { Pin } from "src/entities";

class CreateComponentPinDto {
    comunicationType: string;
    signalType: string;
    pinNumber: number;
}

export class CreateComponentDto {
    description: string;
    pins: CreateComponentPinDto[];
}
