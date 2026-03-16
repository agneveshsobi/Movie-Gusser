import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { signup } from "../api"

function Signup() {
  const navigate = useNavigate()
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSignup = async () => {
    if (!username || !email || !password) {
      setError("All fields are required!")
      return
    }

    try {
      setLoading(true)
      setError("")
      const res = await signup({ username, email, password })
      // save token and username to localStorage
      localStorage.setItem("token", res.data.token)
      localStorage.setItem("username", res.data.username)
      navigate("/")
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong!")
    } finally {
      setLoading(false)
    }
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

      <div style={{
        width: "100%",
        maxWidth: "400px",
        padding: "2.5rem",
        border: "1px solid #ffffff15",
        borderRadius: "12px",
        background: "#0f0f1a",
      }}>

        <h2 style={{ color: "white", fontSize: "1.8rem", marginBottom: "0.5rem", letterSpacing: "0.1em" }}>
          Create account
        </h2>
        <p style={{ color: "#555", marginBottom: "2rem", fontSize: "0.9rem" }}>
          Sign up to track your scores
        </p>

        {/* Error message */}
        {error && (
          <div style={{
            padding: "0.75rem",
            marginBottom: "1rem",
            background: "#f43f5e22",
            border: "1px solid #f43f5e55",
            borderRadius: "8px",
            color: "#f43f5e",
            fontSize: "0.85rem",
          }}>
            {error}
          </div>
        )}

        {/* Username */}
        <div style={{ marginBottom: "1rem" }}>
          <label style={{ color: "#ffffff66", fontSize: "0.8rem", letterSpacing: "0.1em" }}>
            USERNAME
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="cooluser123"
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
            onKeyDown={(e) => e.key === "Enter" && handleSignup()}
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

        {/* Signup Button */}
        <button
          onClick={handleSignup}
          disabled={loading}
          style={{
            width: "100%",
            padding: "1rem",
            background: loading ? "#4444aa" : "#6366f1",
            border: "none",
            borderRadius: "8px",
            color: "white",
            fontSize: "1rem",
            cursor: loading ? "not-allowed" : "pointer",
            letterSpacing: "0.1em",
            marginBottom: "1.5rem",
          }}>
          {loading ? "Creating account..." : "Create Account"}
        </button>

        <p style={{ color: "#555", textAlign: "center", fontSize: "0.9rem" }}>
          Already have an account?{" "}
          <span onClick={() => navigate("/login")} style={{ color: "#6366f1", cursor: "pointer" }}>
            Login
          </span>
        </p>

      </div>

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

export default Signup