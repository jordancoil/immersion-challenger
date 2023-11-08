import { useEffect, useState } from "react"
import ChannelService from "../services/ChannelService"

export default function Home() {
    const [channels, setChannels] = useState([])

    useEffect(() => {
        console.log("asdf")
        const channelService = new ChannelService()
        const fetchChannels = async () => {
          try {
            const channels = await channelService.getChannels()
            console.log(channels)
            setChannels(channels)
          } catch (err) {
            console.log(err)
          }
        }
    
        fetchChannels()
      }, [])

    const channelElems = channels?.map(channel => {
        return (
            <div>Channel!</div>
        )
    })

    return (
        <div className="home">
            <h2>Home???</h2>
            <p>Select a channel</p>
            { channelElems }
        </div>
    )
}