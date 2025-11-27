import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Checkbox,
  Box,
  Avatar,
  Typography
} from "@mui/material";

export default function EmployeeTable({ employees, selected, setSelected }) {

  const toggleSelect = (id) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((x) => x !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  return (
    <Table>
      <TableHead>
        <TableRow sx={{ backgroundColor: "#f4f7fb" }}>
          <TableCell></TableCell>
          <TableCell sx={{ fontWeight: "bold" }}>Employee</TableCell>
          <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
          <TableCell sx={{ fontWeight: "bold" }}>Title</TableCell>
          <TableCell sx={{ fontWeight: "bold" }}>Department</TableCell>
          <TableCell sx={{ fontWeight: "bold" }}>ID</TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {employees.map((emp, index) => (
          <TableRow
            key={emp.id}
            sx={{
              backgroundColor: index % 2 === 0 ? "#fff" : "#f9fbff",
            }}
          >
            <TableCell padding="checkbox">
              <Checkbox
                checked={selected.includes(emp.id)}
                onChange={() => toggleSelect(emp.id)}
                sx={{
                  color: "#003f8a",
                  "&.Mui-checked": { color: "#003f8a" },
                }}
              />
            </TableCell>

            {/* IMAGE + NAME */}
            <TableCell>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Avatar
                  src={`http://localhost:8080${emp.photographPath}`}
                  alt={emp.firstName}
                  sx={{
                    width: 42,
                    height: 42,
                    border: "2px solid #003f8a",
                  }}
                >
                  {emp.firstName[0]}
                </Avatar>

                <Typography>
                  {emp.firstName} {emp.lastName}
                </Typography>
              </Box>
            </TableCell>

            <TableCell>{emp.email}</TableCell>
            <TableCell>{emp.title}</TableCell>
            <TableCell>{emp.department?.name}</TableCell>
            <TableCell>{emp.id}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
