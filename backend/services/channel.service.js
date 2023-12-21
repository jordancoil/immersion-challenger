const channelQueries = require("../db/queries/channel.queries")

async function getChannelsPaginated({ p }) {
  const page = p || "1"

  const channels = await channelQueries.getChannelsPaginatedWithVideoCount(page)

  return channels
}

async function getChannel({ id }) {
  const channel = await channelQueries.getChannelById(id)

  return channel
}

module.exports = {
  getChannelsPaginated,
  getChannel
}