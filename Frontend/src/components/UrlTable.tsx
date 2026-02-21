import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  IconButton,
  Tooltip,
  Snackbar,
} from "@mui/material"
import ContentCopyIcon from "@mui/icons-material/ContentCopy"
import { useState } from "react"
import DeleteIcon from "@mui/icons-material/Delete"
import API from "../api"

type UrlType = {
  id: string
  short_code: string
  original_url: string
  created_at: string
  click_count: number
  unique_visitors: number
}

type Props = {
  urls: UrlType[]
}

export default function UrlTable({ urls }: Props) {
  const [copied, setCopied] = useState(false)

  const handleCopy = (shortCode: string) => {
    const fullUrl = `http://127.0.0.1:5000/api/urls/r/${shortCode}`
    navigator.clipboard.writeText(fullUrl)
    setCopied(true)
  }
  const handleDelete = async (id: string) => {
    await API.delete(`/urls/${id}`)
    window.location.reload()
  }

  return (
    <>
      <Paper elevation={0} sx={{ mt: 3, border: "1px solid #e5e7eb" }}>
        <Typography sx={{ p: 2 }} variant="h6">
          Your Links
        </Typography>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Short Code</TableCell>
              <TableCell>Original URL</TableCell>
              <TableCell>Copy</TableCell>
              <TableCell>Clicks</TableCell>
              <TableCell>Unique</TableCell>
              <TableCell>Delete</TableCell>
              <TableCell>Created At</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {urls.map((url) => (
              <TableRow key={url.id}>
                <TableCell>{url.short_code}</TableCell>
                <TableCell>{url.original_url}</TableCell>
                <TableCell>
                  <Tooltip title="Copy to clipboard">
                    <IconButton
                      onClick={() => handleCopy(url.short_code)}
                    >
                      <ContentCopyIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
                <TableCell>{url.click_count}</TableCell>
                <TableCell>{url.unique_visitors}</TableCell>

                <TableCell>
                  <IconButton onClick={() => handleDelete(url.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
                <TableCell>
                  {new Date(url.created_at).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      <Snackbar
        open={copied}
        autoHideDuration={2000}
        onClose={() => setCopied(false)}
        message="Link copied to clipboard!"
      />
    </>
  )
}