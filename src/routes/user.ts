import { Router } from 'express'
import { auth, getUsers, login, signUp } from '../controllers/user.service'
import { makePost } from '../controllers/post.service'

const router = Router()

//get user here
router.get('/', getUsers)

//sign up here
router.post('/signup', signUp)

//login here
router.post('/login', login)


//protected routes

//create a user post
router.post('/:id/posts',auth, makePost)



export default router