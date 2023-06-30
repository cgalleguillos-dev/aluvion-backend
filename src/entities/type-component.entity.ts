import { Column, Entity, OneToMany } from "typeorm";
import { Component } from "./component.entity";
import { ComposeComponent } from "./compose-component.entity";

@Entity(
    { name: 'type_component' }
)
export class TypeComponent {
    @Column({ primary: true, generated: true })
    id: number;

    @Column()
    description: string;

    @OneToMany(type => Component, component => component.typeComponent)
    components: Component[];

    @OneToMany(type => ComposeComponent, composeComponent => composeComponent.typeComponent)
    composeComponents: ComposeComponent[];

}