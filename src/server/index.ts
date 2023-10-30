import express from 'express'
export const app = express()

// Dev Test Data
import data from "../dummyData.json"
import { Channel } from '../types/Channel'

// Production
if (!process.env['VITE']) {
    const frontendFiles = process.cwd() + '/dist'
    app.use(express.static(frontendFiles))
    app.get('/*', (_, res) => {
        res.send(frontendFiles + '/index.html')
    })
    app.listen(process.env['PORT'])
}

app.get('/channel/:id', async (req, res) => {
    /*  Step 1: Check if channel exists in DB, if exists fetch from DB
        Step 2: If Channel does not exist in DB, fetch from Youtube search API
    */
    const channel: Channel = {
        channelId: req.params.id,
        title: "comdot"
    }

    const YOUTUBE_SEARCH_API = "https://youtube.googleapis.com/youtube/v3/search"


    let searchURL = `${YOUTUBE_SEARCH_API}?part=snippet&part=id`
    searchURL += "&type=channel"
    searchURL += "&q=comdot" // CHANGE TO DYNAMIC QUERY
    searchURL += `&key=${import.meta.env.VITE_YOUTUBE_API_KEY}`

    console.log(searchURL)

    const youtubeAPIRes = await fetch(searchURL)
    const data = await youtubeAPIRes.json()

    console.log(data)

    res.json(data)
    // res.json(channel)
})

app.get('/channel/:id/videos', (req, res) => {
    // const channelId = req.params.id
    res.json(data)
})