import { useNavigate } from "react-router-dom"

function Home() {
  const navigate = useNavigate()

  const username = localStorage.getItem("username")
  const isLoggedIn = !!username

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("username")
    window.location.reload()
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0a0a0f",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "Georgia, serif",
    }}>

      {/* Top right buttons */}
      <div style={{
        position: "absolute",
        top: "1.5rem",
        right: "2rem",
        display: "flex",
        gap: "1rem",
        alignItems: "center",
      }}>
        <button
          onClick={() => navigate("/leaderboard")}
          style={{
            padding: "0.5rem 1.5rem",
            background: "transparent",
            border: "1px solid #ffffff22",
            color: "#ffffff66",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "0.9rem",
          }}>
          Leaderboard
        </button>

        {isLoggedIn ? (
          <>
            <span style={{
              color: "#ffffff66",
              fontSize: "0.9rem",
              borderLeft: "1px solid #ffffff22",
              paddingLeft: "1rem",
            }}>
              {username}
            </span>
            <button
              onClick={handleLogout}
              style={{
                padding: "0.5rem 1.5rem",
                background: "transparent",
                border: "1px solid #f43f5e55",
                color: "#f43f5e99",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "0.9rem",
              }}>
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => navigate("/login")}
              style={{
                padding: "0.5rem 1.5rem",
                background: "transparent",
                border: "1px solid #ffffff33",
                color: "#ffffff88",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "0.9rem",
              }}>
              Login
            </button>
            <button
              onClick={() => navigate("/signup")}
              style={{
                padding: "0.5rem 1.5rem",
                background: "#6366f1",
                border: "1px solid #6366f1",
                color: "white",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "0.9rem",
              }}>
              Sign Up
            </button>
          </>
        )}
      </div>

      {/* Title */}
      <h1 style={{
        fontSize: "3rem",
        color: "#ffffff",
        letterSpacing: "0.2em",
        marginBottom: "0.5rem",
        textTransform: "uppercase",
      }}>
        SCENEIQ
      </h1>
      <p style={{ color: "#555", letterSpacing: "0.3em", marginBottom: "4rem" }}>
        Guess the scene, test your movie and anime knowledge
      </p>

      {/* Game Buttons */}
      <div style={{ display: "flex", gap: "2rem" }}>
        <button
          onClick={() => navigate("/anime")}
          style={{
            padding: "2rem 3rem",
            background: "transparent",
            border: "1px solid #e8a045",
            color: "#e8a045",
            fontSize: "1.1rem",
            letterSpacing: "0.1em",
            cursor: "pointer",
            borderRadius: "4px",
          }}>
          Anime
        </button>

        <button
          onClick={() => navigate("/movie")}
          style={{
            padding: "2rem 3rem",
            background: "transparent",
            border: "1px solid #6366f1",
            color: "#6366f1",
            fontSize: "1.1rem",
            letterSpacing: "0.1em",
            cursor: "pointer",
            borderRadius: "4px",
          }}>
          Movie
        </button>
      </div>

    </div>
  )
}

export default Home