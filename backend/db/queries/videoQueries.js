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

const createVideo = async (channelId, ytVideoId, title, videoIndex) => {
  const query = {
      name: "create-video",
      text: `INSERT INTO videos (channel_id, yt_video_id, title, video_index)
          VALUES ($1::int, $2::text, $3::text, $4::int)
          RETURNING *;`,
      values: [channelId, ytVideoId, title, videoIndex]
  }

  const result = await pool.query(query)
  return result.rows[0]
}

module.exports = {
    markVideoWatched,
    markVideoNotWatched,
    createVideo
}