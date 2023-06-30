import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Component } from "./component.entity";
import { TypeComponent } from "./type-component.entity";
import { Pin } from "./pin.entity";
import { Arduino } from "./arduino.entity";
import { Equipment } from "./equipment.entity";
import { Event } from "./event.entity";
@Entity()
export class ComposeComponent {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(type => TypeComponent, typeComponent => typeComponent.components)
    typeComponent: TypeComponent;

    @Column()
    description: string;

    @OneToMany(type => Pin, pin => pin.composeComponent)
    pins: Pin[];

    @ManyToOne(type => Arduino, arduino => arduino.composeComponents)
    arduino: Arduino;

    @OneToMany(type => Component, component => component.composeComponent)
    components: Component[];

    @OneToMany(type => Event, event => event.composeComponent)
    eventList: Event[];

    @ManyToMany(type => Equipment, equipment => equipment.composeComponents)
    @JoinTable()
    equipments: Equipment[];


}