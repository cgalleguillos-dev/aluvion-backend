interface InputEvent {
    valveId: string;
    intensity: number;
    startTime: number;
    endTime: number;
}
export class CreateSimulationDto {
    description: string;
    equipmentId: string;
    date: Date;
    events: InputEvent[];
}
