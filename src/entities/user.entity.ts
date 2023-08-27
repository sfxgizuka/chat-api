import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Post } from './post.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  pk:number;

  @Column({ type: 'text', nullable: true })
  username:string;

  @Column({ type: 'text', nullable: true })
  email: string;

  @Column({ type: 'text', nullable: true })
  password: string;

  @OneToMany(()=> Post, (post)=> post.user)
  post: Post
}

export default User