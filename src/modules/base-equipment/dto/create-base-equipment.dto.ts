class BaseEquipmentPin {
    comunicationType: string;
    signalType: string;
    pinNumber: number;
}

class BaseEquipmentComponent {
    description: string;
    pins: BaseEquipmentPin[];
}

export class CreateBaseEquipmentDto {
    description: string;
    components: BaseEquipmentComponent[];
}
