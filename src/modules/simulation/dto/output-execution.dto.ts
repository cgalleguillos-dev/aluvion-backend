class SetupOutputExecution {
    arduinos: ArduinoOutputExecution[];
}

class SimulationOutputExecution {
    sequence:
        {
            arduino: string;
            time: number;
            position: number;
        }[]
}

class ArduinoOutputExecution {
    id: string;
    pins: {
        pin: number;
        mode: string;
    }[]
}

export class OutputExecution {
    setup: SetupOutputExecution;
    sequence: SimulationOutputExecution;
}

