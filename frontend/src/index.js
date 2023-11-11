import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Error from "./pages/Error";
import Home from "./pages/Home";
import ChannelPage from "./pages/ChannelPage";
import Navbar from "./components/Navbar";

const router = createBrowserRouter([
  {
    path: "/", 
    element: <App />,
    children:[
      {
        path: "/", 
        element: <Home />
      },
      {
        path: "/channel/:id",
        element: <ChannelPage />
      },
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <div className="bg-gray-800 text-white font-sans leading-normal tracking-normal mt-12">
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </div>
);