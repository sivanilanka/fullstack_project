import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

export default function Unauthorized() {
  const navigate = useNavigate();
  const location = useLocation();

  // Read reason from URL → /unauthorized?reason=not_found
  const params = new URLSearchParams(location.search);
  const reason = params.get("reason");

  let title = "Unauthorized Access";
  let message = "You are not allowed to view this page.";

  if (reason === "not_found") {
    title = "User Not Found";
    message =
      "Your IIITB email is not registered in our system. Only registered employees can access the payroll portal.";
  }

  if (reason === "not_finance") {
    title = "Access Restricted";
    message =
      "Only Finance Department employees are authorized to access the Payroll Portal.";
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        p: 3,
        backgroundColor: "#f5f7fb",
      }}
    >
      <Typography
        variant="h3"
        sx={{ color: "#003c8f", fontWeight: "bold", mb: 2 }}
      >
        {title}
      </Typography>

      <Typography variant="h6" sx={{ color: "#555", maxWidth: 500, mb: 4 }}>
        {message}
      </Typography>

      <Button
        variant="contained"
        onClick={() => navigate("/")}
        sx={{
          backgroundColor: "#003c8f",
          px: 4,
          py: 1,
          fontWeight: "bold",
          "&:hover": { backgroundColor: "#002b6b" },
        }}
      >
        Go Back to Login
      </Button>
    </Box>
  );
}
