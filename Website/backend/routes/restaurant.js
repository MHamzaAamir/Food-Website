const express = require('express')
const router = express.Router()

const {getRestaurants,makeRestaurant} = require('../controllers/restaurantController')

const requireAuth = require('../middleware/requireAuth')

// router.use(requireAuth)

router.get("/getAll",getRestaurants)
router.post("/make",makeRestaurant)

module.exports = router