const mongoose = require('mongoose')
const Schema = mongoose.Schema


const restaurantSchema = new Schema({
    name: {
        type:String,
        required:true
    },
    subheading:{
        type:String,
        required:true
    },
    imageURL:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model('Restaurant',restaurantSchema)

