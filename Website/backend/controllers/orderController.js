const Order = require('../models/orderModel.js')



const placeOrder = async (req,res) =>{
    console.log("place hit")


    // const {name,phonenumber,items,status,totalprice}= req.body
    const {name,phonenumber,items,lng,lat,location,status,acceptedby,totalprice}= req.body

    try{
        // const order = await Order.create({name,phonenumber,items,status,totalprice})
        const order = await Order.create({name,phonenumber,items,lng,lat,location,status,acceptedby,totalprice})
        res.status(200).json({order})
    }
    catch(error)
    {
        res.status(400).json({error:error.message})
    }

}

const getAll = async (req,res) =>{
    const phonenumber = req.params.phonenumber
    console.log(req.params.phonenumber)

    try{
        const order = await Order.find({
        $or: [{ acceptedby: "" }, { acceptedby: phonenumber }],
        });

        res.status(200).json({order})
    }
    catch(error)
    {
        res.status(400).json({error:error.message})
    }
    
}

const updateNumber = async (req,res) =>{
    const {id,phonenumber}= req.body

    try{
        const order = await Order.findById(id)
        if(order.acceptedby == "")
        {
        const ordernew = await Order.findByIdAndUpdate(id, {acceptedby: phonenumber})
        res.status(200).json({ordernew})

        }else
        {
            throw new Error('Order already Accepted')     
        }


    }
    catch(error)
    {
        res.status(400).json({error:error.message})
    }
}


const deletesome = async(req,res) =>{
    const id = req.params.id
    try{
        await Order.findByIdAndDelete(id)
        res.status(200).json({Job:"done"})
    }catch(error)
    {
        res.status(400).json({error})
    }
}   

module.exports = { placeOrder,getAll,updateNumber ,deletesome}
