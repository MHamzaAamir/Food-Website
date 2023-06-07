const User = require('../models/userModel.js')
const jwt = require("jsonwebtoken")

const createToken = (__id)=>{
    return jwt.sign({__id},'fjskdnkdsaflkaflksdvs',{expiresIn:'3d'})
}


//login
const loginUser = async(req,res)=>{
    const {phonenumber, password} = req.body
    try{
        const user = await User.login(phonenumber,password)
        const name = user.name
        const role = user.role
        //create token 
        const token = createToken(user._id)

        res.status(200).json({name,phonenumber,role,token})

    }catch(error)
    {
        res.status(400).json({error: error.message})
    }

}

//signup
const signupUser = async(req,res)=>{
    const {name,phonenumber,password,role,vehicle} = req.body

    try{
        const user = await User.signup(name,phonenumber,password,role,vehicle)
        //create token 
        const token = createToken(user._id)

        res.status(200).json({name,phonenumber,role,token})

    }catch(error)
    {
        res.status(400).json({error: error.message})
    }
}

module.exports ={signupUser,loginUser}
