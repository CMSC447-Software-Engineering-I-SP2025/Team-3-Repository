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
  Checkbox,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  Snackbar,
  Alert,
  CircularProgress,
  createTheme,
  ThemeProvider
} from "@mui/material";
import Link from "next/link";
import { AddRounded, FilterAltOffRounded, Edit, Delete, KeyboardDoubleArrowDownRounded, KeyboardArrowDownRounded, KeyboardArrowUpRounded, KeyboardDoubleArrowUpRounded } from "@mui/icons-material";
import { useForm, Controller, useWatch } from "react-hook-form";
import { DateTime } from "luxon";
import Input from "@/components/Input";
import Form from "@/components/Form";
import Date from "@/components/Date";
import { AppPriority, AppStatus, HeaderValues } from "@/constants";
import { useState } from "react";
import { fromEnumValue } from "@/utils/enumUtils";
import PlotMappings from "@/constants/plotMappings";
import { getBrowserToken } from "@/utils/browserUtils";

const PriorityChip = ({ priority = null }) => {
  if (!priority) { return 'Invalid' }

  const iconMappings = {
    [AppPriority.LOW]: {
      icon: <KeyboardDoubleArrowDownRounded sx={{ color: '#3498eb' }} />,
    },
    [AppPriority.MEDIUM]: {
      icon: <KeyboardArrowDownRounded sx={{ color: '#ffb84d' }} />,
    },
    [AppPriority.HIGH]: {
      icon: <KeyboardArrowUpRounded sx={{ color: '#ff7626' }} />,
    },
    [AppPriority.EXPEDITED]: {
      icon: <KeyboardDoubleArrowUpRounded sx={{ color: '#ff2a26' }} />,
    },
  }

  return <Chip 
    variant='filled' 
    label={iconMappings[priority]?.icon} 
    sx={{
      '& .MuiChip-label': {  display: 'flex', justifyContent: 'center', alignItems: 'center' },
      backgroundColor: '#404040'
    }} 
  />
}

const theme = createTheme({
  components: {
    MuiMenu: {
      styleOverrides: {
        paper: {
          backgroundColor: '#fff',
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          backgroundColor: '#fff',
        },
      },
    },
  },
});

