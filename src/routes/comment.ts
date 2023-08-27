import { Router } from 'express'
import { makeComment } from '../controllers/comments.service'
import { auth } from '../controllers/user.service'

const router = Router()



//comment to a post
router.post('/:postId/comments',auth, makeComment)

//fetch top 3 posters
router.get('top')

export default router