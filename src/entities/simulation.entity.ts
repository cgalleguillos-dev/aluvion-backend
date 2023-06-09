import { Entity, Column, ManyToMany, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import { Event } from './event.entity';
import { Equipment } from './equipment.entity';

@Entity()
export class Simulation {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    description: string;

    @Column()
    date: Date;

    @ManyToOne(type => Equipment, equipment => equipment.simulations)
    equipment: Equipment;

    @OneToMany(type => Event, event => event.simulation)
    eventList: Event[];
}
