const express = require('express')
const router = express.Router()

const {placeOrder,getAll,updateNumber,deletesome} = require("../controllers/orderController.js")

const requireAuth = require('../middleware/requireAuth')

// router.use(requireAuth)

router.post("/placeorder",placeOrder)
router.get("/getAll/:phonenumber",getAll)
router.post("/updatenumber",updateNumber)
router.get("/delete/:id",deletesome)



module.exports = router
