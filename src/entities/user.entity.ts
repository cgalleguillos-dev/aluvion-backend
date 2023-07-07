import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt';

@Entity({
    name: 'users'
})
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({
        unique: true
    })
    email: string;

    @Column()
    password: string;

    encryptPassword(password: string) {
        const salt = bcrypt.genSaltSync(10);
        this.password = bcrypt.hashSync(password, salt);
    }

    validatePassword(password: string): boolean {
        return bcrypt.compareSync(password, this.password);
    }

    getInfoToToken() {
        return {
            id: this.id,
            name: this.name,
            email: this.email
        }
    }
}
