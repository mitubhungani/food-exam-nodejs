const {Router} =require('express')
const { getUser, getUserById, createUser, login, signupPage, loginPage } = require('../controller/user.controller')

const userRouter = Router()

userRouter.get('/signup',signupPage)
userRouter.get('/login',loginPage)

userRouter.get('/',getUser)
userRouter.get('/:id',getUserById)
userRouter.post('/signup',createUser)

userRouter.post('/login',login)


module.exports = userRouter