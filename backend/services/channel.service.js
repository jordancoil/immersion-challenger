require("dotenv").config()
const axios = require('axios');

const channelQueries = require("../db/queries/channel.queries")

async function getChannelsPaginated({ p }) {
  const page = p || "1"
  return await channelQueries.getChannelsPaginatedWithVideoCount(page)
}

async function getChannel({ id }) {
  return await channelQueries.getChannelById(id)
}

async function getVideosForChannel({ id, userId }) {
  if (userId) {
    return await channelQueries.getVideosWithWatchedStatus(id, userId)
  } else {
    return await channelQueries.getVideosForChannelById(id)
  }
}

async function createNewChannel({ channelQuery }) {
  // TODO check ytId is set
  if (!channelQuery) {
    throw Error("No YouTube channel ID provided.")
  }

  // If doesn't exist in database, check youtube API
  const YOUTUBE_SEARCH_API = "https://youtube.googleapis.com/youtube/v3/search"
  let searchURL = `${YOUTUBE_SEARCH_API}?part=snippet`
  searchURL += "&type=channel"
  searchURL += `&q=${channelQuery}`
  searchURL += `&key=${process.env.YOUTUBE_API_KEY}`

  const YTResult = await axios.get(searchURL)

  if (!YTResult || !YTResult.data) {
    throw Error("There was an error with the YouTube API.")
  } else if (!YTResult.data.items || YTResult.data.items.length === 0) {
    throw Error(`Could not find a YouTube channel for query: ${channelQuery}`)
  }

  const channelResult = YTResult.data.items[0]

  return await channelQueries.createChannel(
    channelResult.snippet.channelId,
    channelResult.snippet.channelTitle,
    channelResult.snippet.thumbnails.high.url
  )
}

module.exports = {
  getChannelsPaginated,
  getChannel,
  getVideosForChannel,
  createNewChannel
}