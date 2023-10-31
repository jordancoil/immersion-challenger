import Client, { FetchClient } from "../Clients/FetchClient";
import data from "../dummyData.json"
import { IChannel } from "../types/Channel";

export default class ChannelService {
    client: FetchClient;

    constructor() {
        this.client = Client;
    }

    async getChannel(channelId: string) {
        /*  Step 1: Check if channel exists in DB, if exists fetch from DB
            Step 2: If Channel does not exist in DB, fetch from Youtube search API
        */

        this.client.get(`/api/channels/${channelId}`)
            .then(async (result: IChannel) => {
                if (!result) {
                    // If doesn't exist in database, check youtube API
                    const YOUTUBE_SEARCH_API = "https://youtube.googleapis.com/youtube/v3/search"
                    let searchURL = `${YOUTUBE_SEARCH_API}?part=snippet&part=id`
                    searchURL += "&type=channel"
                    searchURL += "&q=comdot" // CHANGE TO DYNAMIC QUERY
                    searchURL += `&key=${import.meta.env.VITE_YOUTUBE_API_KEY}`

                    const youtubeAPIRes = await this.client.get(searchURL)
                    const data = await youtubeAPIRes.json()

                    return data
                }
                
            })
    }
}
