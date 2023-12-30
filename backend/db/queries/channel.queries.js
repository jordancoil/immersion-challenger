const pool = require("../db")

const getChannels = async () => {
    const query = {
        name: "get-all-channels",
        text: "SELECT * FROM channels;"
    }

    return pool.query(query).then(result => result);
}

const getChannelsPaginatedWithVideoCount = async (page) => {
    const ITEMS_PER_PAGE = 12
    const offset = (page - 1) * ITEMS_PER_PAGE
    const query = {
        name: "get-all-channels-paginated-with-video-count",
        text: `SELECT c.*, COUNT(c.id) OVER() AS total_rows, COUNT(v.id) AS videos_count
            FROM channels c
            LEFT JOIN videos v ON v.channel_id = c.id
            GROUP BY c.id
            OFFSET $1::int
            LIMIT $2::int;`,
        values: [offset, ITEMS_PER_PAGE]
    }

    const result = await pool.query(query)
    return result.rows
}

const getChannelById = async (id) => {
    const query = {
        name: "get-channel-by-id",
        text: "SELECT * FROM channels WHERE id = $1::int;",
        values: [id]
    }

    const result = await pool.query(query)
    return result.rows[0]
}

const getVideosForChannelById = async (id) => {
    const query = {
        name: "get-videos-by-channel-id",
        text: "SELECT * FROM videos WHERE channel_id = $1::int;",
        values: [id]
    }

    const result = await pool.query(query)
    return result.rows
}

const getVideosWithWatchedStatus = async (id, userId) => {
    const query = {
        name: "get-watched-videos-by-user-and-channel-id",
        text: `SELECT v.*,
            CASE WHEN wv.id IS NOT NULL THEN 'Watched' ELSE 'Not Watched' END AS watched_status
            FROM videos v
            LEFT JOIN watched_videos wv ON v.id = wv.video_id AND wv.user_id = $2::int
            WHERE v.channel_id = $1::int;`,
        values: [id, userId]
    }

    const result = await pool.query(query)
    return result.rows
}

const createChannel = async (yt_channel_id, title, thumbnail) => {
    const query = {
        name: "create-channel",
        text: `INSERT INTO channels (yt_channel_id, title, thumbnail)
            VALUES ($1::text, $2::text, $3::text)
            RETURNING *;`,
        values: [yt_channel_id, title, thumbnail]
    }

    const result = await pool.query(query)
    return result.rows[0]
}

const deleteChannel = async (id) => {
    const query = {
        name: "delete-channel",
        text: `DELETE FROM channels WHERE id = $1::int
            RETURNING *;`,
        values: [id]
    }

    return pool.query(query).then(result => result);
}

const updateChannel = async (id, yt_channel_id, title, thumbnail) => {
    const query = {
        name: "updateーchannel",
        text: `UPDATE channels
            SET yt_channel_id = $2::text, title = $3::text, thumbnail = $4::text
            WHERE id = $1::int
            RETURNING *;`,
        values: [id, yt_channel_id, title, thumbnail]
    }

    return pool.query(query).then(result => result);
}


module.exports = {
    getChannels,
    getChannelsPaginatedWithVideoCount,
    getChannelById,
    getVideosWithWatchedStatus,
    getVideosForChannelById,
    createChannel,
    deleteChannel,
    updateChannel
}