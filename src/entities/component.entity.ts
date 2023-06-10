import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import { Pin } from './pin.entity';
import { BaseEquipment } from './base-equipment.entity';
import { Equipment } from './equipment.entity';
import { Arduino } from './arduino.entity';

@Entity()
export class Component {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    description: string;

    @OneToMany(type => Pin, pin => pin.component)
    pins: Pin[];

    @ManyToOne(type => Equipment, equipment => equipment.components)
    equipment: Equipment;

    @ManyToOne(type => Arduino, arduino => arduino.components)
    arduino: Arduino;
}
