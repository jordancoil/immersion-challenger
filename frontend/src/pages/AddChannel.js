import { Link } from "react-router-dom";
import { ADMIN_PATH } from "../routes";
import { useState } from "react";

export default function AddChannel() {
  const [channelId, setChannelId] = useState("")

  function addNewChannel(e) {
    e.preventDefault()
    console.log("adding channel with yt id: ", channelId)
    //     // ALL OF THIS SHOULD MOVE TO THE BACKEND

        //     // If doesn't exist in database, check youtube API
        //     const YOUTUBE_SEARCH_API = "https://youtube.googleapis.com/youtube/v3/search"
        //     let searchURL = `${YOUTUBE_SEARCH_API}?part=snippet&part=id`
        //     searchURL += "&type=channel"
        //     searchURL += "&q=comdot" // CHANGE TO DYNAMIC QUERY
        //     searchURL += `&key=${import.meta.env.VITE_YOUTUBE_API_KEY}` // TODO change to dotenv

        //     const youtubeAPIRes = await APIClient.get(searchURL)

        //     const channelResult = youtubeAPIRes.items[0] // TODO ensure exists

        //     const channel = await APIClient.post(`/api/channels/`, {
        //         channel_id: channelResult.snippet.channel_id,
        //         title: channelResult.snippet.channelTitle,
        //         thumbnail: channelResult.snippet.thumbnails.high,
        //     })

        //     return channel
  }

  return (
    <>
      <Link to={ADMIN_PATH} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
        Back To Admin Panel
      </Link>
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-4 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Add a new Channel
          </h1>
          
          <form className="space-y-4 md:space-y-6" onSubmit={addNewChannel}>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              <p>YouTube Channel ID</p>
              <input className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                type="text" onChange={e => setChannelId(e.target.value)} />
            </label>

            <div>
              <button className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}