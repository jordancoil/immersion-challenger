import { useState, useEffect } from 'react'
import 'dotenv'
import './App.css'
import VideoService from './Services/VideoService'
import VideoView from './Components/Video'
import { Link, Outlet } from 'react-router-dom'
import { Video } from './types/Video'
import { Channel } from './types/Channel'
import ChannelService from './Services/ChannelService'

const YOUTUBE_PLAYLIST_ITEMS_API = "https://www.googleapis.com/youtube/v3/playlistItems"
const YOUTUBE_CHANNELS_API = "https://youtube.googleapis.com/youtube/v3/channels"

function App() {
  const [handle, setHandle] = useState("")
  const [channelID, setChannelID] = useState("")
  const [videos, setvideos] = useState<Video[]>([])

  const [hello, setHello] = useState("")

  // function fetchChannelData(handle: string) {
  //   const fetchData = async () => {
  //     // const res = await fetch(`${YOUTUBE_CHANNELS_API}?part=snippet&forUsername=GoogleDevelopers&key=${import.meta.env.VITE_YOUTUBE_API_KEY}`)
  //     const res = await fetch(`${YOUTUBE_SEARCH_API}?part=snippet&maxResults=25&q=comdot&type=channel&key=${import.meta.env.VITE_YOUTUBE_API_KEY}`)
  //     const data = await res.json()
  //     console.log(data)
  //     if (data.items.length > 0) {
  //       setChannelID(data.items[0].id.channelId)
  //     } 
  //   }
    
  //   fetchData()
  //     .catch((err: Error) => console.log(err))
  // }

  // useEffect(() => {
  //   const timeoutID = setTimeout(() => {
  //     fetchChannelData(handle)
  //   }, 500)
  //   return () => clearTimeout(timeoutID)
  // }, [handle])

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const res = await fetch(`${YOUTUBE_SEARCH_API}?part=snippet,id&order=date&maxResults=25&channelId=${channelID}&key=${import.meta.env.VITE_YOUTUBE_API_KEY}`)
  //     const data = await res.json()
  //     console.log(data)
  //   }

  //   if (channelID) {
  //     fetchData()
  //       .catch((err: Error) => console.log(err))
  //   }
  // }, [channelID])

  //   fetchVideos()
  // }, [channelID])

  useEffect(() => {
    const channelService = new ChannelService()
    const fetchChannel = async () => {
      try {
        const channel = await channelService.getChannel("test")
        console.log("Channel Service Result: ", channel)
      } catch (err) {
        console.log(err)
      }
    }

    fetchChannel()

    const channel: Channel = { channelId: "UCRxPrFmRHsXGWfAyE6oqrPQ", title: "test"}
    const videoService = new VideoService(channel)
    const fetchVideos = async () => {
      try {
        const channelVideos = await videoService.getVideos()
        // console.log("Videos: ", channelVideos)
        setvideos(channelVideos)
      } catch (err) {
        console.log(err)
      }
    }

    fetchVideos()
  }, [])

  function updateHandle(event: React.ChangeEvent<HTMLInputElement>) {
    setHandle(event?.target.value)
  }

  const videoElems = videos.map(vid => {
    return (
      <Link key={vid.videoId} to={`/channel/${vid.channelId}/video/${vid.videoId}`}>
        <VideoView key={vid.videoId} {...vid} />
      </Link>
    )
  })

  return (
    <>
      <h3>Enter a Youtube Handle (eg. "@comdot" without the "@")</h3>
      <form>
        <input type="text" value={handle} onChange={updateHandle} />
      </form>
      { channelID ? <div>Channel ID: {channelID}</div> : <div>No Channel with that handle exists.</div>}
      VIDEOS: { videoElems }
      <p>API TEST: {hello}</p>
      {/* <Outlet /> */}
    </>
  )
}

export default App
