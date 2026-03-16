import axios from "axios"

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
})

// automatically add token to every request if logged in
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")
  if (token) {
    config.headers.Authorization = `Token ${token}`
  }
  return config
})

export const signup = (data) => API.post("/signup/", data)
export const login = (data) => API.post("/login/", data)
export const saveScore = (data) => API.post("/save-score/", data)
export const leaderboard = () => API.get("/leaderboard/")