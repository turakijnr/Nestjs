import {BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {TaskStatus} from "./task-status.enum";
import {User} from "../auth/user.entity";


@Entity()
export  class Task extends  BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    title: string;
    @Column()
    description: string;
    @Column()
    status: TaskStatus;
    //many tasks to one user
    @ManyToOne(type =>User, user=> user.tasks,{eager: false})
    user:User
    @Column()
    userId: number;
}