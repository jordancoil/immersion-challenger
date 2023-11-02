const Channel = require("../models/ChannelModel")

const express = require("express")

const router = express.Router()

// get aLL channels
const getChannels = async (req, res) => {
    try {
        const channels = await Channel.find()
        res.status(200).json(channels)
    } catch (error) {
        res.status(400).json( {error: error.message })
    }
}

// get a single channel
const getChannel = async (req, res) => {
    const { id } = req.params

    try {
        const channel = await Channel.findOne({ channelId: id })

        if (!channel) {
            return res.status(404).json({ error: "No channel found."})
        }

        res.status(200).json(channel)
    } catch (error) {
        res.status(400).json( {error: error.message })
    }
}

// create a new channel
const createChannel = async (req, res) => {
    const { channelId, title, thumbnail } = req.body

    try {
        const channel = await Channel.create({ channelId, title, thumbnail })
        res.status(200).json(channel)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// delete a new channel
const deleteChannel = async (req, res) => {
    const { id } = req.params

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: "No channel found."})
        }

        const channel = await Channel.findByIdAndDelete(id)

        if (!channel) {
            return res.status(404).json({ error: "No channel found."})
        }
        
        res.status(200).json(channel)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// update a channel
const updateChannel = async (req, res) => {
    const { id } = req.params

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: "No channel found."})
        }

        const channel = await Channel.findByIdAndUpdate(id, {
            ...req.body
        })

        if (!channel) {
            return res.status(404).json({ error: "No channel found."})
        }
        
        res.status(200).json(channel)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = {
    getChannels,
    getChannel,
    createChannel,
    deleteChannel,
    updateChannel
}