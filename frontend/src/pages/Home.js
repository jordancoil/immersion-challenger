import { useEffect, useState } from "react"
import ChannelService from "../services/ChannelService"
import { Link } from "react-router-dom"
import Pagination from "../components/Pagination"
import { CHANNEL_PATH } from "../routes"

export default function Home() {
    const [channels, setChannels] = useState([])
    const [page, setPage] = useState(1)
    
    useEffect(() => {
        const fetchChannels = async () => {
            ChannelService.getChannels(page)
            .then(channels => {
                if (channels !== undefined) {
                    setChannels(channels)
                }
            })
            .catch(error => {
                console.log("error: ", error)
            })
            
        }
        
        fetchChannels()
    }, [page])

    const getMaxPage = () => {
        if (channels.length > 0) return Math.ceil(channels[0].total_rows / 10)

        return 0
    }
    
    const channelElems = channels?.map(channel => {
        return (
            <div key={channel.id}>
                <Link to={CHANNEL_PATH(channel.id)}>
                    <img src={channel.thumbnail} alt="channel thumnail" />
                    <h2>{channel.title}</h2>
                </Link>
            </div>
        )
    })
        
    return (
        <div className="home">
            <div>
                <h2>Home</h2>
                <p>Select a channel</p>
                { channelElems }
            </div>
            <div>
                <Pagination currentPage={page} maxPage={getMaxPage()} changePage={setPage} />
            </div>
        </div>
    )
}