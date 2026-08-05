const express = require('express')
const router = express.Router()
const { getItems, getItemById } = require('../controllers/itemController')
const { submitRating } = require('../controllers/ratingController')
const protect = require('../middleware/authMiddleware')

router.get('/', getItems)
router.get('/:id', getItemById)
router.post('/:id/ratings', protect, submitRating)

module.exports = router