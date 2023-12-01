const videoQueries = require("../db/queries/videoQueries")

const markVideoWatched = async (req, res, next) => {
    try {
        const { id, userId } = req.params

        videoQueries.markVideoWatched(id, userId).then((result) => {
            res.status(200).json(result.rows[0])
        }).catch((error) => {
            res.status(500).json({
                message: error.message || "An error occurred while marking video watched."
            })
        })
    } catch (error) {
        res.status(500).json({
            message: error.message || "An error occurred while marking video watched."
        })
    }
}

const markVideoNotWatched = async (req, res, next) => {
    try {
        const { id, userId } = req.params

        videoQueries.markVideoNotWatched(id, userId).then((result) => {
            res.status(200).json(result.rows[0])
        }).catch((error) => {
            res.status(500).json({
                message: error.message || "An error occurred while marking video not watched."
            })
        })
    } catch (error) {
        res.status(500).json({
            message: error.message || "An error occurred while marking video not watched."
        })
    }
}

module.exports = {
    markVideoWatched,
    markVideoNotWatched
}