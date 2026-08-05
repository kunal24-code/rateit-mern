const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ["movie", "book"],   // only these two values allowed
        required: true
    },
    genre: [String],               // array of genres ["Sci-Fi", "Drama"]
    description: String,
    releaseYear: Number,
    posterUrl: String,
    avgRating: {
        type: Number,
        default: 0
    },
    ratingCount: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model('Item', itemSchema)