const mongoose = require('mongoose')
const Schema = mongoose.Schema


const userSchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    phonenumber:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true
    },
    vehicle:{
        type:String,
    }
})

//static signup method
userSchema.statics.signup = async function (name,phonenumber,password,role,vehicle) {


    const exists = await this.findOne({phonenumber})

    if(exists){
        throw Error("Phonenumber already in use")
    }


    const user = await this.create({name,phonenumber,password,role,vehicle})

    return user
}


//static login method
userSchema.statics.login = async function (phonenumber,password){

    if (!phonenumber || !password)
    {
        throw Error("All Fields must be filled")
    }
    
      
    const user = await this.findOne({phonenumber})

    if (!user)
    {
        throw Error("Phonenumber Not Found")
    }

    const match = (password == user.password)

    if (!match){
        throw Error("Incorrect Password")
    }

    return user
}


module.exports = mongoose.model('User',userSchema)