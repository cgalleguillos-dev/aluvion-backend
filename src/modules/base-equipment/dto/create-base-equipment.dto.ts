class BaseEquipmentPin {
    comunicationType: string;
    signalType: string;
    pinNumber: number;
}

class BaseEquipmentComponent {
    description: string;
    pins: BaseEquipmentPin[];
    typeComponent: string;
    components?: BaseEquipmentComponent[];
}

class BaseEquipmentArduino {
    description: string;
    components: BaseEquipmentComponent[];
}
export class CreateBaseEquipmentDto {
    id?: string;
    description: string;
    arduinos: BaseEquipmentArduino[];
}