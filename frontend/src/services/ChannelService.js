import FetchClient from "../clients/FetchClient";

export default class ChannelService {
    async getChannel(channelId) {
        try {
            return await FetchClient.get(`/api/channels/${channelId}`)

            // if (!response) {
            //     // ALL OF THIS SHOULD MOVE TO THE BACKEND

            //     // If doesn't exist in database, check youtube API
            //     const YOUTUBE_SEARCH_API = "https://youtube.googleapis.com/youtube/v3/search"
            //     let searchURL = `${YOUTUBE_SEARCH_API}?part=snippet&part=id`
            //     searchURL += "&type=channel"
            //     searchURL += "&q=comdot" // CHANGE TO DYNAMIC QUERY
            //     searchURL += `&key=${import.meta.env.VITE_YOUTUBE_API_KEY}` // TODO change to dotenv

            //     const youtubeAPIRes = await FetchClient.get(searchURL)

            //     const channelResult = youtubeAPIRes.items[0] // TODO ensure exists

            //     const channel = await FetchClient.post(`/api/channels/`, {
            //         channelId: channelResult.snippet.channelId,
            //         title: channelResult.snippet.channelTitle,
            //         thumbnail: channelResult.snippet.thumbnails.high,
            //     })

            //     return channel
            // }
        } catch (error) {
            // TODO handle error, might end up here is no response
        }
    }

    async getChannels() {
        try {
            return await FetchClient.get("/api/channels")
        } catch (error) {
            
        }
    }
}
