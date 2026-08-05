const Rating = require('../models/Rating')
const Item = require('../models/Item')

// POST — Submit rating
const submitRating = async (req, res) => {
    try {
        const { score, review } = req.body
        const itemId = req.params.id

        // Check if already rated
        const existing = await Rating.findOne({
            user: req.user.id,
            item: itemId
        })

        if (existing) {
            // Update existing rating
            existing.score = score
            existing.review = review
            await existing.save()
        } else {
            // Create new rating
            const rating = new Rating({
                user: req.user.id,
                item: itemId,
                score,
                review
            })
            await rating.save()
        }

        // Recalculate avgRating
        const ratings = await Rating.find({ item: itemId })
        const avg = ratings.reduce((sum, r) => sum + r.score, 0) / ratings.length

        await Item.findByIdAndUpdate(itemId, {
            avgRating: avg.toFixed(1),
            ratingCount: ratings.length
        })

        res.json({ message: "Rating submitted!" })

    } catch (error) {
        res.status(500).json({ message: "Something went wrong!", error })
    }
}

// GET — User's ratings
const getUserRatings = async (req, res) => {
    try {
        const ratings = await Rating.find({ user: req.user.id })
            .populate('item')
        res.json(ratings)

    } catch (error) {
        res.status(500).json({ message: "Something went wrong!", error })
    }
}

// GET — Recommendations
const getRecommendations = async (req, res) => {
    try {
        // Find genres user rated 4 or 5 stars
        const highRatings = await Rating.find({
            user: req.user.id,
            score: { $gte: 4 }
        }).populate('item')

        // Get liked genres
        const likedGenres = [...new Set(
            highRatings.flatMap(r => r.item.genre)
        )]

        // Get items user already rated
        const ratedItems = await Rating.find({ user: req.user.id })
        const ratedIds = ratedItems.map(r => r.item)

        // Find items in liked genres not yet rated
        const recommendations = await Item.find({
            genre: { $in: likedGenres },
            _id: { $nin: ratedIds }
        }).sort({ avgRating: -1 }).limit(10)

        // Fallback if no recommendations
        if (recommendations.length === 0) {
            const popular = await Item.find()
                .sort({ avgRating: -1 })
                .limit(10)
            return res.json(popular)
        }

        res.json(recommendations)

    } catch (error) {
        res.status(500).json({ message: "Something went wrong!", error })
    }
}

module.exports = { submitRating, getUserRatings, getRecommendations }