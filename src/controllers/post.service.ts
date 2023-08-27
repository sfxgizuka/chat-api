import { Request, Response, NextFunction} from 'express'
import AppDataSource from '../database/database';
import User from '../entities/user.entity';
import { Post } from '../entities/post.entity';

export const makePost = async(req:Request, res: Response)=>{
   try{
    const { title, message} = req.body
    const userPk = +req.params.id
    const userRepository = AppDataSource.getRepository(User);
    const postRepository = AppDataSource.getRepository(Post);
    const user = await userRepository.findOne( { where: { pk: userPk } } )
    if(!user){
        return res.status(404).json({ 
            status: 'error',
            message: 'no user with id specified'
        })
    }

    const postPayload = new Post()
    postPayload.title = title
    postPayload.message = message
    postPayload.user = user

    const savedPost = postRepository.save(postPayload)

    res.json({
        status: 'success',
        message: savedPost
    })
   }catch(err){
        res.status(400).json({
            status: 'error',
            message: err.message
        })
   }
}