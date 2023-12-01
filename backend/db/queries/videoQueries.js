const pool = require("../db")

const markVideoWatched = async (videoId, userId) => {
    const query = {
        name: "mark-video-watched",
        text: `INSERT INTO watched_videos (user_id, video_id)
            VALUES ($1::int, $2::int)
            RETURNING *;`,
        values: [userId, videoId]
    }

    return pool.query(query).then(result => result);
}

const markVideoNotWatched = async (videoId, userId) => {
    const query = {
        name: "mark-video-not-watched",
        text: `DELETE FROM watched_videos 
            WHERE user_id = $1::int AND video_id = $2::int
            RETURNING *`,
        values: [userId, videoId]
    }

    return pool.query(query).then(result => result);
}

module.exports = {
    markVideoWatched,
    markVideoNotWatched
}