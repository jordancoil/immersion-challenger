import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import App from './App.tsx';
import ErrorPage from './ErrorPage.tsx';
import './index.css';
import Channel from './Pages/Channel.tsx';
import VideoPlayer from './Pages/VideoPlayer.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/channel/:channelId",
    element: <Channel />,
  },
  {
    path: "/channel/:channelId/video/:videoId",
    element: <VideoPlayer />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
