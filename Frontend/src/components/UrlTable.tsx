import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
} from "@mui/material"

const rows = [
  {
    short: "short.ly/abc123",
    original: "https://google.com",
    clicks: 245,
  },
  {
    short: "short.ly/devconnect",
    original: "https://github.com",
    clicks: 129,
  },
]

export default function UrlTable() {
  return (
    <Paper elevation={0} sx={{ mt: 3, border: "1px solid #e5e7eb" }}>
      <Typography sx={{ p: 2 }} variant="h6">
        Your Links
      </Typography>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Short URL</TableCell>
            <TableCell>Original URL</TableCell>
            <TableCell>Clicks</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.short}</TableCell>
              <TableCell>{row.original}</TableCell>
              <TableCell>{row.clicks}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  )
}