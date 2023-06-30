class CreateComponentPinDto {
    comunicationType: string;
    signalType: string;
    pinNumber: number;
}

export class CreateComponentDto {
    description: string;
    typeComponent: string;
    pins: CreateComponentPinDto[];
}
