import { useEffect, useState } from "react"
import VideoService from "../services/VideoService"
import { Link } from "react-router-dom"
import { VIDEO_PATH } from "../routes"

const VideoList = ({ channelId }) => {
    const [videos, setVideos] = useState([])
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const videos = await VideoService.getVideosForChannel(channelId)
                setVideos(videos)
            } catch (err) {
                setError(err)
            }
        }

        fetchVideos()
    }, [channelId])

    return (
        <div>
            {videos &&
            videos.map(video => (
                <Link to={VIDEO_PATH(channelId, video.yt_video_id)}>
                    <h4>{video.title}</h4>
                    <p>{video.yt_video_id}</p>
                </Link>
            ))}

            {error &&
            <div>
                <p>There was an error loading videos.</p>
            </div>}
        </div>
    )
}

export default VideoList