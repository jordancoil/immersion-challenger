const channelQueries = require("../db/queries/channel.queries")

async function getChannelsPaginated({ p }) {
  const page = p || "1"
  return await channelQueries.getChannelsPaginatedWithVideoCount(page)
}

async function getChannel({ id }) {
  return await channelQueries.getChannelById(id)
}

async function getVideosForChannel({ id, userId }) {
  if (userId) {
    return await channelQueries.getVideosWithWatchedStatus(id, userId)
  } else {
    return await channelQueries.getVideosForChannelById(id)
  }
}

module.exports = {
  getChannelsPaginated,
  getChannel,
  getVideosForChannel
}