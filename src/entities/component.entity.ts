import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import { Pin } from './pin.entity';
import { BaseEquipment } from './base-equipment.entity';
import { Equipment } from './equipment.entity';

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

    @ManyToOne(type => BaseEquipment, baseEquipment => baseEquipment.components)
    baseEquipment: BaseEquipment;
}
