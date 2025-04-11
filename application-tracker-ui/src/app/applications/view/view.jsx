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
  Grid2,
  MenuItem,
} from "@mui/material";
import Link from "next/link";
import SubmitButton from "@/components/SubmitButton";
import { fromEnumValue } from "@/utils/enumUtils";
import PlotMappings from "@/constants/plotMappings";
import { AddRounded, FilterAltOffRounded, Search } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { DateTime } from "luxon";
import Input from "@/components/Input";
import Form from "@/components/Form";
import Date from "@/components/Date";
import Select from "@/components/Select";
import { AppPriority, AppStatus } from "@/constants";
import { useState } from "react";

const FilterOptions = ({
  filterApplications = async () => {},
  setAppState = () => {}
}) => {
  const defaultValues = {
    employer: '',
    status: 'default',
    priority: 'default',
    keywords: '',
    dateCreatedStart: DateTime.now(),
    dateCreatedEnd: DateTime.now(),
    dateSubmittedStart: DateTime.now(),
    dateSubmittedEnd: DateTime.now(),
    salaryMin: 0,
    salaryMax: 0
  }

  const form = useForm({ defaultValues })

  const handleSubmit = async values => {
    let toSubmit = Object.keys(defaultValues).reduce((acc, curr) => ({ ...acc, [curr]: null }), {}) 
    toSubmit.employer = values.employer
    const dirtyFields = form.formState.dirtyFields

    if (dirtyFields?.status && values.status !== 'default') {
      toSubmit.status = values.status
    }

    if (dirtyFields?.priority && values.priority !== 'default') {
      toSubmit.priority = values.priority
    }

    if (dirtyFields?.keywords) {
      const split = values.keywords?.split(',')
      toSubmit.keywords = split
    }

    if (dirtyFields?.dateCreatedStart) {
      toSubmit.dateCreatedStart = values.dateCreatedStart.toISODate()
    }

    if (dirtyFields?.dateCreatedEnd) {
      toSubmit.dateCreatedEnd = values.dateCreatedEnd.toISODate()
    }

    if (dirtyFields?.dateSubmittedStart) {
      toSubmit.dateSubmittedStart = values.dateSubmittedStart.toISODate()
    }

    if (dirtyFields?.dateSubmittedEnd) {
      toSubmit.dateSubmittedEnd = values.dateSubmittedEnd.toISODate()
    }

    if (dirtyFields?.salaryMin && values.salaryMin > 0) {
      toSubmit.salaryMin = values.salaryMin
    }

    if (dirtyFields?.salaryMax && values.salaryMax > 0) {
      toSubmit.salaryMax = values.salaryMax
    }

    const { data, error } = await filterApplications(toSubmit)
    setAppState({ applications: data ?? [], error })
  }

  const resetFilters = () => {
    form.reset(defaultValues)
  }

  return <Grid2 size={12} height='fit-content' backgroundColor='white' p={1} borderRadius={1} >
    <Box width='100%'>
      <Form methods={form} onSubmit={form.handleSubmit(handleSubmit)}>
        <Grid2 container spacing={2} >
          <Grid2 size={12} mb={1}>
            <Typography fontSize='1.25rem' color='black' fontWeight='bold' >Filter Options</Typography>
            <Box sx={{ borderRadius: 15, height: '5px', width: '50px', backgroundColor: 'lightPurple' }} />
          </Grid2>
          <Grid2 size={3}><Input size='small' fullWidth name='employer' label='Employer' /></Grid2>
          <Grid2 size={3}><Input size='small' fullWidth name='keywords' label='Keywords (Comma separated)' /></Grid2>
          <Grid2 size={3}><Input size='small' fullWidth name='salaryMin' label='Min. Salary' type='number' /></Grid2>
          <Grid2 size={3}><Input size='small' fullWidth name='salaryMax' label='Max. Salary' type='number' /></Grid2>

          <Grid2 size={3}><Date textFieldProps={{ size: 'small' }} name='dateCreatedStart' label='Created After' /></Grid2>
          <Grid2 size={3}><Date textFieldProps={{ size: 'small' }} name='dateCreatedEnd' label='Created Before' /></Grid2>
          <Grid2 size={3}><Date textFieldProps={{ size: 'small' }} name='dateSubmittedStart' label='Submitted After' /></Grid2>
          <Grid2 size={3}><Date textFieldProps={{ size: 'small' }} name='dateSubmittedEnd' label='Submitted Before' /></Grid2>

          <Grid2 size={3}>
            <Select size='small' name='priority' label='Priority'>
              <MenuItem value='default'>-- Default --</MenuItem>
              { Object.values(AppPriority).map((val, idx) =>
                <MenuItem key={idx} value={val}>
                  { fromEnumValue(val) }
                </MenuItem>
              )}
            </Select>
          </Grid2>
          <Grid2 size={3}>
            <Select size='small' name='status' label='Status'>
              <MenuItem value='default'>-- Default --</MenuItem>
              { Object.values(AppStatus).map((val, idx) =>
                <MenuItem key={idx} value={val}>
                  { fromEnumValue(val) }
                </MenuItem>
              )}
            </Select>
          </Grid2>
          <Grid2 size={4}/>
          <Grid2 size={2} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button disabled={!form.formState.isDirty} sx={{ backgroundColor: 'lightPurple' }} fullWidth type='submit' variant='contained'>
              Search
            </Button>
          </Grid2>
          <Grid2 size={10}/>
          <Grid2 size={2} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button disabled={!form.formState.isDirty} sx={{ backgroundColor: 'cream', color: 'black' }} fullWidth  variant='contained' onClick={resetFilters}>
              Clear <FilterAltOffRounded sx={{ ml: 1 }} />
            </Button>
          </Grid2>
        </Grid2>
      </Form>
    </Box>
  </Grid2>
}

const ApplicationsView = ({ applications = [], filterApplications = async () => {} }) => {
  const [appState, setAppState] = useState({ applications, errors: null })

  return (
    <Grid2 container sx={{ p: 3 }}>
      <FilterOptions filterApplications={filterApplications} setAppState={setAppState} />
      <Grid2 size={12} sx={{ mt: 2 }}>
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
              {appState?.applications?.map((application) => (
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
                  <TableCell sx={{ backgroundColor: 'white' }}>
                    {DateTime.fromISO(application.dateApplied).toLocaleString(DateTime.DATE_MED)}
                  </TableCell>
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