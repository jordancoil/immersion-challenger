import { Link } from "react-router-dom";
import { ADMIN_PATH } from "../routes";
import { useState } from "react";
import APIClient from "../clients/ApiClient";
import { useErrorContext } from "../providers/ErrorContextProvider";

export default function AddChannel() {
  const [channelQuery, setChannelQuery] = useState("")

  const { setError } = useErrorContext()

  function addNewChannel(e) {
    e.preventDefault()
    console.log("adding channel from query: ", channelQuery)

    APIClient.post(`/channels/new?channelQuery=${channelQuery}`)
    .then(res => {
      if (res.data.channel) {
        console.log("success, new channel: ", res.data.channel)
      } else {
        setError("There was an error fetching videos.")
      }
    })
    .catch(err => {
      setError(err)
    })
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
              <p>YouTube Channel Query</p>
              <input className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                type="text" onChange={e => setChannelQuery(e.target.value)} />
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