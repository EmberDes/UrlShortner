import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Stack,
} from "@mui/material"
import { useNavigate } from "react-router-dom"

export default function Register() {
  const navigate = useNavigate()

  const handleRegister = () => {
    navigate("/login")
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
      <Paper elevation={0} sx={{ p: 4, width: 400, border: "1px solid #e5e7eb" }}>
        <Typography variant="h5" gutterBottom>
          Create an account
        </Typography>

        <Stack spacing={2}>
          <TextField label="Email" fullWidth />
          <TextField label="Password" type="password" fullWidth />

          <Button
            variant="contained"
            onClick={handleRegister}
            sx={{
              backgroundColor: "#111827",
              "&:hover": { backgroundColor: "#1f2937" },
            }}
          >
            Register
          </Button>
        </Stack>
      </Paper>
    </Box>
  )
}