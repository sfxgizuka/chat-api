import { Request, Response, NextFunction} from 'express'
import AppDataSource from '../database/database';
import { Comments } from '../entities/comments.entity';
import { Post } from '../entities/post.entity';

export const makeComment = async(req:Request, res: Response)=>{
    try{
        const { content } = req.body
        console.log(req.params)
        const postPk = +req.params.postId
        const commentRepository = AppDataSource.getRepository(Comments)
        const postRepository = AppDataSource.getRepository(Post)
        const post = await postRepository.findOne({ where: { pk: postPk } } )

        if(!post){
            return res.status(404).json({
                status: 'error',
                message: 'no post associated with id'
            })
        }

        const commentPayload = new Comments()
        commentPayload.content = content
        commentPayload.post = post

        let savedComment = await commentRepository.save(commentPayload)

        res.json({
            status: 'success',
            comment: savedComment
        })
    }catch(err){

    }
}