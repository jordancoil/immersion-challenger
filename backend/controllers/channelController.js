// const Channel = require("../models/ChannelModel")

const express = require("express")
const channelQueries = require("../db/queries/channelQueries")

// TODO add input validation

// get aLL channels
const getChannels = async (req, res) => {
    channelQueries.getChannels().then((result) => {
        res.status(200).json(result.rows)
    }).catch((error) => {
        // TODO add error code handling
        res.status(500).json(error.message)
    })
}

// get a single channel
const getChannel = async (req, res) => {
    const { id } = req.params

    channelQueries.getChannelById(id).then((result) => {
        res.status(200).json(result.rows[0])
    }).catch((error) => {
        // TODO add error code handling
        res.status(500).json(error.message)
    })
}

// create a new channel
const createChannel = async (req, res) => {
    const { channelId, title, thumbnail } = req.body

    channelQueries.createChannel(channelId, title, thumbnail).then((result) => {
        res.status(200).json(result.rows[0])
    }).catch((error) => {
        // TODO add error code handling
        res.status(500).json(error.message)
    })
}

// delete a new channel
const deleteChannel = async (req, res) => {
    const { id } = req.params

    channelQueries.deleteChannel(id).then((result) => {
        res.status(200).json(result.rows[0])
    }).catch((error) => {
        // TODO add error code handling
        res.status(500).json(error.message)
    })
}

// update a channel
const updateChannel = async (req, res) => {
    const { id } = req.params
    const { channelId, title, thumbnail } = req.body

    channelQueries.updateChannel(id, channelId, title, thumbnail).then((result) => {
        res.status(200).json(result.rows[0])
    }).catch((error) => {
        // TODO add error code handling
        res.status(500).json(error.message)
    })
}

module.exports = {
    getChannels,
    getChannel,
    createChannel,
    deleteChannel,
    updateChannel
}