class CreateArduinoPinDto {
    comunicationType: string;
    signalType: string;
    pinNumber: number;
}

class CreateArduinoComponentDto {
    description: string;
    pins: CreateArduinoPinDto[];
}
export class CreateArduinoDto {
    description: string;
    components: CreateArduinoComponentDto[];
}