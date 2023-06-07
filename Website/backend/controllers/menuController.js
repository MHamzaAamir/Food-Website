const Menu = require('../models/menuModel.js')


const getMenu = async (req, res) => {
    const name = req.params.name
    const menus = await Menu.find({restaurant: name})

    res.status(200).json(menus)
}

module.exports = { getMenu }