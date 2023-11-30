import { useEffect, useState } from "react";
import ChannelService from "../services/ChannelService";
import { useParams } from "react-router-dom";
import VideoList from "../components/VideoList";

export default function ChannelPage() {
    const { id } = useParams();
    const [channel, setChannel] = useState({})
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchChannel = async () => {
            try {
                const channel = await ChannelService.getChannel(id)
                setChannel(channel)
            } catch (err) {
                setError(err)
            }
        }

        fetchChannel()
    }, [])

    return (
        <>
            {channel &&
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <caption className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                        PUT THUMBNAIL HERE TOO {channel.title} 
                        <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">CHANNEL DESCRIPTION?</p>
                    </caption>
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Video Title
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Index
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Watched?
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Watch
                            </th>
                        </tr>
                    </thead>
                    <VideoList channelId={channel.id} />
                </table>
            </div>}

            {error &&
            <div>
                <p>There was an error loading the channel.</p>
            </div>}
        </>
    )
}