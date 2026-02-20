import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material"
import DashboardIcon from "@mui/icons-material/Dashboard"
import AnalyticsIcon from "@mui/icons-material/BarChart"
import LinkIcon from "@mui/icons-material/Link"
import { useNavigate } from "react-router-dom"

const drawerWidth = 240

export default function Sidebar() {
  const navigate = useNavigate()

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <Toolbar />
      <List>
        <ListItemButton onClick={() => navigate("/")}>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>

        <ListItemButton onClick={() => navigate("/analytics")}>
          <ListItemIcon>
            <AnalyticsIcon />
          </ListItemIcon>
          <ListItemText primary="Analytics" />
        </ListItemButton>

        <ListItemButton>
          <ListItemIcon>
            <LinkIcon />
          </ListItemIcon>
          <ListItemText primary="My Links" />
        </ListItemButton>
      </List>
    </Drawer>
  )
}