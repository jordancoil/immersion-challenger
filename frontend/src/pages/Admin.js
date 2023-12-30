import { useState } from "react"
import AdminChannelOptions from "../components/admin/AdminChannelOptions"

export default function Admin() {
  const [activeTabElement, setActiveTabElement] = useState(<AdminChannelOptions />)
  const activeTabClass = "inline-block p-4 border-b-2 border-blue-600 rounded-t-lg text-blue-600 active dark:text-blue-500 dark:border-blue-500"
  const nonActiveTabClass = "inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"

  function setActiveTab(tab) {
    switch (tab) {
      case "channels":
        setActiveTabElement(<AdminChannelOptions />)
        break;
      default:
        break;
    }
  } 

  return (
    <>
      <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
        <ul className="flex flex-wrap -mb-px">
          <li className="me-2">
            <a href="#" onClick={() => setActiveTab("channels")} 
              className={activeTabClass}>
              Channels
            </a>
          </li>
          <li className="me-2">
            <a href="#" 
              className={nonActiveTabClass} aria-current="tab">
              todo
            </a>
          </li>
        </ul>
      </div>
      <div>
        {activeTabElement}
      </div>
    </>
  )
}