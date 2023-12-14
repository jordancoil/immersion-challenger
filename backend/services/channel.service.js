const channelQueries = require("../db/queries/channel.queries")

async function getChannelsPaginated({ p }) {
  const page = p || "1"

  const channels = await channelQueries.getChannelsPaginatedWithVideoCount(page)

  return channels
}

module.exports = {
  getChannelsPaginated
}