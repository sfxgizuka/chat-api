import { Router } from 'express'
import { auth, getUsers, login, signUp } from '../controllers/user.service'
import { makePost } from '../controllers/post.service'
import { validateInput } from '../middleware/joi.middleware'
import { userSchema, loginSchema } from '../schemas/user.schema'
import { postSchema } from '../schemas/post.schema'

const router = Router()

//get user here
router.get('/', getUsers)

//sign up here
router.post('/signup',validateInput(userSchema), signUp)

//login here
router.post('/login',validateInput(loginSchema), login)


//protected routes

//create a user post
router.post('/:id/posts',auth, validateInput(postSchema), makePost)



export default router