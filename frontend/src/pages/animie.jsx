import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ANIME } from "../data/anime"
import { saveScore } from "../api"

function Anime() {
  const navigate = useNavigate()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [guess, setGuess] = useState("")
  const [cluesRevealed, setCluesRevealed] = useState(0)
  const [gameState, setGameState] = useState("playing")
  const [score, setScore] = useState(0)
  const [wrongCount, setWrongCount] = useState(0)

  const game = ANIME[currentIndex]
  const maxWrong = 4
  const blurAmount = Math.max(0, 8 - cluesRevealed * 2)

  const handleHint = () => {
    if (cluesRevealed < game.clues.length) {
      setCluesRevealed(cluesRevealed + 1)
    }
  }

  const handleGuess = async () => {
    if (!guess.trim()) return
    const normalize = (s) => s.toLowerCase().trim()

    if (normalize(guess) === normalize(game.title)) {
      const points = Math.max(1, game.clues.length - cluesRevealed + 1)
      setScore(score + points)
      setGameState("correct")

      // save score to Django if logged in
      const token = localStorage.getItem("token")
      if (token) {
        try {
          await saveScore({ category: "anime", points: points })
        } catch (err) {
          console.log("Score not saved", err)
        }
      }

    } else {
      const newWrong = wrongCount + 1
      setWrongCount(newWrong)
      if (newWrong >= maxWrong) {
        setGameState("failed")
      }
    }
    setGuess("")
  }

  const nextGame = () => {
    setCurrentIndex((currentIndex + 1) % ANIME.length)
    setCluesRevealed(0)
    setWrongCount(0)
    setGuess("")
    setGameState("playing")
  }

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
        marginBottom: "2rem"
      }}>
        <button
          onClick={() => navigate("/")}
          style={{ background: "none", border: "none", color: "#555", cursor: "pointer", fontSize: "1rem" }}>
          ← Back
        </button>
        <span style={{ color: "#e8a045" }}> Score: {score}</span>
      </div>

      {/* Scene Card */}
<div style={{
  width: "100%",
  maxWidth: "600px",
  height: "300px",
  borderRadius: "12px",
  overflow: "hidden",
  position: "relative",
  marginBottom: "1.5rem",
  border: `1px solid ${game.color}44`,
}}>

  {/* Image */}
  <img
    src={game.image}
    alt="scene"
    style={{
      width: "100%",
      height: "100%",
      objectFit: "cover",
      transition: "filter 0.8s ease",
      filter: gameState === "correct" || gameState === "failed" ? "blur(0px)" : `blur(${blurAmount}px)`,
    }}
  />

  {/* Dark overlay */}
  <div style={{
    position: "absolute",
    inset: 0,
    background: "linear-gradient(to top, #0a0a0fcc, transparent)",
    pointerEvents: "none",
  }} />

  {/* Bottom text */}
  <p style={{
    position: "absolute",
    bottom: "1rem",
    left: "1rem",
    right: "1rem",
    color: "#ffffff88",
    fontSize: "0.85rem",
    textAlign: "center",
    margin: 0,
  }}>
    {gameState === "correct" || gameState === "failed"
      ? <strong style={{ color: game.color }}>{game.title} ({game.year})</strong>
      : game.sceneDescription}
  </p>

</div>

      {/* Clues */}
      <div style={{ width: "100%", maxWidth: "600px", marginBottom: "1.5rem" }}>
        <p style={{ color: "#555", fontSize: "0.75rem", letterSpacing: "0.2em", marginBottom: "0.75rem" }}>
          CLUES REVEALED — {cluesRevealed}/{game.clues.length}
        </p>
        {game.clues.map((clue, index) => (
          index < cluesRevealed && (
            <div key={index} style={{
              padding: "0.75rem 1rem",
              marginBottom: "0.5rem",
              border: "1px solid #ffffff22",
              borderRadius: "8px",
              color: "#ffffff99",
              fontSize: "0.9rem",
            }}>
               {clue}
            </div>
          )
        ))}
      </div>

      {/* Hint Button */}
      {gameState === "playing" && cluesRevealed < game.clues.length && (
        <button
          onClick={handleHint}
          style={{
            padding: "0.75rem 2rem",
            background: "transparent",
            border: `1px solid ${game.color}88`,
            color: game.color,
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "0.9rem",
            marginBottom: "1rem",
            letterSpacing: "0.1em",
          }}>
           Give me a Hint
        </button>
      )}

      {/* Give Up Button */}
{gameState === "playing" && (
  <button
    onClick={() => setGameState("failed")}
    style={{
      padding: "0.75rem 2rem",
      background: "transparent",
      border: "1px solid #ffffff22",
      color: "#555",
      borderRadius: "8px",
      cursor: "pointer",
      fontSize: "0.9rem",
      marginBottom: "1rem",
      letterSpacing: "0.1em",
    }}>
     Give Up
  </button>
)}

      {/* No more hints */}
      {gameState === "playing" && cluesRevealed >= game.clues.length && (
        <p style={{ color: "#555", fontSize: "0.85rem", marginBottom: "1rem" }}>
          No more hints available!
        </p>
      )}

      {/* Guess Input */}
      {gameState === "playing" && (
        <div style={{ width: "100%", maxWidth: "600px", display: "flex", gap: "1rem" }}>
          <input
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleGuess()}
            placeholder="Type your guess..."
            style={{
              flex: 1,
              padding: "1rem",
              background: "#111",
              border: `1px solid ${game.color}66`,
              borderRadius: "8px",
              color: "white",
              fontSize: "1rem",
              outline: "none",
            }}
          />
          <button
            onClick={handleGuess}
            style={{
              padding: "1rem 2rem",
              background: "transparent",
              border: `1px solid ${game.color}`,
              color: game.color,
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "1rem",
            }}>
            Guess
          </button>
        </div>
      )}

      {/* Wrong attempts */}
      {gameState === "playing" && wrongCount > 0 && (
        <p style={{ color: "#f43f5e", fontSize: "0.85rem", marginTop: "0.75rem" }}>
           Wrong attempts: {wrongCount}/{maxWrong}
        </p>
      )}

      {/* Correct Screen */}
      {gameState === "correct" && (
        <div style={{ textAlign: "center", marginTop: "1rem" }}>
          <h2 style={{ color: "#10b981", fontSize: "2rem", marginBottom: "0.5rem" }}>
             Correct!
          </h2>
          <p style={{ color: "#555", marginBottom: "2rem" }}>
            You got it with {cluesRevealed} hint(s) used!
          </p>
          <button onClick={nextGame} style={{
            padding: "1rem 2rem",
            background: "transparent",
            border: "1px solid #10b981",
            color: "#10b981",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "1rem",
          }}>
            Next Anime →
          </button>
        </div>
      )}

      {/* Failed Screen */}
      {gameState === "failed" && (
        <div style={{ textAlign: "center", marginTop: "1rem" }}>
          <h2 style={{ color: "#f43f5e", fontSize: "2rem", marginBottom: "0.5rem" }}>
             Failed!
          </h2>
          <p style={{ color: "#555", marginBottom: "2rem" }}>
            It was <strong style={{ color: "white" }}>{game.title}</strong>
          </p>
          <button onClick={nextGame} style={{
            padding: "1rem 2rem",
            background: "transparent",
            border: "1px solid #f43f5e",
            color: "#f43f5e",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "1rem",
          }}>
            Try Next →
          </button>
        </div>
      )}

    </div>
  )
}

export default Anime