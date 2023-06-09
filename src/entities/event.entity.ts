import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Simulation } from "./simulation.entity";

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
}