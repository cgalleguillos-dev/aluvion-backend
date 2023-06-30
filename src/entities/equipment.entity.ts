import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BaseEquipment } from "./base-equipment.entity";
import { Component } from "./component.entity";
import { Simulation } from "./simulation.entity";
import { ComposeComponent } from "./compose-component.entity";

@Entity()
export class Equipment {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    description: string;

    @Column({ default: true })
    isActive: boolean;

    @ManyToOne(type => BaseEquipment, baseEquipment => baseEquipment.equipments)
    baseEquipment: BaseEquipment;

    @OneToMany(type => Simulation, simulation => simulation.equipment)
    simulations: Simulation[];

    @ManyToMany(type => ComposeComponent, composeComponent => composeComponent.equipments)
    composeComponents: ComposeComponent[];
}