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

    const markWatched = async (videoId) => {
        await VideoService.markVideoWatched(videoId, cookies.userId)
        toggleWatched(videoId)
    }

    const markNotWatched = async (videoId) => {
        await VideoService.markVideoNotWatched(videoId, cookies.userId)
        toggleWatched(videoId)
    }

    const toggleWatched = (videoId) => {
        setVideos(prev => (
            prev.map(vid => {
                if (vid.id === videoId) {
                    return {
                        ...vid,
                        watched_status: vid.watched_status === "Watched" ? "Not Watched" : "Watched"
                    }
                } else {
                    return vid
                }
            })
        ))
    }

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
                            <>
                                {video.watched_status === "Watched" ?
                                    <>
                                        <span className="text-green-600">Watched</span>
                                        <button type="button" onClick={(e) => {e.stopPropagation(); markNotWatched(video.id)}} className="py-2 px-3 ml-3 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                                            Mark Not Watched
                                        </button>
                                    </> :
                                    <>
                                        <span className="text-red-600">Not Watched</span>
                                        <button type="button" onClick={(e) => {e.stopPropagation(); markWatched(video.id)}} className="py-2 px-3 ml-3 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                                            Mark Watched
                                        </button>
                                    </>}
                            </> :
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