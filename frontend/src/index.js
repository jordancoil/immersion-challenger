import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Error from './pages/Error';
import VideoPlayer from './pages/VideoPlayer';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
  },
  // {
  //   path: "/channel/:channel_id",
  //   element: <Channel />,
  // },
  // {
  //   path: "/channel/:channel_id/video/:videoId",
  //   element: <VideoPlayer />,
  // },
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);