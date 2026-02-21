import API from "../api"
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Stack,
  Alert,
  Link,
} from "@mui/material"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Login() {
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    setError("")
    setLoading(true)

    try {
      const response = await API.post("/auth/login", {
        email,
        password,
      })

      localStorage.setItem("token", response.data.access_token)
      navigate("/")
    } catch (err: any) {
      setError(
        err.response?.data?.msg || "Something went wrong. Try again.Maybe check your credentials."
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f3f4f6",
      }}
    >
      <Paper
        elevation={0}
        sx={{ p: 4, width: 400, border: "1px solid #e5e7eb" }}
      >
        <Typography variant="h5" gutterBottom>
          Sign in to your account
        </Typography>

        <Stack spacing={2}>
          {error && <Alert severity="error">{error}</Alert>}

          <TextField
            label="Email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            label="Password"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            variant="contained"
            onClick={handleLogin}
            disabled={loading}
            sx={{
              backgroundColor: "#111827",
              "&:hover": { backgroundColor: "#1f2937" },
            }}
          >
            {loading ? "Signing in..." : "Login"}
          </Button>

          <Typography variant="body2">
            Don’t have an account?{" "}
            <Link
              component="button"
              onClick={() => navigate("/register")}
            >
              Register
            </Link>
          </Typography>
        </Stack>
      </Paper>
    </Box>
  )
}