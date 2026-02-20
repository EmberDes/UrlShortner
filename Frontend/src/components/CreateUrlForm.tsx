import {
  Paper,
  TextField,
  Button,
  Stack,
  Typography,
} from "@mui/material"

export default function CreateUrlForm() {
  return (
    <Paper elevation={0} sx={{ p: 3, border: "1px solid #e5e7eb" }}>
      <Typography variant="h6" gutterBottom>
        Create Short URL
      </Typography>

      <Stack spacing={2}>
        <TextField
          label="Original URL"
          fullWidth
          placeholder="https://example.com"
        />

        <TextField
          label="Custom Short Code (Optional)"
          fullWidth
        />

        <Button
          variant="contained"
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