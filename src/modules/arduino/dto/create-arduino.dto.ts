class CreateArduinoPinDto {
    comunicationType: string;
    signalType: string;
    pinNumber: number;
}

class CreateArduinoComponentDto {
    description: string;
    typeComponent: string;
    pins: CreateArduinoPinDto[];
    components?: CreateArduinoComponentDto[];
}
export class CreateArduinoDto {
    id?: string;
    description: string;
    components: CreateArduinoComponentDto[];
}