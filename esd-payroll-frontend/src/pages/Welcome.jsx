import React from 'react';
import { Container, Typography, Button, Box, Card, CardContent, Grid } from '@mui/material';

export default function Welcome() {
  const urlParams = new URLSearchParams(window.location.search);
  const name = urlParams.get("name") || "";

  return (
    <Container maxWidth="md" sx={{ textAlign: "center", mt: 6 }}>

      {/* Welcome Text */}
      <Typography variant="h4" fontWeight="bold" sx={{ color: "#002D62", mb: 2 }}>
        Welcome {name}
      </Typography>

      <Typography variant="subtitle1" sx={{ mb: 4 }}>
        You’re logged in using your IIITB Google account. Choose a section below.
      </Typography>

      {/* Cards Section */}
      <Grid container spacing={4} justifyContent="center">

        {/* Dashboard Card */}
        <Grid item xs={12} sm={6}>
          <Card
            sx={{
              p: 2,
              borderRadius: 3,
              boxShadow: 4,
              '&:hover': { boxShadow: 8, transform: "scale(1.03)", transition: "0.3s" }
            }}
          >
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, color: "#002D62", fontWeight: "bold" }}>
                Salary Dashboard
              </Typography>
              <Button
                variant="contained"
                fullWidth
                size="large"
                href="/salary"
                sx={{ backgroundColor: "#002D62", '&:hover': { backgroundColor: "#003f8a" } }}
              >
                Go to Dashboard
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* History Card */}
        <Grid item xs={12} sm={6}>
          <Card
            sx={{
              p: 2,
              borderRadius: 3,
              boxShadow: 4,
              '&:hover': { boxShadow: 8, transform: "scale(1.03)", transition: "0.3s" }
            }}
          >
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, color: "#002D62", fontWeight: "bold" }}>
                Salary History
              </Typography>
              <Button
                variant="contained"
                fullWidth
                size="large"
                href="/salary/history"
                sx={{ backgroundColor: "#002D62", '&:hover': { backgroundColor: "#003f8a" } }}
              >
                View History
              </Button>
            </CardContent>
          </Card>
        </Grid>

      </Grid>
    </Container>
  );
}
