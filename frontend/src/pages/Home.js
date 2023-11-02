import { useState } from "react"

export default function Home() {
    const [channels, setChannels] = useState([])

    useEffect(() => {
        const channelService = new ChannelService()
        const fetchChannels = async () => {
          try {
            const channels = await channelService.getChannels()
            setChannels(channels)
          } catch (err) {
            console.log(err)
          }
        }
    
        fetchChannels()
      }, [])

    const channelElems = channels.map(channel => {
        return (
            <div>Channel!</div>
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