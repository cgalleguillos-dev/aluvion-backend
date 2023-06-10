import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Equipment } from './equipment.entity';
import { Arduino } from './arduino.entity';

@Entity()
export class BaseEquipment {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    description: string;

    @OneToMany(type => Arduino, arduino => arduino.baseEquipment)
    arduinos: Arduino[];

    @OneToMany(type => Equipment, equipment => equipment.baseEquipment)
    equipments: Equipment[];
}