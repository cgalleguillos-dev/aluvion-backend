import { Entity, Column, ManyToMany, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Component } from './component.entity';

@Entity()
export class Pin {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    comunicationType: string;

    @Column()
    signalType: string;

    @Column()
    pinNumber: number;

    @ManyToOne(type => Component, component => component.pins)
    component: Component;
}