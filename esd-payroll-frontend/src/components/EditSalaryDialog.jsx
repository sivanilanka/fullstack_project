import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
} from "@mui/material";

export default function EditSalaryDialog({ open, onClose, record, onSave }) {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  // load existing values when dialog opens
  useEffect(() => {
    if (record) {
      setAmount(record.amount);
      setDescription(record.description);
    }
  }, [record]);

  const handleSave = () => {
    if (!amount || amount <= 0) {
      alert("Enter a valid salary amount");
      return;
    }

    onSave({
      amount: parseFloat(amount),
      description,
    });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      
      {/* HEADER */}
      <DialogTitle
        sx={{
          backgroundColor: "#003f7f",
          color: "white",
          fontWeight: 600,
          pb: 2,
        }}
      >
        Edit Salary Record
      </DialogTitle>

      <DialogContent sx={{ mt: 2 }}>
        {/* Info Bar */}
        <Box sx={{ mb: 2 }}>
          <Typography sx={{ fontSize: 14, color: "#555" }}>
            <strong>Employee ID:</strong> {record?.employee?.id}
          </Typography>
          <Typography sx={{ fontSize: 14, color: "#555" }}>
            <strong>Payment ID:</strong> {record?.id}
          </Typography>
        </Box>

        {/* AMOUNT */}
        <TextField
          label="Amount"
          fullWidth
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          margin="normal"
        />

        {/* DESCRIPTION */}
        <TextField
          label="Description"
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          margin="normal"
        />
      </DialogContent>

      {/* BUTTONS */}
      <DialogActions sx={{ p: 2 }}>
        <Button
          onClick={onClose}
          sx={{
            color: "#003f7f",
            fontWeight: 600,
            textTransform: "none",
          }}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={handleSave}
          sx={{
            backgroundColor: "#003f7f",
            textTransform: "none",
            px: 3,
            "&:hover": { backgroundColor: "#002d5c" },
          }}
        >
          Save
        </Button>
      </DialogActions>

    </Dialog>
  );
}
