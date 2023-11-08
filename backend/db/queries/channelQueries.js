const pool = require("../db")

const getChannels = async () => {
    const query = {
        name: "get-all-channels",
        text: "SELECT * FROM channels;"
    }

    return pool.query(query).then(result => result);
}

const getChannelById = async (id) => {
    const query = {
        name: "get-channel-by-id",
        text: "SELECT * FROM channels WHERE id = $1::int;",
        values: [id]
    }

    return pool.query(query).then(result => result);
}

const createChannel = async (channelId, title, thumbnail) => {
    const query = {
        name: "create-channel",
        text: `INSERT INTO channels (channelId, title, thumbnail)
            VALUES ($1::text, $2::text, $3::text)
            RETURNING *;`,
        values: [channelId, title, thumbnail]
    }

    return pool.query(query).then(result => result);
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

const updateChannel = async (id, channelId, title, thumbnail) => {
    const query = {
        name: "updateーchannel",
        text: `UPDATE channels
            SET channelId = $2::text, title = $3::text, thumbnail = $4::text
            WHERE id = $1::int
            RETURNING *;`,
        values: [id, channelId, title, thumbnail]
    }

    return pool.query(query).then(result => result);
}


module.exports = {
    getChannels,
    getChannelById,
    createChannel,
    deleteChannel,
    updateChannel
}