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
} from "@mui/material";
import Link from "next/link";
import SubmitButton from "@/components/SubmitButton"; 
import { fromEnumValue } from "@/utils/enumUtils";
import PlotMappings from "@/constants/plotMappings";
import { AddRounded } from "@mui/icons-material";

const ApplicationsView = ({ applications = [] }) =>
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
  </Box>

export default ApplicationsView