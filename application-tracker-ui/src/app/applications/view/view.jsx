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
  Chip,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid2,
} from "@mui/material";
import Link from "next/link";
import SubmitButton from "@/components/SubmitButton";
import { fromEnumValue } from "@/utils/enumUtils";
import PlotMappings from "@/constants/plotMappings";
import { AddRounded, Search } from "@mui/icons-material";
import { useState } from "react";

const ApplicationsView = ({ applications = [] }) => {
  const [filters, setFilters] = useState({
    status: '',
    priority: '',
    employer: '',
    dateCreated: '',
    dateSubmitted: '',
    keywords: ''
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Connect to API endpoint with filters
    console.log('Submitting filters:', filters);
  };

  return (
    <Grid2 container spacing={1} sx={{ p: 3, backgroundColor: "white", minHeight: "100vh" }}>
      <Grid2 xs={12} sx={{ mb: 1 }}>
        <Paper sx={{ 
          p: 2, 
          mb: 0,
          backgroundColor: 'white',
          border: '1px solid #e0e0e0',
          boxShadow: 'none'
        }}>
          <Typography variant="h6" gutterBottom>Search Filters</Typography>
          <form onSubmit={handleSubmit}>
            <Grid2 container spacing={2}>
              <Grid2 xs={12} sm={6} md={4}>
                <FormControl fullWidth sx={{ backgroundColor: 'white' }}>
                  <InputLabel sx={{ backgroundColor: 'white', px: 1 }}>Status</InputLabel>
                  <Select
                    name="status"
                    value={filters.status}
                    onChange={handleFilterChange}
                    label="Status"
                    sx={{ backgroundColor: 'white', minWidth: 150 }}
                    MenuProps={{
                      PaperProps: {
                        sx: {
                          backgroundColor: 'white',
                          '& .MuiMenuItem-root': {
                            backgroundColor: 'white',
                            '&:hover': {
                              backgroundColor: '#f5f5f5'
                            }
                          }
                        }
                      }
                    }}
                  >
                    <MenuItem value="applied">Applied</MenuItem>
                    <MenuItem value="interview">Interview</MenuItem>
                    <MenuItem value="offer">Offer</MenuItem>
                    <MenuItem value="rejected">Rejected</MenuItem>
                  </Select>
                </FormControl>
              </Grid2>
              
              <Grid2 xs={12} sm={6} md={4}>
                <FormControl fullWidth sx={{ backgroundColor: 'white' }}>
                  <InputLabel sx={{ backgroundColor: 'white', px: 1 }}>Priority</InputLabel>
                  <Select
                    name="priority"
                    value={filters.priority}
                    onChange={handleFilterChange}
                    label="Priority"
                    sx={{ backgroundColor: 'white', minWidth: 150 }}
                    MenuProps={{
                      PaperProps: {
                        sx: {
                          backgroundColor: 'white',
                          '& .MuiMenuItem-root': {
                            backgroundColor: 'white',
                            '&:hover': {
                              backgroundColor: '#f5f5f5'
                            }
                          }
                        }
                      }
                    }}
                  >
                    <MenuItem value="high">High</MenuItem>
                    <MenuItem value="medium">Medium</MenuItem>
                    <MenuItem value="low">Low</MenuItem>
                  </Select>
                </FormControl>
              </Grid2>

              <Grid2 xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  label="Employer"
                  name="employer"
                  value={filters.employer}
                  onChange={handleFilterChange}
                  sx={{ backgroundColor: 'white' }}
                  slotProps={{
                    inputLabel: {
                      shrink: true,
                      sx: { backgroundColor: 'white', px: 1 }
                    }
                  }}
                />
              </Grid2>

              <Grid2 xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  label="Date Created"
                  type="date"
                  name="dateCreated"
                  value={filters.dateCreated}
                  onChange={handleFilterChange}
                  slotProps={{
                    inputLabel: {
                      shrink: true,
                      sx: { backgroundColor: 'white', px: 1 }
                    }
                  }}
                  sx={{ backgroundColor: 'white' }}
                />
              </Grid2>

              <Grid2 xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  label="Date Submitted"
                  type="date"
                  name="dateSubmitted"
                  value={filters.dateSubmitted}
                  onChange={handleFilterChange}
                  slotProps={{
                    inputLabel: {
                      shrink: true,
                      sx: { backgroundColor: 'white', px: 1 }
                    }
                  }}
                  sx={{ backgroundColor: 'white' }}
                />
              </Grid2>

              <Grid2 xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  label="Keywords"
                  name="keywords"
                  value={filters.keywords}
                  onChange={handleFilterChange}
                  placeholder="Comma separated values"
                  sx={{ backgroundColor: 'white' }}
                  slotProps={{
                    inputLabel: {
                      shrink: true,
                      sx: { backgroundColor: 'white', px: 1 }
                    }
                  }}
                />
              </Grid2>

              <Grid2 xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  startIcon={<Search />}
                  sx={{ 
                    mt: 1,
                    backgroundColor: '#7b1fa2',
                    '&:hover': {
                      backgroundColor: '#6a1b9a',
                    }
                  }}
                >
                  Search
                </Button>
              </Grid2>
            </Grid2>
          </form>
        </Paper>
      </Grid2>

      <Grid2 xs={12} sx={{ mt: 0 }}>
        <TableContainer component={Paper} sx={{ backgroundColor: 'white' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell colSpan={6} sx={{ backgroundColor: 'white', borderBottom: 'none' }}>
                  <Typography fontSize="1.5rem" fontWeight="bold">
                    My Job Applications
                  </Typography>
                </TableCell>
                <TableCell align='right'>
                  <Chip
                    sx={{ backgroundColor: 'intermediate' }}
                    href='/applications/create'
                    clickable
                    component='a'
                    label={
                      <Box sx={{ display: 'flex', p: 1 }} >
                        <Typography sx={{ mr: 1 }} >Create</Typography>
                        <AddRounded/>
                      </Box>
                    }
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ backgroundColor: 'white', fontWeight: 'bold' }}>Action</TableCell>
                <TableCell sx={{ backgroundColor: 'white', fontWeight: 'bold' }}>Status</TableCell>
                <TableCell sx={{ backgroundColor: 'white', fontWeight: 'bold' }}>Application Title/Role</TableCell>
                <TableCell sx={{ backgroundColor: 'white', fontWeight: 'bold' }}>Company/Employer</TableCell>
                <TableCell sx={{ backgroundColor: 'white', fontWeight: 'bold' }}>Min Salary</TableCell>
                <TableCell sx={{ backgroundColor: 'white', fontWeight: 'bold' }}>Max Salary</TableCell>
                <TableCell sx={{ backgroundColor: 'white', fontWeight: 'bold' }}>Date Applied</TableCell>
                <TableCell sx={{ backgroundColor: 'white', fontWeight: 'bold' }} align='right'>Action</TableCell>
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
                  <TableCell sx={{ backgroundColor: 'white' }}>
                    <Chip variant='filled' label={fromEnumValue(application.status)} sx={{ backgroundColor: PlotMappings[application.status].color }} />
                  </TableCell>
                  <TableCell sx={{ backgroundColor: 'white' }}>{application.title}</TableCell>
                  <TableCell sx={{ backgroundColor: 'white' }}>{application.employer}</TableCell>
                  <TableCell sx={{ backgroundColor: 'white' }}>{application.salaryMin}</TableCell>
                  <TableCell sx={{ backgroundColor: 'white' }}>{application.salaryMax}</TableCell>
                  <TableCell sx={{ backgroundColor: 'white' }}>{application.dateApplied}</TableCell>
                  <TableCell sx={{ backgroundColor: 'white' }} align='right'>
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
      </Grid2>
    </Grid2>
  );
};

export default ApplicationsView;