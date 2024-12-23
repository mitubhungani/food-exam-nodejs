const Food = require("../model/food.model")
const User = require("../model/user.model")

const getFood =async (req,res,)=>{
    try {
    let food = await Food.find()
    res.status(201).json(food)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

const getFoodById = async (req,res,)=>{
    try {
        let { id } = req.params;
        let food = await Food.findById(id);
        res.status(201).send(food);
      } catch (error) {
        res.status(500).send({ error: "Server Error" });
      }
}

const createFood = async (req,res)=>{
    try {

//         console.log("request",req.file);
//   if(req.file){
//     req.body.img = req.file.path;
//   }

let image = req?.file?.path || null

        let {name, price,category,description} =req.body

        let {id} = req.cookies;

        console.log(id);
        const user = await User.findById(id)
        // console.log(user.username)

        const newFood =new Food({
            name,
            price,
            category,
            description,
            image,
            addedBy: user.username
        })
        console.log('newfood',newFood);
        
        await newFood.save()
        res.status(201).json({food:newFood})
    } catch (error) {
        res.status(500).send({ error: "Server Error" });
    }
}

const updateFood = async (req,res)=>{
    try {
        let image = req?.file?.path || null
        let { id } = req.params;
        req.body.image = image
        let food = await Food.findByIdAndUpdate(id, req.body, {new: true})
        res.status(201).send(food)
        // res.redirect('/food/listed');
    } catch (error) {
        res.status(500).send({ error: "Server Error" });
    }
}

const deleteFood = async (req,res)=>{
    try {
        let { id } = req.params;
        await Food.findByIdAndDelete(id)
        res.status(201).send({ message: "Food deleted successfully" })
    } catch (error) {
        res.status(500).send({ error: "Server Error" });
    }
}

const foodAddPage= async (req,res)=>{
    res.render('foodadd')
}

const foodEditPage = async (req,res)=>{
    let { id } = req.params;
    const food   = await Food.findById(id);
    console.log('food',food);
    res.render('updatefood',{food})
    console.log('food-updated',food);
    
}

const listedProduct =async (req,res)=>{
    let food = await Food.find()
    res.render('listedfood',{food})
}

module.exports = {
    getFood,
    getFoodById,
    createFood,
    updateFood,
    deleteFood,
    foodAddPage,
    foodEditPage,
    listedProduct
}