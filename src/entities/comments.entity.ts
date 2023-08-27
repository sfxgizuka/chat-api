import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Post } from './post.entity';

@Entity()
export class Comments{
    @PrimaryGeneratedColumn()
    pk:number; 

    @Column({ type: 'text', nullable: true })
    content: string;

    @ManyToOne(()=> Post, (post)=> post.comment)
    post: Post
}