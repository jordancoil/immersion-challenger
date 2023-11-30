const channelQueries = require("../db/queries/channelQueries")
const { validateJWT, parseTokenFromAuthHeader } = require("../util/authUtil")

// TODO add input validation

// get all channels
const getChannels = async (req, res, next) => {
    try {
        let { p } = req.query
        p = p || "1"

        channelQueries.getChannelsPaginatedWithVideoCount(p).then((result) => {
            res.status(200).json(result.rows)
        }).catch((error) => {
            res.status(500).json({
                message: error.message || "An error occurred while retrieving Channels."
            })
        })
    } catch (error) {
        res.status(500).json({
            message: error.message || "An error occurred while retrieving Channels."
        })
    }
}

// get a single channel
const getChannel = async (req, res) => {
    try {
        const { id } = req.params

        channelQueries.getChannelById(id).then((result) => {
            res.status(200).json(result.rows[0])
        }).catch((error) => {
            res.status(500).json({
                message: error.message || "An error occurred while retrieving the Channel."
            })
        })
    } catch (error) {
        res.status(500).json({
            message: error.message || "An error occurred while retrieving the Channel."
        })
    }
}

const getVideosForChannel = (req, res) => {
    try {
        const { id } = req.params
        
        channelQueries.getVideosForChannelById(id).then((result) => {
            res.status(200).json(result.rows)
        }).catch((error) => {
            res.status(500).json({
                message: error.message || "An error occurred while retrieving the Videos."
            })
        })
    } catch (error) {
        res.status(500).json({
            message: error.message || "An error occurred while retrieving the Videos."
        })
    }
}

const getVideosWithWatchedStatus = async (req, res) => {
    try {
        const { id } = req.params
        
        const token = parseTokenFromAuthHeader(req.headers.authorization)
        const { userId } = await validateJWT(token)
        
        channelQueries.getVideosWithWatchedStatus(id, userId).then((result) => {
            res.status(200).json(result.rows)
        }).catch((error) => {
            res.status(500).json({
                message: error.message || "An error occurred while retrieving the Videos."
            })
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: error.message || "An error occurred while retrieving the Videos."
        })
    }
}

// create a new channel
const createChannel = async (req, res) => {
    try {
        const { yt_channel_id, title, thumbnail } = req.body

        if (!yt_channel_id) {
            res.status(400).send({
                message: "Channel ID cannot be empty!"
            });
            return;
        }

        if (!title) {
            res.status(400).send({
                message: "Title cannot be empty!"
            });
            return;
        }

        channelQueries.createChannel(yt_channel_id, title, thumbnail).then((result) => {
            res.status(200).json(result.rows[0])
        }).catch((error) => {
            res.status(500).json({
                message: error.message || "An error occurred while creating the Channel."
            })
        })
    } catch (error) {
        res.status(500).json({
            message: error.message || "An error occurred while creating the Channel."
        })
    }
}

// delete a new channel
const deleteChannel = async (req, res) => {
    try {
        const { id } = req.params

        channelQueries.deleteChannel(id).then((result) => {
            res.status(200).json(result.rows[0])
        }).catch((error) => {
            res.status(500).json({
                message: error.message || "An error occurred while deleting the Channel."
            })
        })
    } catch (error) {
        res.status(500).json({
            message: error.message || "An error occurred while deleting the Channel."
        })
    }
}

// update a channel
const updateChannel = async (req, res) => {
    try {
        const { id } = req.params
        const { yt_channel_id, title, thumbnail } = req.body

        channelQueries.updateChannel(id, yt_channel_id, title, thumbnail).then((result) => {
            res.status(200).json(result.rows[0])
        }).catch((error) => {
            res.status(500).json({
                message: error.message || "An error occurred while updating the Channel."
            })
        })
    } catch (error) {
        res.status(500).json({
            message: error.message || "An error occurred while updating the Channel."
        })
    }
}

module.exports = {
    getChannels,
    getChannel,
    getVideosForChannel,
    getVideosWithWatchedStatus,
    createChannel,
    deleteChannel,
    updateChannel
}