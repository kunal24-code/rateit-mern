const mongoose = require('mongoose')

const ratingSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true },
    score: { type: Number, min: 1, max: 5, required: true },
    review: { type: String, default: "" },
    createdAt: { type: Date, default: Date.now }
})

// Prevent duplicate ratings
ratingSchema.index({ user: 1, item: 1 }, { unique: true })

module.exports = mongoose.model('Rating', ratingSchema)