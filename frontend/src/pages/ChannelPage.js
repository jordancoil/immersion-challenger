import { useEffect, useState } from "react";
import ChannelService from "../services/ChannelService";
import { useParams } from "react-router-dom";

export default function ChannelPage() {
    const { id } = useParams();
    const [channel, setChannel] = useState({})
    const [error, setError] = useState(null)

    useEffect(() => {
        const channelService = new ChannelService()
        const fetchChannel = async () => {
            try {
                const channel = await channelService.getChannel(id)
                setChannel(channel)
            } catch (err) {
                setError(err)
            }
        }

        const fetchChannelVideos = async () => {
            // TODO
        }

        fetchChannel()
    }, [])

    return (
        <>
            {channel &&
            <div>
                <h1>{channel.title}</h1>
                <img src={channel.thumbnail} alt="channel thumnail" />
            </div>}

            {error &&
            <div>
                <p>There was an error loading the channel.</p>
            </div>}
        </>
    )
}