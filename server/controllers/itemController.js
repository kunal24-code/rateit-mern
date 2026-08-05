const Item = require('../models/Item')

// GET all items
const getItems = async (req, res) => {
    try {
        const { type, genre } = req.query
        let filter = {}

        if (type) filter.type = type
        if (genre) filter.genre = genre

        const items = await Item.find(filter)
        res.json(items)

    } catch (error) {
        res.status(500).json({ message: "Something went wrong!", error })
    }
}

// GET single item
const getItemById = async (req, res) => {
    try {
        const item = await Item.findById(req.params.id)
        if (!item) return res.status(404).json({ message: "Item not found!" })
        res.json(item)

    } catch (error) {
        res.status(500).json({ message: "Something went wrong!", error })
    }
}

module.exports = { getItems, getItemById }