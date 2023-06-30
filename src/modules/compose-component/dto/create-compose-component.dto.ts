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

export class CreateComposeComponentDto {
    description: string;
    typeComponent: string;
    pins: CreateComponentPinDto[];
    components?: CreateComponentDto[];
}
