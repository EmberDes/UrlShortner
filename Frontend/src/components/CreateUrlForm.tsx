import { useState } from "react"
import API from "../api"
import {
  Paper,
  TextField,
  Button,
  Stack,
  Typography,
} from "@mui/material"

export default function CreateUrlForm({ onSuccess }: any) {
  const [originalUrl, setOriginalUrl] = useState("")
  const [customCode, setCustomCode] = useState("")
  const [expiryDate, setExpiryDate] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    try {
      setLoading(true)

      await API.post("/urls/", {
        original_url: originalUrl,
        custom_code: customCode || null,
        expiry_date: expiryDate || null,
      })

      setOriginalUrl("")
      setCustomCode("")
      setExpiryDate("")
      onSuccess()
      setLoading(false)
    } catch {
      alert("Error creating URL")
    }
  }

  return (
    <Paper elevation={0} sx={{ p: 3, border: "1px solid #e5e7eb" }}>
      <Typography variant="h6" gutterBottom>
        Create Short URL
      </Typography>

      <Stack spacing={2}>
        <TextField
          label="Original URL"
          fullWidth
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
        />
        <TextField
          label="Custom Short Code (Optional)"
          fullWidth
          value={customCode}
          onChange={(e) => setCustomCode(e.target.value)}
        />

        <TextField
          label="Expiry Date (Optional)"
          type="date"
          fullWidth
          InputLabelProps={{ shrink: true }}
          value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
        />
        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{
            backgroundColor: "#111827",
            "&:hover": { backgroundColor: "#1f2937" },
          }}
        >
          Generate Short Link
        </Button>
      </Stack>
    </Paper>
  )
}