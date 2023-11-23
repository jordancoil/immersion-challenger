import APIClient from "../clients/ApiClient";

const ChannelService = {
    async getChannel(id) {
        return await APIClient.get(`/channels/${id}`)
        .then(res => {
            return res.data
        })
        .catch(err => {
            console.error(err)
        })

        // if (!response) {
        //     // ALL OF THIS SHOULD MOVE TO THE BACKEND

        //     // If doesn't exist in database, check youtube API
        //     const YOUTUBE_SEARCH_API = "https://youtube.googleapis.com/youtube/v3/search"
        //     let searchURL = `${YOUTUBE_SEARCH_API}?part=snippet&part=id`
        //     searchURL += "&type=channel"
        //     searchURL += "&q=comdot" // CHANGE TO DYNAMIC QUERY
        //     searchURL += `&key=${import.meta.env.VITE_YOUTUBE_API_KEY}` // TODO change to dotenv

        //     const youtubeAPIRes = await APIClient.get(searchURL)

        //     const channelResult = youtubeAPIRes.items[0] // TODO ensure exists

        //     const channel = await APIClient.post(`/api/channels/`, {
        //         channel_id: channelResult.snippet.channel_id,
        //         title: channelResult.snippet.channelTitle,
        //         thumbnail: channelResult.snippet.thumbnails.high,
        //     })

        //     return channel
        // }
    },

    async getChannels(page) {
        return await APIClient.get(`/channels?p=${page}`)
        .then(res => {
            return res.data
        })
        .catch(err => {
            console.error(err)
        })
    }
}

export default ChannelService