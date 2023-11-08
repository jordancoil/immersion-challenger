require("dotenv").config()
const express = require("express")
const cors = require("cors")
const channelRoutes = require("./routes/channelRoutes")

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

app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`)
})
