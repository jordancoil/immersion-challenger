import { useEffect, useState } from "react"
import ChannelService from "../services/ChannelService"
import { Link } from "react-router-dom"
import Pagination from "../components/Pagination"
import { CHANNEL_PATH } from "../routes"

export default function Home() {
    const [channels, setChannels] = useState([])
    const [page, setPage] = useState(1)

    const ITEMS_PER_PAGE = 12
    
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

    const getTotalChannels = () => {
        if (channels.length > 0) return channels[0].total_rows
        return 0
    }
    
    const channelElems = channels?.map(channel => {
        return (
            <div key={channel.id} className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div className="rounded-t-lg">
                    <Link to={CHANNEL_PATH(channel.id)}>
                        <img src={channel.thumbnail} alt="channel thumnail" className="w-full" />
                    </Link>
                </div>
                <div className="p-5">
                    <Link to={CHANNEL_PATH(channel.id)}>
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            {channel.title}
                        </h5>
                    </Link>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                        Videos: {channel.videos_count}
                    </p>
                    <Link to={CHANNEL_PATH(channel.id)} className="block w-full text-center items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        View Channel
                    </Link>
                </div>
                
            </div>
        )
    })


        
    return (
        <div className="container relative min-h-screen flex flex-col items-center justify-start">
            <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                Channels
            </h1>
            <div className="w-full grid grid-flow-row gap-8 text-neutral-600 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                { channelElems }
            </div>
            <div className="mt-5 py-5">
                <Pagination currentPage={page} totalItems={getTotalChannels()} changePage={setPage} />
            </div>
        </div>
        
    )
}