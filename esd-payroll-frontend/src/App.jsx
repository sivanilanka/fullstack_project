import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

import Sidebar from "./components/Navbar"; // your sidebar
import Welcome from "./pages/Welcome";
import SalaryDashboard from "./pages/SalaryDashboard";
import SalaryHistory from "./pages/SalaryHistory";
import Login from "./pages/Login";
import Unauthorized from "./pages/Unauthorized";   // <-- IMPORTANT

const theme = createTheme({
  palette: {
    primary: { main: "#0b5cff" },
    secondary: { main: "#00a86b" },
  },
});

export default function App() {
  const location = useLocation();

  // check JWT exists
  const hasToken = document.cookie.includes("JWT=");

  // check if user is on unauthorized page
  const isUnauthorizedPage = location.pathname.startsWith("/unauthorized");

  // check if user is on login page
  const isLoginPage = location.pathname === "/";

  // Show sidebar if logged in AND not unauthorized page
  const showSidebar = hasToken && !isUnauthorizedPage && !isLoginPage;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {/* Sidebar only when user is logged in */}
      {showSidebar && <Sidebar />}

      {/* Content area (shift right when sidebar is visible) */}
      <main
        style={{
          padding: 24,
          marginLeft: showSidebar ? 240 : 0,
          transition: "margin-left 0.3s ease",
        }}
      >
        <Routes>
          {/* Login page */}
          <Route path="/" element={<Login />} />

          {/* Welcome page after valid OAuth */}
          <Route path="/welcome" element={hasToken ? <Welcome /> : <Navigate to="/" />} />

          {/* Unauthorized page ALWAYS accessible */}
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* Protected pages */}
          <Route
            path="/salary"
            element={hasToken ? <SalaryDashboard /> : <Navigate to="/" />}
          />

          <Route
            path="/salary/history"
            element={hasToken ? <SalaryHistory /> : <Navigate to="/" />}
          />
        </Routes>
      </main>
    </ThemeProvider>
  );
}
