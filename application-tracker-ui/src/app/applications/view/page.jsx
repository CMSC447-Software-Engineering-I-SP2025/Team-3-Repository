'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Box,
} from "@mui/material";
import Link from "next/link";
import SubmitButton from "@/components/SubmitButton"; 

// Hard coded testing data
const applications = [
  {
    id: 1,
    employer: "Google",
    title: "Software Engineer",
    status: "IN PROGRESS",
    salary: "$90,000 - $110,000",
    dateApplied: "2024-10-01",
  },
  {
    id: 2,
    employer: "Pinterest",
    title: "Product Manager",
    status: "SUBMITTED",
    salary: "$120,000 - $140,000",
    dateApplied: "2024-09-25",
  },
  {
    id: 3,
    employer: "Amazon",
    title: "Data Scientist",
    status: "REJECTED",
    salary: "$100,000 - $130,000",
    dateApplied: "2025-03-1",
  },
  {
    id: 4,
    employer: "Epic Games",
    title: "UX Designer",
    status: "ACCEPTED",
    salary: "$80,000 - $100,000",
    dateApplied: "2024-12-15",
  },
];

export default function ApplicationsView() {
  return (
    <Box
      sx={{
        padding: 3,
        backgroundColor: "background.paper",
        minHeight: "100vh",
      }}
    >
      <TableContainer component={Paper} sx={{ backgroundColor: 'white' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell colSpan={6} sx={{ backgroundColor: 'white', borderBottom: 'none' }}>
                <Typography variant="h4" fontWeight="bold">
                  My Job Applications
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ backgroundColor: 'white', fontWeight: 'bold' }}>Action</TableCell>
              <TableCell sx={{ backgroundColor: 'white', fontWeight: 'bold' }}>Application Title/Role</TableCell>
              <TableCell sx={{ backgroundColor: 'white', fontWeight: 'bold' }}>Company/Employer</TableCell>
              <TableCell sx={{ backgroundColor: 'white', fontWeight: 'bold' }}>Status</TableCell>
              <TableCell sx={{ backgroundColor: 'white', fontWeight: 'bold' }}>Salary</TableCell>
              <TableCell sx={{ backgroundColor: 'white', fontWeight: 'bold' }}>Date Applied</TableCell>
              <TableCell sx={{ backgroundColor: 'white', fontWeight: 'bold' }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {applications.map((application) => (
              <TableRow key={application.id} sx={{ backgroundColor: 'white' }}>
                <TableCell sx={{ backgroundColor: 'white' }}>
                  <Link href={`/applications/manage?id=${application.id}`} passHref>
                    <SubmitButton text="Edit" /> 
                  </Link>
                </TableCell>
                <TableCell sx={{ backgroundColor: 'white' }}>{application.title}</TableCell>
                <TableCell sx={{ backgroundColor: 'white' }}>{application.employer}</TableCell>
                <TableCell sx={{ backgroundColor: 'white' }}>{application.status}</TableCell>
                <TableCell sx={{ backgroundColor: 'white' }}>{application.salary}</TableCell>
                <TableCell sx={{ backgroundColor: 'white' }}>{application.dateApplied}</TableCell>
                <TableCell sx={{ backgroundColor: 'white' }}>
                  <Link href={`/applications/manage?id=${application.id}&action=delete`} passHref>
                    <Button variant="contained" color="error">
                      Delete
                    </Button> 
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}