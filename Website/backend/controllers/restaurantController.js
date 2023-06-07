const Restaurant = require('../models/restaurantModel.js')


const getRestaurants = async (req, res) => {

    try{
        const restaurants = await Restaurant.find({})

        res.status(200).json(restaurants)
    }catch(error)
    {
        res.status(400).json({error:error.message})
    }
}


const makeRestaurant = async(req, res)=> {
    const { name, subheading, imageURL } = req.body

    try {
        const restaurant = await Restaurant.create({ name, subheading, imageURL })

        res.status(200).json({ restaurant })

    } catch (error) {
        res.status(400).json({ error: error.message })

    }

}

module.exports = { getRestaurants ,makeRestaurant}
