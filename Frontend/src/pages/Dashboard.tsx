import { Grid, Typography } from "@mui/material"
import CreateUrlForm from "../components/CreateUrlForm"
import UrlTable from "../components/UrlTable"

export default function Dashboard() {
  return (
    <>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <CreateUrlForm />
        </Grid>
      </Grid>

      <UrlTable />
    </>
  )
}