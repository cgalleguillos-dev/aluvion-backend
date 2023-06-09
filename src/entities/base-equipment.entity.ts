import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Component } from './component.entity';
import { Equipment } from './equipment.entity';

@Entity()
export class BaseEquipment {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    description: string;

    @OneToMany(type => Component, component => component.baseEquipment)
    components: Component[];

    @OneToMany(type => Equipment, equipment => equipment.baseEquipment)
    equipments: Equipment[];
}
