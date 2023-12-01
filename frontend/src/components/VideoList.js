import { useEffect, useState } from "react"
import VideoService from "../services/VideoService"
import { Link, useNavigate } from "react-router-dom"
import { VIDEO_PATH } from "../routes"
import { useCookies } from "react-cookie"


const VideoList = ({ channelId }) => {
    const [cookies] = useCookies(["userId"]);

    const [videos, setVideos] = useState([])
    const [error, setError] = useState(null)

    const navigate = useNavigate()

    console.log(cookies.userId)

    useEffect(() => {
        if (channelId === undefined) return

        const fetchVideos = async () => {
            try {
                let videos;
                if (cookies.userId) {
                    videos = await VideoService.getVideosWithWatchedStatus(channelId, cookies.userId)
                } else {
                    videos = await VideoService.getVideosForChannel(channelId)
                }

                setVideos(videos)
            } catch (err) {
                setError(err)
            }
        }

        fetchVideos()
    }, [channelId])

    return (
        <tbody>
            {error &&
            <div>
                <p>There was an error loading videos.</p>
            </div>}

            {videos &&
            videos.map(video => (
                <tr key={video.id} onClick={() => navigate(VIDEO_PATH(channelId, video.yt_video_id))} className="cursor-pointer bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {video.title}
                    </th>
                    <td className="px-6 py-4">
                        {video.video_index}
                    </td>
                    <td className="px-6 py-4">
                        {cookies.userId ?
                        video.watched_status :
                        "Please sign in to track progress"}
                    </td>
                    <td className="px-6 py-4">
                        <Link className="font-medium text-blue-600 dark:text-blue-500 hover:underline" to={VIDEO_PATH(channelId, video.yt_video_id)}>
                            Watch Now
                        </Link>
                    </td>
                </tr>
            ))}
        </tbody>
    )
}

export default VideoList