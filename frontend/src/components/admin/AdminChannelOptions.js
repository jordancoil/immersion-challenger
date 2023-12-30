import { Link } from "react-router-dom";
import { ADD_CHANNEL_PATH } from "../../routes/index"

export default function AdminChannelOptions() {
  return (
    <div className="p-4">
      Admin channel options.
      <ul>
        <li>
          <Link to={ADD_CHANNEL_PATH} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
            Add New Channel
          </Link>
        </li>
      </ul>
    </div>
  )
}