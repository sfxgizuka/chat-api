import { Exclude } from 'class-transformer';
import User from '../entities/user.entity';

export class UserDto extends User {
  pk: number;
  username: string;
  @Exclude()
  password: string
  // Other fields you want to include
  
}