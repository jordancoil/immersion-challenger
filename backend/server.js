require("dotenv").config()
const express = require("express")
const cors = require("cors")
const channelRoutes = require("./routes/channelRoutes")
const videoRoutes = require("./routes/videoRoutes")
const authRoutes = require("./routes/authRoutes")

const app = express()

// MIDDLEWARE
app.use(cors())
app.use(express.json())
app.use((req, res, next) => {
    // LOGGER
    console.log(req.path, req.method)
    next()
})

// ROUTES
app.use("/api/channels", channelRoutes)
app.use("/api/videos", videoRoutes)
app.use("/api/auth", authRoutes)

app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`)
})
