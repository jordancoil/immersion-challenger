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
    }
}

export default VideoService