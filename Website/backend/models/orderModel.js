const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    phonenumber:{
        type:String,
        required:true
    },
    items:[{
        id:{
            type:String,
            required:true
        },
        name:{
            type:String,
            required:true
        },
        variant:{
            type:String,
            required:true
        },
        price:{
            type:Number,
            required:true
        },
        quantity:{
            type:Number,
            required:true
        },
        restaurant:{
            type:String,
            required:true
        },
        category: {
            type: String,
            required: true
        },
        imageURL:{
            type:String,
            required:true
        }
    }],
    lng:{
        type: String,
        required:true
    },
    lat:{
        type: String,
        required:true
    },
    location:{
        type: String,
        required:true
    },
    status:{
        type: String,
        required:true
    },
    acceptedby:
    {
        type:String,
    },
    totalprice:
    {
        type:Number,
        required:true
    }
})

module.exports = mongoose.model('Order',orderSchema)