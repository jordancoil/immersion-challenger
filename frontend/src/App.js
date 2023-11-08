// PAGES AND COMPONENTS
import Home from "./pages/Home"
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="pages">
        <Home />
      </div>
    </div>
  )
}