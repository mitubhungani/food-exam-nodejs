const {Router} = require('express')
const { getFood, getFoodById, createFood, updateFood, deleteFood, foodAddPage, foodEditPage, listedProduct } = require('../controller/food.controller')
const isLogin = require('../middleware/isLogin')
const rolebase = require('../middleware/admin-user-auth')
const upload = require('../utils/uploadimg')

const foodRouter =Router()

foodRouter.get('/listed', isLogin,rolebase,listedProduct)
foodRouter.get('/addfood',rolebase,foodAddPage)
foodRouter.get('/updatefood/:id',rolebase,foodEditPage)
foodRouter.get('/listed', isLogin,getFood)

foodRouter.get('/:id',getFoodById)
foodRouter.post('/addfood',upload.single("image"),createFood)
foodRouter.post('/updatefood/:id',upload.single("image"),updateFood)
foodRouter.delete('/deletefood/:id',deleteFood)

module.exports = foodRouter