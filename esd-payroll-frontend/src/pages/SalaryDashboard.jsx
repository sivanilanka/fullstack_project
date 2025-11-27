import React, { useEffect, useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Button,
  Snackbar,
  Alert,
  Grid,
  Divider,
  Box
} from '@mui/material';
import api from '../api/api';
import EmployeeTable from '../components/EmployeeTable';
import DisburseDialog from '../components/DisburseDialog';

export default function SalaryDashboard() {
  const [employees, setEmployees] = useState([]);
  const [selected, setSelected] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [snack, setSnack] = useState({ open: false, severity: 'success', message: '' });

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const res = await api.get('/api/employees');
      setEmployees(res.data);
    } catch (err) {
      console.error(err);
      setSnack({
        open: true,
        severity: 'error',
        message: 'Failed to load employees'
      });
    }
  };

  const handleDisburse = async ({ amount, description }) => {
    if (selected.length === 0)
      return setSnack({
        open: true,
        severity: 'warning',
        message: 'Select at least one employee'
      });

    try {
      const payload = { employeeIds: selected, amount, description };
      const res = await api.post('/api/salaries/disburse', payload);

      setSnack({
        open: true,
        severity: 'success',
        message: `Disbursed to ${res.data.length} employees`
      });

      setDialogOpen(false);
      setSelected([]);
      fetchEmployees();
    } catch (err) {
      console.error(err);
      setSnack({
        open: true,
        severity: 'error',
        message: 'Disbursement failed'
      });
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Paper
        elevation={3}
        sx={{
          p: 3,
          borderRadius: 3,
          background: '#ffffff',
          boxShadow: '0px 6px 20px rgba(0, 0, 0, 0.08)'
        }}
      >
        {/* Header */}
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography
              variant="h5"
              sx={{ fontWeight: 700, color: '#003f7f', mb: 0.5 }}
            >
              Salary Disbursement
            </Typography>

            <Typography variant="body2" color="text.secondary">
              Select employees and disburse salary (single or multiple)
            </Typography>
          </Grid>

          <Grid item>
            <Button
              variant="contained"
              sx={{
                background: '#003f7f',
                px: 3,
                py: 1,
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 600,
                '&:hover': { background: '#002d5c' }
              }}
              disabled={selected.length === 0}
              onClick={() => setDialogOpen(true)}
            >
              Disburse
            </Button>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        {/* Table section */}
        <Box sx={{ mt: 2 }}>
          <EmployeeTable
            employees={employees}
            selected={selected}
            setSelected={setSelected}
          />
        </Box>
      </Paper>

      {/* Dialog */}
      <DisburseDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onConfirm={handleDisburse}
        selectedCount={selected.length}
      />

      {/* Snackbar */}
      <Snackbar
        open={snack.open}
        autoHideDuration={4000}
        onClose={() => setSnack((prev) => ({ ...prev, open: false }))}
      >
        <Alert
          severity={snack.severity}
          onClose={() => setSnack((prev) => ({ ...prev, open: false }))}
        >
          {snack.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}
