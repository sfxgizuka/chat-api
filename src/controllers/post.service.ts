import { Request, Response, NextFunction} from 'express'
import AppDataSource from '../database/database';
import User from '../entities/user.entity';
import { Post } from '../entities/post.entity';
import { SelectQueryBuilder } from 'typeorm';

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

export const getMostPostMakers = async(req:Request, res: Response)=>{
    try{
        const postRepository = AppDataSource.getRepository(User);
        const queryBuilder: SelectQueryBuilder<User> = postRepository.createQueryBuilder('users')
        .leftJoinAndSelect('users.post', 'posts')
        .leftJoinAndSelect('posts.comment', 'comments')
        .select(['users.pk as pk', 'users.username as name', 'posts.title as title', 'comments.content as content'])
        .where('comments."createdAt" = (SELECT MAX("createdAt") FROM comments WHERE comments."postPk" = posts."pk")')
        .orderBy('(SELECT COUNT(post."pk") FROM post WHERE post."userPk" = users."pk")', 'DESC')
        .limit(3);
        
        const result = await queryBuilder.getRawMany();
        res.json(result)

    }catch(error){
        res.status(400).json({
            status: 'error',
            message: error.message
        })
    }
   
}