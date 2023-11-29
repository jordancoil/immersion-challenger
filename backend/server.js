require("dotenv").config()
const express = require("express")
const cors = require("cors")
const channelRoutes = require("./routes/channelRoutes")
const authRoutes = require("./routes/authRoutes")

const app = express()

// MIDDLEWARE
// TODO: ADD AUTHENTICATION LAYER TO CHECK FOR JSON WEB TOKENS 
app.use(cors())
app.use(express.json())
// app.use((err, req, res, next) => {
//     console.error(err.stack)
//     res.status(500).send('Something broke!')
// });
app.use((req, res, next) => {
    // LOGGER
    console.log(req.path, req.method)
    next()
})

// ROUTES
app.use("/api/channels", channelRoutes)
app.use("/api/auth", authRoutes)

app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`)
})
