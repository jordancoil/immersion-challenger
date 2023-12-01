import APIClient from "../clients/ApiClient";

const VideoService = {
    async getVideosForChannel(channelId) {
        return await APIClient.get(`/channels/${channelId}/videos`)
        .then(res => {
            return res.data
        })
        .catch(err => {
            console.error(err)
        })
    },

    async getVideosWithWatchedStatus(channelId, userId) {
        return await APIClient.get(`/channels/${channelId}/videos/watched/${userId}`)
        .then(res => {
            return res.data
        })
        .catch(err => {
            console.error(err)
        })
    }
}

export default VideoService