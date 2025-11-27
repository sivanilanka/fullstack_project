import React from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  Button,
  Divider
} from "@mui/material";

import { Dashboard, History, Logout, Home } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  // Hide sidebar on login page
  if (location.pathname === "/") return null;
  if (!document.cookie.includes("JWT=")) return null;

  const menuItems = [
    { text: "Home", icon: <Home />, path: "/welcome" },
    { text: "Dashboard", icon: <Dashboard />, path: "/salary" },
    { text: "History", icon: <History />, path: "/salary/history" }
  ];

  const handleLogout = () => {
    document.cookie =
      "JWT=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    window.location.href = "/";
  };

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      PaperProps={{
        sx: {
          width: 250,
          background: "linear-gradient(180deg, #003f8a 0%, #002f6c 100%)",
          color: "white",
          borderRight: "none",
          display: "flex",
          flexDirection: "column",
          boxShadow: "4px 0 12px rgba(0,0,0,0.15)"
        }
      }}
    >
      {/* HEADER */}
      <Box sx={{ p: 3, textAlign: "center" }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            letterSpacing: 0.5,
            fontSize: "1.1rem",
            color: "#ffffff",
          }}
        >
          IIITB Payroll
        </Typography>
        <Divider sx={{ mt: 2, bgcolor: "rgba(255,255,255,0.2)" }} />
      </Box>

      {/* MENU */}
      <List sx={{ px: 1 }}>
        {menuItems.map((item) => {
          const active = location.pathname === item.path;

          return (
            <ListItemButton
              key={item.text}
              onClick={() => navigate(item.path)}
              sx={{
                my: 0.5,
                borderRadius: 2,
                color: "white",
                backgroundColor: active ? "rgba(255,255,255,0.22)" : "transparent",
                transition: "0.25s ease",
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.15)",
                  transform: "scale(1.02)"
                }
              }}
            >
              <ListItemIcon sx={{ color: "white", minWidth: 40 }}>
                {item.icon}
              </ListItemIcon>

              <ListItemText
                primary={item.text}
                primaryTypographyProps={{
                  fontSize: "0.95rem",
                  fontWeight: active ? "bold" : 500,
                }}
              />
            </ListItemButton>
          );
        })}
      </List>

      {/* SPACER */}
      <Box sx={{ flexGrow: 1 }} />

      {/* LOGOUT BUTTON */}
      <Box sx={{ p: 2 }}>
        <Button
          variant="outlined"
          fullWidth
          sx={{
            color: "white",
            borderColor: "white",
            borderRadius: 2,
            textTransform: "none",
            fontWeight: "bold",
            "&:hover": {
              borderColor: "#ffdddd",
              backgroundColor: "rgba(255,255,255,0.15)"
            }
          }}
          startIcon={<Logout />}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Box>
    </Drawer>
  );
}
