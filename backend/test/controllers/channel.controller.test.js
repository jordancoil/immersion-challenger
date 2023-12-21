const { createServer } = require("../../server")
const channelService = require("../../services/channel.service")
const supertest = require("supertest")

const app = createServer();

const mockChannels = [
  {
    id: 1,
    yt_channel_id: "asdf1234",
    title: "Mr.Beast",
    thumbnail: "img url"
  }
]

describe("channel.controller", () => {
  describe("getChannelsPaginated()", () => {
    describe("given a valid page number", () => {
      it("should return channels", async () => {
        const mockChannelServiceGetChannels = jest.spyOn(channelService, "getChannelsPaginated")
          .mockReturnValue(mockChannels)

        const getQuery = { p: "1" }
        const { statusCode, body } = await supertest(app)
          .get("/api/channels")
          .query(getQuery)

        expect(statusCode).toBe(200);
        expect(body.channels).toEqual(mockChannels);
        expect(mockChannelServiceGetChannels).toHaveBeenCalledWith(getQuery);
      })
    })
  })

  describe("getChannel()", () => {
    describe("given a valid channel id", () => {
      it("should return a channel", async () => {
        const mockChannelServiceGetChannel = jest.spyOn(channelService, "getChannel")
          .mockReturnValue(mockChannels[0])

        const { statusCode, body } = await supertest(app)
          .get("/api/channels/1")

        expect(statusCode).toBe(200);
        expect(body.channel).toEqual(mockChannels[0]);
        expect(mockChannelServiceGetChannel).toHaveBeenCalledWith({ id: "1" });
      })
    })
  })
})