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
import { HelpOutline } from "@mui/icons-material"
import { Box, Button, Chip, Divider, Grid2, MenuItem, Tooltip, Typography } from "@mui/material"
import { DateTime } from "luxon"
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


const ApplicationManageView = ({ application }) => {
  const defaultValues = {
    dateCreated: DateTime.now(),
    dateApplied: DateTime.now(),
    link: 'https://fuck-off.com',
    employer: 'Heresey Inc',
    title: 'My Sample Application',
    salary: '$90,000 - $200,000',
    status: AppStatus.IN_PROGRESS,
    priority: AppPriority.EXPEDITED
  }
  const form = useForm({
    defaultValues,
    validationSchema: yupResolver(validationSchema)
  })

  const submitFunction = async data => {
    console.log(data)
  }

  return <PageContainer >
    <ContentContainer sx={{ maxWidth: 800 }} >
      <Grid2 size={12}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }} >
          <Typography fontSize='1.5rem' fontWeight='bold' >
            Application for { application?.title ?? 'Unknown' }
          </Typography>
          <Chip
            variant='filled'
            sx={{ backgroundColor: PlotMappings[AppStatus.IN_PROGRESS].color }}
            label={fromEnumValue(AppStatus.IN_PROGRESS)}
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
  </PageContainer>
}

export default ApplicationManageView