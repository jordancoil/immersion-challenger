export default function Video({ videoId, title, thumbnail }) {
    return (
        <div className="video-container">
            <div className="thumbnail-container">
                <img src={thumbnail} width={120} height={90} />
            </div>
            <div>
                <h4 className="video-title">{title}</h4>
                <p>{videoId}</p>
            </div>
        </div>
    )
}