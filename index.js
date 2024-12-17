const express = require('express');
const path = require('path');
const Cookies = require("cookie-parser");
const DBConnect = require('./config/db');
const userRouter = require('./router/user.route');
const isLogin = require('./middleware/isLogin');
const foodRouter = require('./router/food.route');
const Food = require('./model/food.model');

const app = express();
app.use(Cookies());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get('/',isLogin, (req, res) => {
    res.send('Hello World!');
})

app.get('/foods', isLogin,async (req, res) => {
    let food =await Food.find()
    res.render('index',{food})
})

app.use('/users',userRouter)
app.use('/food',isLogin,foodRouter)

app.listen(8090,() => {
    console.log('listening on port 8090');
    DBConnect()
})