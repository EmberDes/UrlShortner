import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts"

import { Typography, Paper } from "@mui/material"
import { ResponsiveContainer } from "recharts"

const data = [
  { date: "Mon", clicks: 120 },
  { date: "Tue", clicks: 210 },
  { date: "Wed", clicks: 150 },
  { date: "Thu", clicks: 278 },
  { date: "Fri", clicks: 189 },
  { date: "Sat", clicks: 239 },
  { date: "Sun", clicks: 349 },
]

export default function Analytics() {
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