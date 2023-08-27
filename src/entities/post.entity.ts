import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { Comments } from './comments.entity';
import User from './user.entity';

@Entity()
export class Post{
    @PrimaryGeneratedColumn()
    pk:number; 

    @Column({ type: 'text', nullable: true })
    title: string

    @Column({ type: 'text', nullable: true })
    message: string

    @OneToMany(()=>Comments, (comment) => comment.post)
    comment: Comments

    @ManyToOne(()=>User,(user) => user.post)
    user: User


}