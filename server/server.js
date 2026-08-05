const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const authRoutes = require('./routes/authRoutes')
const itemRoutes = require('./routes/itemRoutes')
const ratingRoutes = require('./routes/ratingRoutes')

const app = express()

app.use(cors())
app.use(express.json())

// Health check
app.get('/api/health', (req, res) => {
    res.json({ message: "Server is running! ✅" })
})

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/items', itemRoutes)
app.use('/api/users', ratingRoutes)
app.use('/api/recommendations', ratingRoutes)

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("✅ MongoDB connected!"))
.catch(err => console.log("❌ MongoDB Error:", err))

app.listen(process.env.PORT, () => {
    console.log(`✅ Server running on port ${process.env.PORT}`)
})