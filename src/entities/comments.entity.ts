import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Post } from './post.entity';

@Entity()
export class Comments{
    @PrimaryGeneratedColumn()
    pk:number; 

    @Column({ type: 'text', nullable: true })
    content: string;

    @ManyToOne(()=> Post, (post)=> post.comment)
    post: Post

    @CreateDateColumn()
    createdAt: Date;
}