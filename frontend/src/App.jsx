import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/home"
import Anime from "./pages/animie"
import Movie from "./pages/movie"
import Login from "./pages/login"
import Signup from "./pages/signup"
import Leaderboard from "./pages/leaderboard"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/anime" element={<Anime />} />
        <Route path="/movie" element={<Movie />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App