import { useState } from "react"
import { Link, useParams } from "react-router-dom"

export default function VideoPlayer() {
    const { channel_id, yt_video_id } = useParams()

    const [playerSize, setPlayerSize] = useState({ width: 640, height: 360})

    const [video, setVideo] = useState({})

    function changePlayerSize(width, height) {
        setPlayerSize({width: width, height: height})
    }

    return (
        <>
            {video &&
                <div>
                    <h3>{video.title}</h3>
                    <p>{video.videoIndex} / {video.totalVideos}</p>
                    <div className="video-container">

                        {video.prevVideo != "" ? 
                            <Link to={`/channel/${channel_id}/video/${video.prevVideo}`}>
                                <button>Prev</button>
                            </Link> : 
                            <button className="inactive">Prev</button>}

                        <iframe 
                            width={playerSize.width}
                            height={playerSize.height}
                            // src="https://www.youtube.com/embed/Ks-_Mh1QhMc?si=qLM4kdn6eV_JmmdJ" 
                            src={`https://www.youtube.com/embed/${yt_video_id}`} 
                            title="YouTube video player" 
                            frameBorder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                            allowFullScreen></iframe>

                        {video.nextVideo != "" ? 
                            <Link to={`/channel/${channel_id}/video/${video.nextVideo}`}>
                                <button>Next</button>
                            </Link> : 
                            <button className="inactive">Next</button>}
                    </div>
                    <div className="size-container">
                        <button className={playerSize.width === 426 ? "active-size" : ""}
                            onClick={() => changePlayerSize(426, 240)}>XS</button>
                        <button className={playerSize.width === 640 ? "active-size" : ""}
                            onClick={() => changePlayerSize(640, 360)}>SM</button>
                        <button className={playerSize.width === 854 ? "active-size" : ""}
                            onClick={() => changePlayerSize(854, 480)}>MD</button>
                        <button className={playerSize.width === 1280 ? "active-size" : ""}
                            onClick={() => changePlayerSize(1280, 720)}>LG</button>
                        <button className={playerSize.width === 1920 ? "active-size" : ""}
                            onClick={() => changePlayerSize(1920, 1080)}>XL</button>
                    </div>
                </div>
            }
            
        </>
    )
}