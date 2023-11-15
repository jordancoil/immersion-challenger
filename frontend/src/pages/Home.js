import { useEffect, useState } from "react"
import ChannelService from "../services/ChannelService"
import { Link } from "react-router-dom"

export default function Home() {
    const [channels, setChannels] = useState([])
    
    useEffect(() => {
        const fetchChannels = async () => {
            const channels = await ChannelService.getChannels()
            setChannels(channels)
        }
        
        fetchChannels()
    }, [])
    
    const channelElems = channels?.map(channel => {
        return (
            <div key={channel.id}>
                <Link to={`/channel/${channel.id}`}>
                    <img src={channel.thumbnail} alt="channel thumnail" />
                    <h2>{channel.title}</h2>
                </Link>
            </div>
        )
    })
        
    return (
        <div className="home">
            <h2>Home</h2>
            <p>Select a channel</p>
            { channelElems }
        </div>
    )
}