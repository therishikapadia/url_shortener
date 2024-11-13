const User=require('../models/user')
const {setUser}=require('../service/auth')

async function handleUserSignup(req,res) {
    const {name,email,password}=req.body
    await User.create({
        name:name,
        email:email,
        password:password
    })
    return res.redirect('/')
}
async function handleUserLogin(req,res) {
    const {email,password}=req.body
    const user=await User.findOne({email,password})
    if(!user) return res.render('login',{err:"invalid username or password"})

    const token=setUser(user)
    res.cookie('token',token)
    return res.redirect('/')
}

module.exports={handleUserSignup,handleUserLogin}