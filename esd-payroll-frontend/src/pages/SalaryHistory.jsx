import React, { useEffect, useState } from 'react'
import {
  Container,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Button,
  Box,
  Divider,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import api from '../api/api'

export default function SalaryHistory() {
  const [history, setHistory] = useState([])
  const [search, setSearch] = useState("")

  // edit dialog states
  const [editOpen, setEditOpen] = useState(false)
  const [editRecord, setEditRecord] = useState(null)
  const [amount, setAmount] = useState("")
  const [description, setDescription] = useState("")

  // snackbar
  const [snack, setSnack] = useState({ open: false, message: "", severity: "success" })

  useEffect(() => {
    fetchAllHistory()
  }, [])

  const fetchAllHistory = async () => {
    try {
      const res = await api.get('/api/salaries/history')
      setHistory(res.data)
    } catch (err) {
      console.error(err)
    }
  }

  // open dialog with selected record
  const openEditDialog = (rec) => {
    setEditRecord(rec)
    setAmount(rec.amount)
    setDescription(rec.description)
    setEditOpen(true)
  }

  const handleSave = async () => {
    try {
      const payload = {
        amount,
        description
      }

      await api.put(`/api/salaries/${editRecord.id}`, payload)

      // CLOSE DIALOG
      setEditOpen(false)

      // REFRESH DATA
      await fetchAllHistory()

      // SNACKBAR
      setSnack({
        open: true,
        severity: "success",
        message: "Salary record updated successfully!"
      })
    } catch (err) {
      console.error(err)
      setSnack({
        open: true,
        severity: "error",
        message: "Update failed!"
      })
    }
  }

  // FILTER RESULTS
  const filteredHistory = history.filter(row => {
    if (!search.trim()) return true
    return row.employee?.id?.toString() === search.trim()
  })

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>

        <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#003f8a', mb: 1 }}>
          Salary History
        </Typography>

        <Typography variant="body2" sx={{ color: '#555', mb: 2 }}>
          View and modify salary disbursement records.
        </Typography>

        <Divider sx={{ mb: 3 }} />

        {/* Search Bar */}
        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
          <TextField
            placeholder="🔍 Search by Employee ID"
            variant="outlined"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ width: 260 }}
          />

          <Button
            variant="text"
            onClick={() => setSearch("")}
            sx={{ color: '#003f8a', fontWeight: 'bold' }}
          >
            RESET
          </Button>
        </Box>

        {/* Table */}
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f4f7fb' }}>
              <TableCell sx={{ fontWeight: 'bold' }}>ID</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Employee ID</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Amount</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Description</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Date</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredHistory.map((row, index) => (
              <TableRow
                key={row.id}
                sx={{ backgroundColor: index % 2 === 0 ? '#fff' : '#f9fbff' }}
              >
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.employee?.id}</TableCell>
                <TableCell>{row.amount}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>{new Date(row.paymentDate).toLocaleString()}</TableCell>
                <TableCell>
                  <IconButton onClick={() => openEditDialog(row)}>
                    <EditIcon sx={{ color: '#003f8a' }} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

      </Paper>

      {/* EDIT DIALOG */}
      <Dialog open={editOpen} onClose={() => setEditOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: "bold", color: "#003f8a" }}>
          Edit Salary Record
        </DialogTitle>

        <DialogContent>

          <Typography sx={{ fontWeight: 600, mb: 1 }}>
            Employee ID: {editRecord?.employee?.id}
          </Typography>

          <Typography sx={{ fontWeight: 600, mb: 2 }}>
            Payment ID: {editRecord?.id}
          </Typography>

          <TextField
            label="Amount"
            type="number"
            fullWidth
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            sx={{ mb: 2 }}
          />

          <TextField
            label="Description"
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

        </DialogContent>

        <DialogActions>
          <Button onClick={() => setEditOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            sx={{ background: "#003f8a" }}
            onClick={handleSave}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snack.open}
        autoHideDuration={3000}
        onClose={() => setSnack(prev => ({ ...prev, open: false }))}
      >
        <Alert severity={snack.severity}>
          {snack.message}
        </Alert>
      </Snackbar>
    </Container>
  )
}
