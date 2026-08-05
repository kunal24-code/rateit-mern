const express = require('express')
const router = express.Router()
const { getUserRatings, getRecommendations } = require('../controllers/ratingController')
const protect = require('../middleware/authMiddleware')

router.get('/me', protect, getUserRatings)
router.get('/recommendations', protect, getRecommendations)

module.exports = router