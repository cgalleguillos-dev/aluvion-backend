import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Simulation } from "./simulation.entity";
import { ComposeComponent } from "./compose-component.entity";

@Entity()
export class Event {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    intensity: number;

    @Column()
    time: number;

    @ManyToOne(type => Simulation, simulation => simulation.eventList)
    simulation: Simulation;

    @ManyToOne(type => ComposeComponent, composeComponent => composeComponent.eventList)
    composeComponent: ComposeComponent;
}