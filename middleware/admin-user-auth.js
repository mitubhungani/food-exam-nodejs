const User = require("../model/user.model")

const rolebase = async (req,res,next)=>{
    let {id} = req.cookies
    console.log(id)

    let user = await User.findById(id)
    console.log("user role",user.role);

    if(user.role === "admin"){
        next()
    }else{
        res.redirect('/foods')
        console.log("You are not admin")
    }
}

module.exports = rolebase