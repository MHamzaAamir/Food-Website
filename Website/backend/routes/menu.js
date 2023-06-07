const express = require('express')
const router = express.Router()

const {getMenu} = require('../controllers/menuController')

const requireAuth = require('../middleware/requireAuth')

router.use(requireAuth)

router.get("/getAll/:name",getMenu)


module.exports = router