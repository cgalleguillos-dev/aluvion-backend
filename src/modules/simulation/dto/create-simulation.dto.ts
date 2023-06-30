interface InputEvent {
    valveId: string;
    intensity: number;
    time: number;
}
export class CreateSimulationDto {
    description: string;
    equipmentId: string;
    date: Date;
    events: InputEvent[];
}
