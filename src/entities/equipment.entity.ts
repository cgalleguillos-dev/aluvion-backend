import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BaseEquipment } from "./base-equipment.entity";
import { Component } from "./component.entity";
import { Simulation } from "./simulation.entity";

@Entity()
export class Equipment {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    description: string;

    @OneToMany(type => Component, component => component.equipment)
    components: Component[];

    @ManyToOne(type => BaseEquipment, baseEquipment => baseEquipment.equipments)
    baseEquipment: BaseEquipment;

    @OneToMany(type => Simulation, simulation => simulation.equipment)
    simulations: Simulation[];
}