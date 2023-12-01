const express = require("express")
const videoController = require("../controllers/videoController")

const router = express.Router()

router.post("/:id/mark-watched/:userId", videoController.markVideoWatched)

router.post("/:id/mark-not-watched/:userId", videoController.markVideoNotWatched)

module.exports = router