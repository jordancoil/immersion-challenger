const express = require("express")
const channelController = require("../controllers/channelController")

const router = express.Router()

// GET aLL channels
router.get("/", channelController.getChannels)

// GET a single channel
router.get("/:id", channelController.getChannel)

// POST a new channel
router.post("/", channelController.createChannel)

// DELETE a new channel
router.delete("/:id", channelController.deleteChannel)

// UPDATE a channel
router.patch("/:id", channelController.updateChannel)

module.exports = router