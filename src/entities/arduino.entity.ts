import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BaseEquipment } from "./base-equipment.entity";
import { Component } from "./component.entity";

@Entity()
export class Arduino {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    description: string;

    @ManyToOne(type => BaseEquipment, baseEquipment => baseEquipment.arduinos)
    baseEquipment: BaseEquipment;

    @OneToMany(type => Component, component => component.arduino)
    components: Component[];
}
