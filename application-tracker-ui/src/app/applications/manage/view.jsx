'use client'
import ContentContainer from "@/components/ContentContainer"
import Date from "@/components/Date"
import Form from "@/components/Form"
import Input from "@/components/Input"
import PageContainer from "@/components/PageContainer"
import Select from "@/components/Select"
import { AppPriority, AppStatus } from "@/constants"
import PlotMappings from "@/constants/plotMappings"
import { fromEnumValue } from "@/utils/enumUtils"
import { yupResolver } from "@hookform/resolvers/yup"
import { ArrowBack, DeleteRounded, HelpOutline, WarningRounded, ArrowForward } from "@mui/icons-material"
import { Alert, AlertTitle, Box, Button, Chip, Collapse, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid2, MenuItem, Tooltip, Typography } from "@mui/material"
import { DateTime } from "luxon"
import Link from "next/link"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import * as Yup from 'yup'

const validationSchema = Yup.object().shape({})

const COMMON_GRID_PROPS = { size: { xs: 12, md: 6 } }

const BasicInput = ({ component = null, ...props }) =>
  <Grid2 {...COMMON_GRID_PROPS}>
    {
      component ? component : <Input fullWidth {...props} />
    }
  </Grid2>

const SelectInput = ({ children, ...props }) =>
  <Grid2 {...COMMON_GRID_PROPS}>
    <Select {...props}>
      {children}
    </Select>
  </Grid2>

const DateInput = ({ ...props }) =>
  <Grid2 {...COMMON_GRID_PROPS}>
    <Date fullWidth {...props} />
  </Grid2>


