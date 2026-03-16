import { useState } from "react"
import { useNavigate } from "react-router-dom"

function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = () => {
    // for now just navigate home
    // later this will call Django API
    console.log("logging in with", email, password)
    navigate("/")
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

      {/* Card */}
      <div style={{
        width: "100%",
        maxWidth: "400px",
        padding: "2.5rem",
        border: "1px solid #ffffff15",
        borderRadius: "12px",
        background: "#0f0f1a",
      }}>

        {/* Title */}
        <h2 style={{
          color: "white",
          fontSize: "1.8rem",
          marginBottom: "0.5rem",
          letterSpacing: "0.1em",
        }}>
          Welcome back
        </h2>
        <p style={{ color: "#555", marginBottom: "2rem", fontSize: "0.9rem" }}>
          Login to save your scores
        </p>

        {/* Email */}
        <div style={{ marginBottom: "1rem" }}>
          <label style={{ color: "#ffffff66", fontSize: "0.8rem", letterSpacing: "0.1em" }}>
            EMAIL
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
            style={{
              width: "100%",
              padding: "0.85rem",
              marginTop: "0.4rem",
              background: "#111",
              border: "1px solid #ffffff22",
              borderRadius: "8px",
              color: "white",
              fontSize: "1rem",
              outline: "none",
              boxSizing: "border-box",
            }}
          />
        </div>

        {/* Password */}
        <div style={{ marginBottom: "1.5rem" }}>
          <label style={{ color: "#ffffff66", fontSize: "0.8rem", letterSpacing: "0.1em" }}>
            PASSWORD
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            style={{
              width: "100%",
              padding: "0.85rem",
              marginTop: "0.4rem",
              background: "#111",
              border: "1px solid #ffffff22",
              borderRadius: "8px",
              color: "white",
              fontSize: "1rem",
              outline: "none",
              boxSizing: "border-box",
            }}
          />
        </div>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          style={{
            width: "100%",
            padding: "1rem",
            background: "#6366f1",
            border: "none",
            borderRadius: "8px",
            color: "white",
            fontSize: "1rem",
            cursor: "pointer",
            letterSpacing: "0.1em",
            marginBottom: "1.5rem",
          }}>
          Login
        </button>

        {/* Switch to signup */}
        <p style={{ color: "#555", textAlign: "center", fontSize: "0.9rem" }}>
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            style={{ color: "#6366f1", cursor: "pointer" }}>
            Sign Up
          </span>
        </p>

      </div>

      {/* Back button */}
      <button
        onClick={() => navigate("/")}
        style={{
          marginTop: "2rem",
          background: "none",
          border: "none",
          color: "#555",
          cursor: "pointer",
          fontSize: "0.9rem",
        }}>
        ← Back to Home
      </button>

    </div>
  )
}

export default Login