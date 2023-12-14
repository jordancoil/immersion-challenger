const express = require("express")
const channelController = require("../controllers/channel.controller")

const router = express.Router()

// GET aLL channels
router.get("/", channelController.getChannels)

// GET a single channel
router.get("/:id", channelController.getChannel)

// GET all videos for a channel
router.get("/:id/videos", channelController.getVideosForChannel)

// GET all watched videos for a channel and user
router.get("/:id/videos/watched/:userId", channelController.getVideosWithWatchedStatus)

// POST a new channel
router.post("/", channelController.createChannel)

// DELETE a new channel
router.delete("/:id", channelController.deleteChannel)

// UPDATE a channel
router.patch("/:id", channelController.updateChannel)

module.exports = router