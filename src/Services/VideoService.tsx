import Client, { FetchClient } from "../Clients/FetchClient";
import { IChannel } from "../types/Channel";

import data from "../dummyData.json"
import { IVideo } from "../types/Video";

export default class VideoService {
    client: FetchClient;
    channel: IChannel;

    constructor(channel: IChannel) {
        this.client = Client
        this.channel = channel
    }

    async getVideos() {
        // const videos: Video[] = data
        return this.client.get(`/api/channels/${this.channel.channelId}/videos`)
            .then((data: IVideo[]) => {
                return data
            })
    }

    async getVideo(videoId: string) {
        const video = data.find(vid => vid.videoId === videoId)
        return video
    }
}
