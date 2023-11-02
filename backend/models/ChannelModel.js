const mongoose = require("mongoose")

const channelSchema = new mongoose.Schema({
    channelId: { type: String, required: true },
    title: { type: String, required: true },
    thumbnail: { type: String }
}, { timestamps: true })

module.exports = mongoose.model("Channel", channelSchema)
