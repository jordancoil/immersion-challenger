require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const channelRoutes = require("./routes/channelRoutes")

const app = express()

// MIDDLEWARE
app.use(express.json())
app.use((req, res, next) => {
    // LOGGER
    console.log(req.path, req.method)
    next()
})

// ROUTES
app.use("/api/channels", channelRoutes)

// DB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // LISTEN
        app.listen(process.env.PORT, () => {
            console.log(`listening on port ${process.env.PORT}`)
        })
    })
    .catch((error) => {
        console.log(error)
    })
