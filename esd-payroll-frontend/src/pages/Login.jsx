import React from "react";
import {
  Button,
  Container,
  Typography,
  Paper,
  Box,
  Avatar,
  Divider,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";

export default function Login() {
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/google";
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f5f7fb",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 3,
      }}
    >
      <Paper
        elevation={8}
        sx={{
          padding: 5,
          width: "100%",
          maxWidth: 450,
          textAlign: "center",
          borderRadius: 3,
          backgroundColor: "white",
        }}
      >
        {/* IIITB Logo Circle */}
        <Avatar
          sx={{
            bgcolor: "#003c8f",
            width: 85,
            height: 85,
            margin: "0 auto",
            mb: 3,
            fontSize: 34,
            fontWeight: "bold",
          }}
        >
          IIITB
        </Avatar>

        {/* Page Title */}
        <Typography
          variant="h4"
          fontWeight="600"
          sx={{ color: "#003c8f", mb: 1 }}
        >
          ESD Payroll Portal
        </Typography>

        <Typography
          variant="subtitle1"
          sx={{ color: "#37474f", mb: 4 }}
        >
          Login / Signin using your IIITB Google account
        </Typography>

        <Divider sx={{ mb: 4 }} />

        {/* Google Login Button */}
        <Button
          fullWidth
          variant="contained"
          size="large"
          onClick={handleGoogleLogin}
          startIcon={<GoogleIcon />}
          sx={{
            py: 1.4,
            fontSize: "16px",
            fontWeight: 600,
            textTransform: "none",
            borderRadius: 2,
            backgroundColor: "#003c8f",
            "&:hover": {
              backgroundColor: "#002c6e",
            },
          }}
        >
          Login / Signin with Google
        </Button>

        <Typography
          variant="body2"
          sx={{ mt: 4, color: "#546e7a" }}
        >
          Only Accounts Department users are authorized to access this system.
        </Typography>
      </Paper>
    </Box>
  );
}
