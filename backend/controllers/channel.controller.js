const channelService = require("../services/channel.service")
const channelQueries = require("../db/queries/channel.queries");
const { populateChannelVideos } = require("../middleware/tasks/populateChannelVideos");

// TODO add input validation

// get all channels
const getChannels = async (req, res) => {
  try {
    const channels = await channelService.getChannelsPaginated(req.query)

    res.status(200).send({ channels: channels });
  } catch (error) {
    res.status(500).json({
      message: error.message || "An error occurred while fetching channels."
    })
  }
}

// get a single channel
const getChannel = async (req, res) => {
  try {
    const channel = await channelService.getChannel(req.params)

    res.status(200).send({ channel: channel })
  } catch (error) {
    res.status(500).json({
        message: error.message || "An error occurred while retrieving the Channel."
    })
  }
}

const getVideosForChannel = async (req, res) => {
  try {
    const videos = await channelService.getVideosForChannel(req.params)

    res.status(200).send({ videos: videos })
  } catch (error) {
    res.status(500).json({
      message: error.message || "An error occurred while retrieving the videos."
    })
  }
}

// create a new channel
const createChannel = async (req, res) => {
  try {
    const channel = await channelService.createNewChannel(req.query)
    await populateChannelVideos(channel.id, channel.yt_channel_id)
    res.status(200).send({ channel: channel })
  } catch (error) {
    res.status(500).json({
      message: error.message || "An error occurred while creating the channel."
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
    createChannel,
    deleteChannel,
    updateChannel
}