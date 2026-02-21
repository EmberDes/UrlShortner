import { Grid, Typography, Box, CircularProgress } from "@mui/material"
import CreateUrlForm from "../components/CreateUrlForm"
import UrlTable from "../components/UrlTable"
import { useEffect, useState } from "react"
import API from "../api"

type UrlType = {
  id: string
  short_code: string
  original_url: string
  created_at: string
  click_count: number
  unique_visitors: number
}

export default function Dashboard() {
  const [urls, setUrls] = useState<UrlType[]>([])
  const [overview, setOverview] = useState<{
    total_urls: number
    total_clicks: number
  } | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchUrls = async () => {
    const response = await API.get("/urls/")
    setUrls(response.data)
  }

  const fetchOverview = async () => {
    const response = await API.get("/analytics/overview")
    setOverview(response.data)
  }

  const fetchAll = async () => {
    try {
      setLoading(true)
      await Promise.all([fetchUrls(), fetchOverview()])
    } catch (error) {
      console.error("Failed to fetch dashboard data", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAll()
  }, [])

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      {overview && (
        <Typography variant="subtitle1" gutterBottom>
          Total URLs: {overview.total_urls} | Total Clicks:{" "}
          {overview.total_clicks}
        </Typography>
      )}

      <Grid container spacing={3}>
        <Grid xs={12} md={6}>
          <CreateUrlForm onSuccess={fetchAll} />
        </Grid>
      </Grid>

      <UrlTable urls={urls} />
    </>
  )
}