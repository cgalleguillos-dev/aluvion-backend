import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ComposeComponent } from './compose-component.entity';
import { Pin } from './pin.entity';
import { Arduino } from './arduino.entity';
import { TypeComponent } from './type-component.entity';

@Entity()
export class Component {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(type => TypeComponent, typeComponent => typeComponent.components)
    typeComponent: TypeComponent;

    @Column()
    description: string;

    @OneToMany(type => Pin, pin => pin.component)
    pins: Pin[];

    @ManyToOne(type => Arduino, arduino => arduino.components)
    arduino: Arduino;

    @ManyToOne(type => ComposeComponent, composeComponent => composeComponent.components,
        { nullable: true })
    composeComponent: ComposeComponent;
}