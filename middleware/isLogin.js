const isLogin = (req, res, next)=>{
    let {id} = req.cookies
    if(id){
        next()
    }else{
        res.redirect('users/login')
    }
}

module.exports = isLogin