const FilterOptions = ({ filterApplications = async () => {}, setAppState = () => {} }) => {
  const defaultValues = {
    status: 'default',
    priority: 'default',
    employer: '',
    dateCreatedStart: null,
    dateCreatedEnd: null,
    dateAppliedStart: null,
    dateAppliedEnd: null,
    keywords: [],
    salaryMin: null,
    salaryMax: null
  };

  const form = useForm({ defaultValues });

  const handleSubmit = async values => {
    let keywords = [];

    if (typeof values.keywords === 'string') {
      keywords = values.keywords.split(',');
    } else if (Array.isArray(values.keywords)) {
      keywords = values.keywords;
    }


    let toSubmit = Object.keys(defaultValues).reduce((acc, curr) => ({ ...acc, [curr]: null }), {}); 
    const dirtyFields = form.formState.dirtyFields;

    if (dirtyFields.employer && values.employer !== '') {
      toSubmit.employer = values.employer
    }

    if (values.status !== 'default') {
      toSubmit.status = values.status;
    }

    if (values.priority !== 'default') {
      toSubmit.priority = values.priority;
    }

    toSubmit.keywords = keywords

    if (dirtyFields?.dateCreatedStart) {
      toSubmit.dateCreatedStart = values.dateCreatedStart.toISO();
    }

    if (dirtyFields?.dateCreatedEnd) {
      toSubmit.dateCreatedEnd = values.dateCreatedEnd.toISO();
    }

    if (dirtyFields?.dateAppliedStart) {
      toSubmit.dateAppliedStart = values.dateAppliedStart.toISO();
    }

    if (dirtyFields?.dateAppliedEnd) {
      toSubmit.dateAppliedEnd = values.dateAppliedEnd.toISO();
    }

    if (dirtyFields?.salaryMin && values.salaryMin > 0) {
      toSubmit.salaryMin = values.salaryMin;
    }

    if (dirtyFields?.salaryMax && values.salaryMax > 0) {
      toSubmit.salaryMax = values.salaryMax;
    }



    try {
      const token = getBrowserToken() 
      const val = { [HeaderValues.TOKEN]: token }
      const response = await filterApplications(toSubmit, val);

      if (response?.status !== 200) {
        setAppState({ applications: [], error: 'Search failed' });
      } else {
        setAppState({ applications: response.data ?? [], error: null });
      }
    } catch (error) {
      console.error('API call failed:', error);
      setAppState({ applications: [], error: 'Search failed' });
    }
  };

  const resetFilters = () => {
    form.reset(defaultValues);
  };

  return (
    <Grid2 size={12} height='fit-content' backgroundColor='white' p={1} borderRadius={1}>
      <Box width='100%'>
        <Form methods={form} onSubmit={form.handleSubmit(handleSubmit)}>
          <Grid2 container spacing={2}>
            <Grid2 size={12} mb={1}>
              <Typography fontSize='1.25rem' color='black' fontWeight='bold'>Filter Options</Typography>
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
              <FormControl fullWidth size="small">
                <InputLabel shrink>Priority</InputLabel>
                <Select
                  name='priority'
                  value={form.watch('priority')}
                  onChange={(e) => form.setValue('priority', e.target.value)}
                  label="Priority"
                  sx={{ backgroundColor: '#fff' }}
                >
                  <MenuItem value='default'>-- Default --</MenuItem>
                  {Object.values(AppPriority).map((val, idx) => (
                    <MenuItem key={idx} value={val}>
                      {fromEnumValue(val)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid2>
            <Grid2 size={3}>
              <FormControl fullWidth size="small">
                <InputLabel shrink>Status</InputLabel>
                <Select
                  name='status'
                  value={form.watch('status')}
                  onChange={(e) => form.setValue('status', e.target.value)}
                  label="Status"
                  sx={{ backgroundColor: '#fff' }}
                >
                  <MenuItem value='default'>-- Default --</MenuItem>
                  {Object.values(AppStatus).map((val, idx) => (
                    <MenuItem key={idx} value={val}>
                      {fromEnumValue(val)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid2>
            <Grid2 size={4}/>
            <Grid2 size={2} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button disabled={!form.formState.isDirty} sx={{ backgroundColor: 'lightPurple' }} fullWidth type='submit' variant='contained'>
                Search
              </Button>
            </Grid2>
            <Grid2 size={10}/>
            <Grid2 size={2} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button disabled={!form.formState.isDirty} sx={{ backgroundColor: 'cream', color: 'black' }} fullWidth variant='contained' onClick={resetFilters}>
                Clear <FilterAltOffRounded sx={{ ml: 1 }} />
              </Button>
            </Grid2>
          </Grid2>
        </Form>
      </Box>
    </Grid2>
  );
};

const BatchEditForm = ({ 
  selectedCount, 
  onClose, 
  onSubmit, 
  isLoading 
}) => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      field: 'status',
      value: ''
    }
  });

  const selectedField = useWatch({ control, name: 'field' });

  return (
    <Dialog 
      open 
      onClose={isLoading ? undefined : onClose}
      PaperProps={{
        sx: {
          backgroundColor: '#fff',
          borderRadius: 2,
          p: 2,
          boxShadow: 24,
          minWidth: '400px'
        }
      }}
    >
      <DialogTitle>Batch Update {selectedCount} Applications</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent sx={{ pt: 2 }}>
          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel>Field to Update</InputLabel>
            <Controller
              name="field"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  label="Field to Update"
                  disabled={isLoading}
                  sx={{ backgroundColor: '#fff' }}
                >
                  <MenuItem value="status">Status</MenuItem>
                  <MenuItem value="priority">Priority</MenuItem>
                </Select>
              )}
            />
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>New Value</InputLabel>
            <Controller
              name="value"
              control={control}
              rules={{ required: 'Please select a value' }}
              render={({ field, fieldState: { error } }) => (
                <>
                  <Select
                    {...field}
                    label="New Value"
                    error={!!error}
                    disabled={isLoading}
                    sx={{ backgroundColor: '#fff' }}
                  >
                    {selectedField === 'status' ? (
                      Object.values(AppStatus).map((val) => (
                        <MenuItem key={val} value={val}>
                          {fromEnumValue(val)}
                        </MenuItem>
                      ))
                    ) : (
                      Object.values(AppPriority).map((val) => (
                        <MenuItem key={val} value={val}>
                          {fromEnumValue(val)}
                        </MenuItem>
                      ))
                    )}
                  </Select>
                  {error && (
                    <Typography color="error" variant="caption">
                      {error.message}
                    </Typography>
                  )}
                </>
              )}
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button 
            type="submit" 
            variant="contained" 
            disabled={isLoading}
            endIcon={isLoading && <CircularProgress size={20} />}
          >
            {isLoading ? 'Updating...' : 'Update'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

const ApplicationsView = ({ 
  initialApplications = [], 
  filterApplications = async () => {}, 
  handleBatchUpdate = async () => {},
}) => {
  const [appState, setAppState] = useState({ applications: initialApplications, error: null });
  const [selectedIds, setSelectedIds] = useState([]);
  const [isBatchEditing, setIsBatchEditing] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [error, setError] = useState(null)

  const toggleSelectAll = (event) => {
    setSelectedIds(event.target.checked ? appState.applications.map(app => app.id) : []);
  };

  const toggleSelectOne = (id) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);
  };

  const handleBatchSubmit = async (data) => {
    const token = getBrowserToken()
    const heads = { [HeaderValues.TOKEN]: token }

    if (!token) {
      return 
    }

    if (data === 'delete') {
      const request = {
        applicationIds: selectedIds,
        type: 'DELETE'
      }

      const response = await handleBatchUpdate(request, heads)
      if (response.status !== 200 || !response.data) {
        setError('Failed to delete one or more applications.')
      }

      setDeleteConfirmOpen(false)

      return
    }

    const type = data.field.toUpperCase()

    const request = {
      type,
      status: type === 'STATUS' ? data.value : null,
      priority: type === 'PRIORITY' ? data.value : null,
      applicationIds: selectedIds
    }

    const response = await handleBatchUpdate(request, heads)
    if (!response.status === 200 || !response.data) {
      setError('Failed to update one or more applications.')
    }
    setIsBatchEditing(false)
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid2 container sx={{ p: 3 }}>
        <FilterOptions filterApplications={filterApplications} setAppState={setAppState} />
        { error && <Grid2 mt={2} size={12}>
            <Alert severity='error' >
              <Typography>{ error }</Typography>
            </Alert>
          </Grid2>
        }
        
        <Grid2 size={12} sx={{ mt: 2 }}>
          <Box sx={{ 
            width: '100%',
            overflowX: 'auto',
            '&::-webkit-scrollbar': {
              height: '8px',
            },
            '&::-webkit-scrollbar-track': {
              background: '#f1f1f1',
            },
            '&::-webkit-scrollbar-thumb': {
              background: '#888',
              borderRadius: '4px',
            },
            '&::-webkit-scrollbar-thumb:hover': {
              background: '#555',
            }
          }}>
            <TableContainer component={Paper} sx={{ 
              backgroundColor: 'white',
              minWidth: '1200px' 
            }}>
              <Table sx={{ tableLayout: 'fixed' }}>
                <TableHead>
                  <TableRow>
                    <TableCell colSpan={7} sx={{ 
                      backgroundColor: 'white', 
                      borderBottom: 'none',
                      pr: 2
                    }}>
                      <Typography fontSize="1.5rem" fontWeight="bold">
                        My Job Applications
                      </Typography>
                    </TableCell>
                    <TableCell align="right" sx={{ 
                      borderBottom: 'none',
                      width: '360px',
                      pr: 2
                    }}>
                      <Box sx={{ 
                        display: 'flex', 
                        gap: 1,
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        minHeight: '48px'
                      }}>
                        {selectedIds.length > 0 && (
                          <>
                            <Chip
                              onClick={() => setIsBatchEditing(true)}
                              sx={{
                                backgroundColor: '#1976d2',
                                color: 'white',
                                minWidth: '110px',
                                cursor: 'pointer',
                                '&:hover': {
                                  backgroundColor: '#1565c0'
                                }
                              }}
                              icon={<Edit sx={{ color: 'white', fontSize: '18px' }} />}
                              label={`Edit (${selectedIds.length})`}
                            />
                            <Chip
                              onClick={() => setDeleteConfirmOpen(true)}
                              sx={{
                                backgroundColor: '#d32f2f',
                                color: 'white',
                                minWidth: '110px',
                                cursor: 'pointer',
                                '&:hover': {
                                  backgroundColor: '#c62828'
                                }
                              }}
                              icon={<Delete sx={{ color: 'white', fontSize: '18px' }} />}
                              label={`Delete (${selectedIds.length})`}
                            />
                          </>
                        )}
                        
                        <Chip
                          sx={{ 
                            backgroundColor: '#9575cd',
                            color: 'white',
                            minWidth: '90px',
                            ml: selectedIds.length > 0 ? 0 : 'auto',
                            '&:hover': {
                              backgroundColor: '#7e57c2'
                            }
                          }}
                          href="/applications/create"
                          clickable
                          component="a"
                          icon={<AddRounded sx={{ color: 'white', fontSize: '18px' }} />}
                          label="Create"
                        />
                      </Box>
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell padding="checkbox" sx={{ width: '60px' }}>
                      <Checkbox
                        indeterminate={selectedIds.length > 0 && selectedIds.length < appState.applications.length}
                        checked={appState.applications.length > 0 && selectedIds.length === appState.applications.length}
                        onChange={toggleSelectAll}
                      />
                    </TableCell>
                    <TableCell sx={{ 
                        fontWeight: 'bold', 
                        px: 1,
                        textAlign: 'left',
                        width: '150px' 
                      }}
                    >
                      Priority
                    </TableCell>
                    <TableCell sx={{ 
                      fontWeight: 'bold', 
                      px: 1,
                      textAlign: 'left',
                      width: '150px' 
                    }}>Status</TableCell>
                    <TableCell sx={{ 
                      fontWeight: 'bold',
                      px: 1,
                      textAlign: 'left',
                      width: '300px' 
                    }}>Title/Role</TableCell>
                    <TableCell sx={{ 
                      fontWeight: 'bold',
                      px: 1,
                      textAlign: 'left',
                      width: '200px' 
                    }}>Company</TableCell>
                    <TableCell sx={{ 
                      fontWeight: 'bold',
                      px: 1,
                      textAlign: 'left',
                      width: '150px' 
                    }}>Min Salary</TableCell>
                    <TableCell sx={{ 
                      fontWeight: 'bold',
                      px: 1,
                      textAlign: 'left',
                      width: '150px' 
                    }}>Max Salary</TableCell>
                    <TableCell sx={{ 
                      fontWeight: 'bold',
                      px: 1,
                      textAlign: 'left',
                      width: '150px' 
                    }}>Date Applied</TableCell>
                    <TableCell sx={{ 
                      fontWeight: 'bold',
                      pr: 2,
                      textAlign: 'right',
                      width: '200px' 
                    }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {appState.applications.map((application) => (
                    <TableRow key={application.id} hover sx={{ '& td': { py: 1.5 } }}>
                      <TableCell padding="checkbox" sx={{ width: '60px' }}>
                        <Checkbox
                          checked={selectedIds.includes(application.id)}
                          onChange={() => toggleSelectOne(application.id)}
                        />
                      </TableCell>
                      <TableCell sx={{ 
                        px: 1,
                        textAlign: 'left',
                        width: '150px'
                      }}>
                        <PriorityChip priority={application?.priority} />
                      </TableCell>
                      <TableCell sx={{ 
                        px: 1,
                        textAlign: 'left',
                        width: '150px'
                      }}>
                        <Chip 
                          variant='filled' 
                          label={fromEnumValue(application.status)} 
                          sx={{ 
                            backgroundColor: PlotMappings[application.status].color,
                            textTransform: 'capitalize',
                            maxWidth: '100%',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                          }} 
                        />
                      </TableCell>
                      <TableCell sx={{ 
                        px: 1,
                        textAlign: 'left',
                        width: '300px',
                        whiteSpace: 'normal', 
                        wordBreak: 'break-word' 
                      }}>
                        {application.title}
                      </TableCell>
                      <TableCell sx={{ 
                        px: 1,
                        textAlign: 'left',
                        width: '200px',
                        whiteSpace: 'normal', 
                        wordBreak: 'break-word' 
                      }}>
                        {application.employer}
                      </TableCell>
                      <TableCell sx={{ 
                        px: 1,
                        textAlign: 'left',
                        width: '150px'
                      }}>
                        ${application.salaryMin?.toLocaleString()}
                      </TableCell>
                      <TableCell sx={{ 
                        px: 1,
                        textAlign: 'left',
                        width: '150px'
                      }}>
                        ${application.salaryMax?.toLocaleString()}
                      </TableCell>
                      <TableCell sx={{ 
                        px: 1,
                        textAlign: 'left',
                        width: '150px'
                      }}>
                        { application?.dateApplied ?  DateTime.fromISO(application.dateApplied).toLocaleString(DateTime.DATE_MED) : 'Not Yet Applied'}
                      </TableCell>
                      <TableCell align="right" sx={{ 
                        pr: 2,
                        width: '200px'
                      }}>
                        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                          <Link href={`/applications/manage?id=${application.id}`} passHref>
                            <Button
                              variant="outlined"
                              startIcon={<Edit />}
                              sx={{ minWidth: '85px' }}
                            >
                              Edit
                            </Button>
                          </Link>
                          <Link href={`/applications/manage?id=${application.id}&action=delete`} passHref>
                            <Button
                              variant="outlined"
                              color="error"
                              startIcon={<Delete />}
                              sx={{ minWidth: '85px' }}
                            >
                              Delete
                            </Button>
                          </Link>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Grid2>

        {isBatchEditing && (
          <BatchEditForm
            selectedCount={selectedIds.length}
            onClose={() => setIsBatchEditing(false)}
            onSubmit={handleBatchSubmit}
          />
        )}

        <Dialog 
          open={deleteConfirmOpen} 
          onClose={() => !isLoading && setDeleteConfirmOpen(false)}
          PaperProps={{
            sx: {
              backgroundColor: '#fff',
              borderRadius: 2,
              p: 3
            }
          }}
        >
          <DialogTitle sx={{ fontWeight: 'bold' }}>Confirm Delete</DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to permanently delete {selectedIds.length} selected applications?
            </Typography>
            <Typography color="error" sx={{ mt: 1 }}>
              This action cannot be undone.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button 
              onClick={() => setDeleteConfirmOpen(false)} 
            >
              Cancel
            </Button>
            <Button 
              onClick={() => handleBatchSubmit('delete')} 
              color="error" 
              variant="contained" 
            >
              Confirm Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Grid2>
    </ThemeProvider>
  );
};

export default ApplicationsView;