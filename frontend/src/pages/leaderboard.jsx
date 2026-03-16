import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { leaderboard } from "../api"

function Leaderboard() {
  const navigate = useNavigate()
  const [scores, setScores] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await leaderboard()
        setScores(res.data)
      } catch (err) {
        console.log("Error fetching leaderboard", err)
      } finally {
        setLoading(false)
      }
    }
    fetchLeaderboard()
  }, [])

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0a0a0f",
      color: "white",
      fontFamily: "Georgia, serif",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "2rem",
    }}>

      {/* Header */}
      <div style={{
        width: "100%",
        maxWidth: "600px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "3rem",
      }}>
        <button
          onClick={() => navigate("/")}
          style={{
            background: "none",
            border: "none",
            color: "#555",
            cursor: "pointer",
            fontSize: "0.95rem",
            letterSpacing: "0.05em",
          }}>
          Back
        </button>
        <h2 style={{
          color: "white",
          letterSpacing: "0.3em",
          fontSize: "1.2rem",
          textTransform: "uppercase",
          fontWeight: "normal",
        }}>
          Leaderboard
        </h2>
        <div style={{ width: "60px" }} />
      </div>

      {/* Column headers */}
      <div style={{
        width: "100%",
        maxWidth: "600px",
        display: "flex",
        justifyContent: "space-between",
        padding: "0 1.5rem",
        marginBottom: "0.75rem",
      }}>
        <span style={{ color: "#333", fontSize: "0.75rem", letterSpacing: "0.2em" }}>RANK</span>
        <span style={{ color: "#333", fontSize: "0.75rem", letterSpacing: "0.2em", flex: 1, paddingLeft: "1rem" }}>PLAYER</span>
        <span style={{ color: "#333", fontSize: "0.75rem", letterSpacing: "0.2em" }}>POINTS</span>
      </div>

      {/* Loading */}
      {loading && (
        <p style={{ color: "#444", fontSize: "0.9rem", marginTop: "2rem" }}>
          Loading...
        </p>
      )}

      {/* Empty state */}
      {!loading && scores.length === 0 && (
        <p style={{ color: "#444", fontSize: "0.9rem", marginTop: "2rem" }}>
          No scores yet. Play a game to get on the board.
        </p>
      )}

      {/* Score rows */}
      {!loading && scores.map((item, index) => (
        <div key={index} style={{
          width: "100%",
          maxWidth: "600px",
          display: "flex",
          alignItems: "center",
          padding: "1rem 1.5rem",
          marginBottom: "0.5rem",
          border: "1px solid #ffffff0f",
          borderRadius: "8px",
          background: index === 0 ? "#111108" : "#0d0d0d",
        }}>

          {/* Rank number */}
          <span style={{
            width: "2rem",
            color: index === 0 ? "#e8a045" : "#444",
            fontSize: "0.85rem",
            fontWeight: index === 0 ? "bold" : "normal",
          }}>
            {index + 1}
          </span>

          {/* Username */}
          <span style={{
            flex: 1,
            paddingLeft: "1rem",
            color: index === 0 ? "#e8a045" : "#cccccc",
            fontSize: "0.95rem",
            letterSpacing: "0.05em",
          }}>
            {item.user__username}
          </span>

          {/* Points */}
          <span style={{
            color: index === 0 ? "#e8a045" : "#6366f1",
            fontSize: "0.95rem",
            letterSpacing: "0.05em",
          }}>
            {item.total}
          </span>

        </div>
      ))}

    </div>
  )
}

export default Leaderboard