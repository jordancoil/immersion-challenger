import Client, { FetchClient } from "../Clients/FetchClient";
import { Channel } from "../types/Channel";

import data from "../dummyData.json"
import { Video } from "../types/Video";

export default class VideoService {
    client: FetchClient;
    channel: Channel;

    constructor(channel: Channel) {
        this.client = Client
        this.channel = channel
    }

    async getVideos() {
        // const videos: Video[] = data
        return this.client.get(`/channel/${this.channel.channelId}/videos`)
            .then((data: Video[]) => {
                return data
            })
    }

    async getVideo(videoId: string) {
        const video = data.find(vid => vid.videoId === videoId)
        return video
    }
}
