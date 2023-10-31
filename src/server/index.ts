import express from 'express'
import mongoose from 'mongoose'

export const app = express()

// Connect to DB
await mongoose.connect("mongodb://127.0.0.1:27017/immersion");

// Dev Test Data
import data from "../dummyData.json"
import { IChannel } from '../types/Channel'
import Channel from '../models/Channel';

// Production
if (!process.env['VITE']) {
    const frontendFiles = process.cwd() + '/dist'
    app.use(express.static(frontendFiles))
    app.get('/*', (_, res) => {
        res.send(frontendFiles + '/index.html')
    })
    app.listen(process.env['PORT'])
}

app.get("/api/channels", async (_, res) => {
    try {
        const channels = await Channel.find();
        res.json(channels);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});

app.post('/api/channels', async (req, res) => {
    try {
        const channel = new Channel({
            channelId: req.body.channelId,
            title: req.body.title
        })
        await channel.save()
        res.send(channel) // TODO: change to res.json(...)???
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
})

app.get('/api/channels/:channelId', async (req, res) => {
    try {
        const channelId = req.params.channelId
        const channel = await Channel.findOne({ channelId: channelId }).exec();
        res.json(channel);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
})

app.get('/api/channels/:channelId/videos', (req, res) => {
    // const channelId = req.params.id
    res.json(data)
})

