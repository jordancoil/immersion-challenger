import { BrowserRouter, Routes, Route, createBrowserRouter } from "react-router-dom";

// PAGES AND COMPONENTS
import Home from "./pages/Home"
import Navbar from "./components/Navbar";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//     errorElement: <ErrorPage />,
//   },
//   {
//     path: "/channel/:channelId",
//     element: <Channel />,
//   },
//   {
//     path: "/channel/:channelId/video/:videoId",
//     element: <VideoPlayer />,
//   },
// ])

{/* <RouterProvider router={router} /> */}

export default function App() {
  // return (
  //   <div className="App">
  //     <BrowserRouter>
  //       <Navbar />
  //       <div className="pages">
  //         <Routes>
  //           <Route
  //             path="/"
  //             element={<Home />} />
  //         </Routes>
  //       </div>
  //     </BrowserRouter>
  //   </div>
  // )

  return (
    <div className="App">
      <Navbar />
      <div className="pages">
        <Home />
      </div>
    </div>
  )
}