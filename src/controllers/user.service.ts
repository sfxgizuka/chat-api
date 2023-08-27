import { Request, Response, NextFunction} from 'express'
import AppDataSource from '../database/database';
import User from '../entities/user.entity';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import { encryptor, tokenGen } from '../helpers/utility';
import { UserDto } from '../dto/user.dto';

export const signUp = async(req:Request, res: Response) =>{
    try {
        const { username, email, password } = req.body;
        // const userRepository = getRepository(User);
        const userRepo = AppDataSource.getRepository(User)
        // Create a new user entity
        const newUser = new User();
        newUser.username = username;
        newUser.email = email;
        newUser.password = await encryptor(password);
    
        // Save the user entity to the database
        const savedUser = await userRepo.save(newUser);
    
        res.status(201).json(savedUser);
      } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Error creating user' });
      }
}

export const login = async(req:Request, res: Response) => {
    try{
      const userRepository = AppDataSource.getRepository(User);
      let { email, password} = req.body;
      const user = await userRepository.findOne( { where: { email } } )
        const result = await bcrypt.compare(password, user.password);
      if(!result){
        res.status(400).json({status:"error", error:"failed to login, enter valid details"})
      }else{
        const token = await tokenGen({username:user.username, pk:user.pk});
        const { password, ...userWithoutPassword } = user;
      
        res.status(200).json({ userWithoutPassword, token});
    }
    }catch(err){
      res.status(400).json({status:"error", error: err.message})
    }
  
  }

  export const auth = async(req:Request, res: Response, next: NextFunction) =>{
    const authHeader = req.headers.authorization;

    if (authHeader) {
      const token = authHeader.split(' ')[1];
      jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
        if (err) {
          return res.sendStatus(403);
        }
  
        req.user = user;
        next();
      });
    } else {
      res.sendStatus(401);
    }
  }

  export const getUsers = async(req:Request, res:Response)=>{
    console.log('reached')
    const userRepository = AppDataSource.getRepository(User);
    let users  = await userRepository.find();
    let usersWithoutPassword = users.map(user =>{
        return {
            pk: user.pk,
            username: user.username,
            email: user.email
        }
    })
    res.json({
        status: 'success',
        users: usersWithoutPassword
    })
  }