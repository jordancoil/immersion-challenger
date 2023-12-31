const videoQueries = require("../../db/queries/videoQueries")
const axios = require('axios');

const PgBoss = require("pg-boss");
const boss = new PgBoss("postgres://postgres:test@127.0.0.1/immersion");

async function populateChannelVideos(channelId) {
  try {
    await boss.start();
    const queue = 'populate-channel-videos';
    let jobId = await boss.send(queue, { channelId: channelId })
    console.log(`created job in queue ${queue}: ${jobId}`);
    await boss.work(queue, populateChannelVideosHandler);
  } catch (error) {
    console.log('Error enqueuing background task:', error);
  }
}

async function populateChannelVideosHandler(job) {
  console.log(`job ${job.id} received with data:`);
  console.log("\t", JSON.stringify(job.data));
  await fetchVideosForChannelAndSave(job.data);
}

async function fetchVideosForChannelAndSave({ channelId, ytChannelId }) {
  const YOUTUBE_CHANNELS_API = "https://youtube.googleapis.com/youtube/v3/channels"
  let channelURL = `${YOUTUBE_CHANNELS_API}?part=contentDetails`
  channelURL += `&id=${ytChannelId}`
  channelURL += `&key=${process.env.YOUTUBE_API_KEY}`

  let YTResult = await axios.get(channelURL)

  if (!YTResult || !YTResult.data) {
    throw Error("There was an error with the YouTube API.")
  } else if (!YTResult.data.items || YTResult.data.items.length === 0) {
    throw Error(`Could not find a YouTube channel for id: ${ytChannelId}`)
  }

  const channelResult = YTResult.data.items[0]
  const uploadsId = channelResult.contentDetails.relatedPlaylists.uploads

  // GET https://www.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=50&playlistId=UUpRmvjdu3ixew5ahydZ67uA&key={YOUR_API_KEY}
  const YOUTUBE_PLAYLIST_API = "https://youtube.googleapis.com/youtube/v3/playlistItems"
  let uploadsURL = `${YOUTUBE_PLAYLIST_API}?part=snippet`
  uploadsURL += "&maxResults=50"
  uploadsURL += `&playlistId=${uploadsId}`
  uploadsURL += `&key=${process.env.YOUTUBE_API_KEY}`

  // TODO use page token to get paginated videos

  YTResult = await axios.get(uploadsURL)
  
  if (!YTResult || !YTResult.data) {
    throw Error("There was an error with the YouTube API.")
  } else if (!YTResult.data.items || YTResult.data.items.length === 0) {
    throw Error(`Could not find a videos for playlist id: ${uploadsId}`)
  }

  let uploads = []
  let nextPageToken = ""
  while (YTResult.nextPageToken) {
    nextPageToken = YTResult.nextPageToken

    YTResult.data.items.forEach(upload => {
      uploads.push({
        title: upload.snippet.title,
        position: upload.snippet.position,
        ytVideoId: upload.snippet.resourceId.videoId
      })
    })
    
    // Get next page
    const YOUTUBE_PLAYLIST_API = "https://youtube.googleapis.com/youtube/v3/playlistItems"
    let uploadsURL = `${YOUTUBE_PLAYLIST_API}?part=snippet`
    uploadsURL += "&maxResults=50"
    uploadsURL += `&playlistId=${uploadsId}`
    uploadsURL += `&pageToken=${nextPageToken}`
    uploadsURL += `&key=${process.env.YOUTUBE_API_KEY}`

    YTResult = await axios.get(uploadsURL)
  }

  // final iteration
  YTResult.data.items.forEach(upload => {
    uploads.push({
      title: upload.snippet.title,
      position: upload.snippet.position,
      ytVideoId: upload.snippet.resourceId.videoId
    })
  })

  uploads.sort((a, b) => {
    return a.position < b.position ? -1 : 1
  })

  uploads.reverse()

  uploads.forEach((upload, idx) => {
    videoQueries.createVideo(channelId, upload.ytVideoId, upload.title, idx)
  })
}

module.exports = { populateChannelVideos,
  fetchVideosForChannelAndSave // TODO: remove from exports
 };