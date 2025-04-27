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
import { AddRounded, FilterAltOffRounded, Edit, Delete } from "@mui/icons-material";
import { useForm, Controller, useWatch } from "react-hook-form";
import { DateTime } from "luxon";
import Input from "@/components/Input";
import Form from "@/components/Form";
import Date from "@/components/Date";
import { AppPriority, AppStatus } from "@/constants";
import { useState } from "react";
import { fromEnumValue } from "@/utils/enumUtils";
import PlotMappings from "@/constants/plotMappings";

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
  };

  const form = useForm({ defaultValues });

  const handleSubmit = async values => {
    let toSubmit = Object.keys(defaultValues).reduce((acc, curr) => ({ ...acc, [curr]: null }), {}); 
    toSubmit.employer = values.employer;
    const dirtyFields = form.formState.dirtyFields;

    if (dirtyFields?.status && values.status !== 'default') {
      toSubmit.status = values.status;
    }

    if (dirtyFields?.priority && values.priority !== 'default') {
      toSubmit.priority = values.priority;
    }

    if (dirtyFields?.keywords) {
      const split = values.keywords?.split(',');
      toSubmit.keywords = split;
    }

    if (dirtyFields?.dateCreatedStart) {
      toSubmit.dateCreatedStart = values.dateCreatedStart.toISODate();
    }

    if (dirtyFields?.dateCreatedEnd) {
      toSubmit.dateCreatedEnd = values.dateCreatedEnd.toISODate();
    }

    if (dirtyFields?.dateSubmittedStart) {
      toSubmit.dateSubmittedStart = values.dateSubmittedStart.toISODate();
    }

    if (dirtyFields?.dateSubmittedEnd) {
      toSubmit.dateSubmittedEnd = values.dateSubmittedEnd.toISODate();
    }

    if (dirtyFields?.salaryMin && values.salaryMin > 0) {
      toSubmit.salaryMin = values.salaryMin;
    }

    if (dirtyFields?.salaryMax && values.salaryMax > 0) {
      toSubmit.salaryMax = values.salaryMax;
    }

    const { data, error } = await filterApplications(toSubmit);
    setAppState({ applications: data ?? [], error });
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
                  label="Priority"
                  defaultValue="default"
                  sx={{ backgroundColor: '#fff' }}
                >
                  <MenuItem value='default'>-- Default --</MenuItem>
                  {Object.values(AppPriority).map((val, idx) =>
                    <MenuItem key={idx} value={val}>
                      {fromEnumValue(val)}
                    </MenuItem>
                  )}
                </Select>
              </FormControl>
            </Grid2>
            <Grid2 size={3}>
              <FormControl fullWidth size="small">
                <InputLabel shrink>Status</InputLabel>
                <Select 
                  name='status'
                  label="Status"
                  defaultValue="default"
                  sx={{ backgroundColor: '#fff' }}
                >
                  <MenuItem value='default'>-- Default --</MenuItem>
                  {Object.values(AppStatus).map((val, idx) =>
                    <MenuItem key={idx} value={val}>
                      {fromEnumValue(val)}
                    </MenuItem>
                  )}
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
  applications = [], 
  filterApplications = async () => {}, 
  onBatchUpdate = async () => {},
  onBatchDelete = async () => {}
}) => {
  const [appState, setAppState] = useState({ applications, errors: null });
  const [selectedIds, setSelectedIds] = useState([]);
  const [isBatchEditing, setIsBatchEditing] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState({ 
    open: false, 
    message: '', 
    severity: 'success' 
  });

  const toggleSelectAll = (event) => {
    setSelectedIds(event.target.checked ? appState.applications.map(app => app.id) : []);
  };

  const toggleSelectOne = (id) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);
  };

  const handleBatchSubmit = async (data) => {
    setIsLoading(true);
    try {
      await onBatchUpdate({
        applicationIds: selectedIds,
        updateFields: { [data.field]: data.value }
      });
      
      const { data: freshData } = await filterApplications({});
      setAppState({ applications: freshData || [], error: null });
      setNotification({
        open: true,
        message: `Successfully updated ${selectedIds.length} applications`,
        severity: 'success'
      });
    } catch (error) {
      setNotification({
        open: true,
        message: 'Failed to update applications',
        severity: 'error'
      });
    } finally {
      setIsLoading(false);
      setIsBatchEditing(false);
    }
  };

  const handleBatchDelete = async () => {
    setIsLoading(true);
    try {
      await onBatchDelete(selectedIds);
      const { data } = await filterApplications({});
      setAppState({ applications: data || [], error: null });
      setNotification({
        open: true,
        message: `Successfully deleted ${selectedIds.length} applications`,
        severity: 'success'
      });
    } catch (error) {
      setNotification({
        open: true,
        message: 'Failed to delete applications',
        severity: 'error'
      });
    } finally {
      setIsLoading(false);
      setDeleteConfirmOpen(false);
      setSelectedIds([]);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid2 container sx={{ p: 3 }}>
        <FilterOptions filterApplications={filterApplications} setAppState={setAppState} />
        
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
                        {DateTime.fromISO(application.dateApplied).toLocaleString(DateTime.DATE_MED)}
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
            isLoading={isLoading}
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
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleBatchDelete} 
              color="error" 
              variant="contained" 
              disabled={isLoading}
              endIcon={isLoading && <CircularProgress size={20} color="inherit" />}
            >
              {isLoading ? 'Deleting...' : 'Confirm Delete'}
            </Button>
          </DialogActions>
        </Dialog>

        <Snackbar
          open={notification.open}
          autoHideDuration={6000}
          onClose={() => setNotification(prev => ({ ...prev, open: false }))}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert 
            onClose={() => setNotification(prev => ({ ...prev, open: false }))}
            severity={notification.severity}
            sx={{ width: '100%' }}
          >
            {notification.message}
          </Alert>
        </Snackbar>
      </Grid2>
    </ThemeProvider>
  );
};

export default ApplicationsView;