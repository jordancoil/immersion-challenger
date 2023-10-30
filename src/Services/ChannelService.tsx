import Client, { FetchClient } from "../Clients/FetchClient";
import data from "../dummyData.json"
import { Channel } from "../types/Channel";

export default class ChannelService {
    client: FetchClient;

    constructor() {
        this.client = Client;
    }

    async getChannel(channelId: string) {
        return this.client.get(`/channel/${channelId}`)
            .then((data: Channel) => {
                return data
            })
    }
}
