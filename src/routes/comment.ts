import { Router } from 'express'
import { makeComment } from '../controllers/comments.service'
import { auth } from '../controllers/user.service'
import { getMostPostMakers } from '../controllers/post.service'
import { validateInput } from '../middleware/joi.middleware'
import { commentSchema } from '../schemas/comment.schema'

const router = Router()


//comment to a post
router.post('/:postId/comments', auth, validateInput(commentSchema),makeComment)

//fetch top 3 poster's
router.get('/highest', auth, getMostPostMakers)


export default router