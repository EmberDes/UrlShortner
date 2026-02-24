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
const collapsedWidth = 70

export default function Sidebar({ open }: any) {
  const navigate = useNavigate()

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: open ? drawerWidth : collapsedWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: open ? drawerWidth : collapsedWidth,
          transition: "width 0.3s",
          overflowX: "hidden",
        },
      }}
    >
      <Toolbar />

      <List>
        <ListItemButton onClick={() => navigate("/")}>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          {open && <ListItemText primary="Dashboard" />}
        </ListItemButton>

        <ListItemButton onClick={() => navigate("/analytics")}>
          <ListItemIcon>
            <AnalyticsIcon />
          </ListItemIcon>
          {open && <ListItemText primary="Analytics" />}
        </ListItemButton>

        
      </List>
    </Drawer>
  )
}