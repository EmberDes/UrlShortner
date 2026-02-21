import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts"

import { Typography, Paper } from "@mui/material"
import { ResponsiveContainer } from "recharts"
import { useState,useEffect } from "react"  
import API from "../api"




export default function Analytics() {
  const [data, setData] = useState([])

    useEffect(() => {
      const fetchAnalytics = async () => {
        const response = await API.get("/analytics/daily")
        setData(response.data)
      }
      fetchAnalytics()
    }, [])




  return (
    <>
      <Typography variant="h4" gutterBottom>
        Click Analytics
      </Typography>

      <Paper
        elevation={0}
        sx={{ p: 3, border: "1px solid #e5e7eb", height: 400 }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="clicks"
              stroke="#2563eb"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </Paper>
    </>
  )
}