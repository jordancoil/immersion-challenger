import { useEffect, useState } from "react"
import ChannelService from "../services/ChannelService"

export default function Home() {
    const [channels, setChannels] = useState([])

    useEffect(() => {
        const channelService = new ChannelService()
        const fetchChannels = async () => {
          try {
            const channels = await channelService.getChannels()
            setChannels(channels)
          } catch (err) {
            // TODO better handling of errors
            console.log(err)
          }
        }
    
        fetchChannels()
      }, [])

    const channelElems = channels?.map(channel => {
        return (
            <div key={channel.id}>
              <img src={channel.thumbnail} alt="channel thumnail" />
              <h2>{channel.title}</h2>
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