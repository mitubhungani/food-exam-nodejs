const {Router} = require('express')
const { getFood, getFoodById, createFood, updateFood, deleteFood, foodAddPage, foodEditPage } = require('../controller/food.controller')
const isLogin = require('../middleware/isLogin')
const Food = require('../model/food.model')

const foodRouter =Router()

foodRouter.get('/addfood',foodAddPage)
foodRouter.get('/updatefood/:id',foodEditPage)

// foodRouter.get('/listed',isLogin,getFood)
foodRouter.get('/listed', isLogin,async (req, res) => {
    let food =await Food.find()
    res.render('listedfood',{food})
})

// foodRouter.get('/listed', isLogin,getFood)

foodRouter.get('/:id',getFoodById)
foodRouter.post('/addfood',createFood)
foodRouter.patch('/updatefood/:id',updateFood)
foodRouter.delete('/deletefood/:id',deleteFood)

module.exports = foodRouter