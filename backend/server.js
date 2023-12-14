const express = require("express")
const cors = require("cors")
const channelRoutes = require("./routes/channel.routes")
const videoRoutes = require("./routes/videoRoutes")
const authRoutes = require("./routes/auth.routes")

function createServer() {
  const app = express()

  // MIDDLEWARE
  app.use(cors())
  app.use(express.json())
  app.use((req, res, next) => {
    // LOGGER
    console.log(req.path, req.method)
    next()
  })
  app.use((err, req, res, next) => {
    // ERROR HANDLING
    console.error(err.stack);
    res.status(err.status || 500).json(response.error(err.status || 500));
  });

  // ROUTES
  app.use("/api/channels", channelRoutes)
  app.use("/api/videos", videoRoutes)
  app.use("/api/auth", authRoutes)

  return app
}

module.exports = {createServer}