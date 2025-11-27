import React, { useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField
} from '@mui/material'

export default function DisburseDialog({ open, onClose, onConfirm, selectedCount }) {
  const [amount, setAmount] = useState('')
  const [description, setDescription] = useState('Monthly salary')

  const handleConfirm = () => {
    const num = parseFloat(amount)
    if (!num || num <= 0) return alert('Enter valid amount')
    onConfirm({ amount: num, description })
    setAmount('')
    setDescription('Monthly salary')
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          borderRadius: 3,
          p: 1
        }
      }}
    >
      {/* Title */}
      <DialogTitle
        sx={{
          textAlign: "center",
          fontWeight: "bold",
          color: "#003f8a",
          fontSize: "1.4rem"
        }}
      >
        Disburse Salary to {selectedCount} employee(s)
      </DialogTitle>

      {/* Content */}
      <DialogContent sx={{ mt: 1 }}>
        <TextField
          label="Amount (per employee)"
          fullWidth
          margin="normal"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          sx={{
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#003f8a"
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#003f8a"
            }
          }}
        />

        <TextField
          label="Description"
          fullWidth
          margin="normal"
          value={description}
          onChange={e => setDescription(e.target.value)}
          sx={{
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#003f8a"
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#003f8a"
            }
          }}
        />
      </DialogContent>

      {/* Buttons */}
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button
          onClick={onClose}
          sx={{
            color: "#003f8a",
            fontWeight: "bold"
          }}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={handleConfirm}
          sx={{
            bgcolor: "#003f8a",
            ":hover": { bgcolor: "#002e66" },
            px: 4,
            fontWeight: "bold"
          }}
        >
          Disburse
        </Button>
      </DialogActions>

    </Dialog>
  )
}