const ApplicationManageView = ({
  action = null,
  application,
  handleUpdate = async() => {},
  handleDelete = async() => {}
}) => {
  const [errors, setErrors] = useState([])
  const [deleteModal, setDeleteModal] = useState({ open: action === 'delete', failed: false })
  const router = useRouter()
  const path = usePathname()
  const query = useSearchParams()

  const defaultValues = {
    ...application,
    dateCreated: DateTime.fromFormat(application?.dateCreated ?? '1990-01-01', 'yyyy-LL-dd'),
    dateApplied: DateTime.fromFormat(application?.dateApplied ?? '1990-01-01', 'yyyy-LL-dd'),
  }

  const form = useForm({
    defaultValues,
    validationSchema: yupResolver(validationSchema)
  })

  const submitFunction = async data => {
    let serverSafe = {
      ...data,
      dateCreated: data.dateCreated.toISODate(),
    }

    if (data.status === AppStatus.SUBMITTED) {
      if (data.dateApplied === null) {
        serverSafe.dateApplied = DateTime.now().toISODate()
      } else {
        serverSafe.dateApplied = data.dateApplied.toISODate()
      }
    }
    const { status, error } = await handleUpdate(serverSafe)
    if (status !== 200) {
      setErrors([error])
      return
    }
    
    router.push('/applications/view')
  }

  const deleteApplication = async() => {
    const response = await handleDelete(application?.id)
    setDeleteModal({ open: false, response })
  }

  useEffect(() => {
    if (query.get('action') !== null) {
      const replaceUrl = `${path}?id=${query.get('id')}`
      router.replace(replaceUrl)
    }
  }, [router, path, query])

  if (deleteModal && deleteModal?.response) {
    if (deleteModal?.response?.status === 200) {
      return (
        <PageContainer><ContentContainer sx={{ maxWidth: 800 }}>
          <Grid2 size={12}>
            <Alert severity="success">
              <AlertTitle>Success!</AlertTitle>
              Job application deleted successfully.
              {/** caches otherwise, use anchor*/}
              <a
                href="/applications/view"
              >
                <Typography
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    color: 'darkPurple',
                    textDecoration: '1px solid underline'
                  }}
                >
                  View Applications
                  <ArrowForward />
                </Typography>
              </a>
            </Alert>
          </Grid2>
        </ContentContainer></PageContainer>
      )
    }

    return (
      <PageContainer><ContentContainer sx={{ maxWidth: 800 }}>
        <Grid2 size={12}>
          <Alert severity="error">
            <AlertTitle>Error!</AlertTitle>
            {deleteModal.response.error}
          </Alert>
        </Grid2>
      </ContentContainer></PageContainer>
    )
  }

  return <PageContainer >
    <ContentContainer sx={{ maxWidth: 800 }} >
      <Grid2 size={12} sx={{ display: 'flex', justifyContent: 'space-between' }} >
        <Button href='/applications/view' variant='contained' sx={{ backgroundColor: 'intermediate' }} >
          <ArrowBack sx={{ mr: 1 }} />
          Back
        </Button>
        <Button
          onClick={() => setDeleteModal({ open: true, failed: false })}
          variant='contained'
          sx={{ backgroundColor: 'cream', color: 'black' }} >
          Delete 
          <DeleteRounded sx={{ ml: 1, color: 'black' }} />
        </Button>
      </Grid2>
      <Grid2 size={12} >
        <Collapse in={errors.length > 1}>
          <Alert severity='error'>
            <AlertTitle><Typography>Failed to Update Application</Typography></AlertTitle>
            { errors.map((item, idx) => <Typography key={idx}>Error: {item}</Typography>) }
          </Alert>
        </Collapse>
        <Collapse in={deleteModal.failed}>
          <Alert severity='error'>
            <AlertTitle><Typography>Failed to Delete Application</Typography></AlertTitle>
          </Alert>
        </Collapse>
      </Grid2>
      <Grid2 size={12}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }} >
          <Typography fontSize='1.5rem' fontWeight='bold' >
            Application for { application?.title ?? 'Unknown' }
          </Typography>
          <Chip
            variant='filled'
            sx={{ backgroundColor: PlotMappings[application?.status].color }}
            label={fromEnumValue(application?.status)}
          />
        </Box>
        <Divider/>
      </Grid2>
      <Form methods={form} onSubmit={form.handleSubmit(submitFunction)}>
        <Grid2 container spacing={1} sx={{ mb: 2 }} >
          <Grid2 size={12} >
            <Typography
              sx={{
                display: 'flex',
                alignItems: 'center',
                fontWeight: 'bold',
                fontSize: '1.15rem'
              }}
            >
              The Following Fields Cannot be Modified
              <Tooltip
                arrow
                sx={{ ml: 1 }}
                title='These fields are read-only because of their importance. Please contact us if you would like to change these values.'
              >
                <HelpOutline/>
              </Tooltip>
            </Typography>
          </Grid2>
          <BasicInput disabled name='link' label='Link' />
          <BasicInput disabled name='Employer' label='Employer' />
          { /** Conditionally render if this has not been submitted */ }
          { form.getValues()?.dateCreated && <DateInput disabled name='dateCreated' label='Date Created' /> }
          { form.getValues()?.dateApplied && <DateInput disabled name='dateApplied' label='Date Applied' /> }
          
        </Grid2>
        <Grid2 size={12} sx={{ mb: 2 }} > <Divider/> </Grid2>

        <Grid2 container spacing={1}>
          <Grid2 size={12}>
            <Typography fontSize='1.15rem' fontWeight='bold'>
              Editable Fields
            </Typography>
          </Grid2>
          <BasicInput name='title' label='Title' />
          <BasicInput name='salary' label='Salary' />
          <SelectInput name='status' label='Status'>
            { Object.values(AppStatus).map((value, index) =>
              <MenuItem value={value} key={index}>{ fromEnumValue(value) }</MenuItem>
            ) }
          </SelectInput> 
          <SelectInput name='priority' label='Priority'>
            { Object.values(AppPriority).map((value, index) =>
              <MenuItem value={value} key={index}>{ fromEnumValue(value) }</MenuItem>
            ) }
          </SelectInput> 
          <Grid2 size={12}>
            <Button
              fullWidth
              type='submit'
              variant='contained'
              sx={{ backgroundColor: 'lightPurple' }}
            >
              Update
            </Button>
          </Grid2>
        </Grid2>
      </Form>
    </ContentContainer>

    <Dialog
      open={deleteModal.open}
      maxWidth='sm'
      fullWidth
      onChange={() => setDeleteModal({ open: false })}
      sx={{
        '& .MuiPaper-root': { background : 'white' }
      }}
    >
      <DialogTitle>
        <Typography fontWeight='bold' fontSize='1.25rem' >Confirm Delete</Typography>
      </DialogTitle>
      <Divider/>
      <DialogContent>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2 }} >
          <Typography color='red' display='flex' alignItems='center' justifyContent='center' fontWeight='bold' fontSize='1.25rem'>
          <WarningRounded sx={{ color: 'red', mr: 1 }} fontSize='large' />
            <span style={{ height: 'fit-content' }} >
              PLEASE READ THE BELOW WARNING
            </span>
          <WarningRounded sx={{ color: 'red', ml: 1 }} fontSize='large' />
          </Typography>
        </Box>
        <Typography>
          Once you confirm to delete this application, this action cannot be undone.
        </Typography>
      </DialogContent>
      <Divider/>
      <DialogActions sx={{ display: 'flex', justifyContent: 'space-between' }} >
        <Button
          onClick={() => setDeleteModal({ open: false, failed: false })}
          sx={{ backgroundColor: 'intermediate', color: 'white' }}
        >Cancel</Button>
        <Button
          variant='contained'
          onClick={deleteApplication}
          sx={{ backgroundColor: 'lightPurple' }}
        >Confirm Delete</Button>

      </DialogActions>
    </Dialog>
  </PageContainer>
}

export default ApplicationManageView