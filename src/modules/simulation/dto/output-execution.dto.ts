class SetupOutputExecution {
    type: string;
    equipment: string;
    arduinos: string[];
    components:
        {
            description: string;
            pins:
            {
                pin: number;
                mode: string;
            }[]
        }[];
}

class SimulationOutputExecution {
    type: string;
    events:
        {
            startTime: number;
            endTime: number;
            component: string;
            intensity: number;
        }[]
}

export class OutputExecution {
    setup: SetupOutputExecution;
    simulation: SimulationOutputExecution;
}