'use client'
import ContentContainer from "@/components/ContentContainer"
import PageContainer from "@/components/PageContainer"
import { useForm } from "react-hook-form"
import {
  Button,
  Typography,
  Box,
  Grid2,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Alert,
  TextField,
  LinearProgress
} from "@mui/material";
import { DateTime } from "luxon";
import Input from "@/components/Input";
import Form from "@/components/Form";
import Date from "@/components/Date";
import { AppPriority, AppStatus, ChartTypes, HeaderValues, TEXTFIELD_SELECT_SLOT_PROPS, TEXTFIELD_STYLES } from "@/constants";
import { useState } from "react";
import { fromEnumValue } from "@/utils/enumUtils";
import { FilterAltOffRounded } from "@mui/icons-material";
import DatavizCharts from "@/components/dataviz/Charts";
import { useMediaQuery } from "@mui/material";
import theme from "@/theme";


const DatavizView = ({ data, resolveCharts = async () => {} }) => {
  const [chartData, setChartData] = useState(data?.data)
  const [error, setError] = useState(false)
  const [chartType, setChartType] = useState(ChartTypes.BAR)
  const selectedData = chartData?.[chartType] ?? null

  const defaultValues = {
    employer: '',
    status: 'default',
    priority: 'default',
    keywords: '',
    dateCreatedStart: DateTime.now(),
    dateCreatedEnd: DateTime.now(),
    dateAppliedStart: DateTime.now(),
    dateAppliedEnd: DateTime.now(),
    salaryMin: 0,
    salaryMax: 0
  }

  const form = useForm({
    defaultValues
  })

  const resetFilters = () => {
    form.reset(defaultValues);
  };

  const handleSubmit = async values => {
    setError(false)
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

    const asConst = { ...toSubmit }
    const token = window.sessionStorage.getItem(HeaderValues.TOKEN)

    const asObj = {
      [HeaderValues.TOKEN]: token
    }

    const response = await resolveCharts(asConst, asObj);
    if (response?.status !== 200) {
      setError(true)
      return
    }

    setChartData(response?.data ?? null)
  };


  const sm = useMediaQuery(theme.breakpoints.down('sm'))
  const md = useMediaQuery(theme.breakpoints.down('md'))

  const determineHeight = () => {
    if (sm) {
      return 300 
    }

    if (md) {
      return 400 
    }

    return 500
  }

  const height = determineHeight()

  return <PageContainer sx={{ mt: 2 }} >
    <ContentContainer sx={{ maxWidth: '95%' }}>
      { error && <Box width='100%'>
          <Alert severity='error'>
            <Typography>Unable to load charts. Try again later.</Typography>
          </Alert>
        </Box>
      }
      <Box width='100%'>
        <Form methods={form} onSubmit={form.handleSubmit(handleSubmit)}>
          <Grid2 container spacing={2}>
            <Grid2 size={12} mb={1}>
              <Typography fontSize='1.25rem' color='black' fontWeight='bold'>Chart Query</Typography>
              <Box sx={{ borderRadius: 15, height: '5px', width: '50px', backgroundColor: 'lightPurple' }} />
            </Grid2>
            <Grid2 size={3}><Input size='small' fullWidth name='employer' label='Employer' /></Grid2>
            <Grid2 size={3}><Input size='small' fullWidth name='keywords' label='Keywords (Comma separated)' /></Grid2>
            <Grid2 size={3}><Input size='small' fullWidth name='salaryMin' label='Min. Salary' type='number' /></Grid2>
            <Grid2 size={3}><Input size='small' fullWidth name='salaryMax' label='Max. Salary' type='number' /></Grid2>

            <Grid2 size={3}><Date textFieldProps={{ size: 'small' }} name='dateCreatedStart' label='Created After' /></Grid2>
            <Grid2 size={3}><Date textFieldProps={{ size: 'small' }} name='dateCreatedEnd' label='Created Before' /></Grid2>
            <Grid2 size={3}><Date textFieldProps={{ size: 'small' }} name='dateAppliedStart' label='Applied After' /></Grid2>
            <Grid2 size={3}><Date textFieldProps={{ size: 'small' }} name='dateAppliedEnd' label='Applied Before' /></Grid2>

            <Grid2 size={3}>
              <FormControl fullWidth size="small">
                <InputLabel shrink>Priority</InputLabel>
                <Select 
                  name='priority'
                  label="Priority"
                  defaultValue="default"
                  sx={{ backgroundColor: '#fff' }}
                  {...TEXTFIELD_SELECT_SLOT_PROPS.select}
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
                  {...TEXTFIELD_SELECT_SLOT_PROPS.select}
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
        <Grid2 container mt={2} >
          <Grid2 size={12}>
            <TextField
              label='Chart Type'
              select
              value={chartType}
              onChange={({ target: { value } }) => setChartType(value)}
              sx={{
              }}
              fullWidth
              slotProps={TEXTFIELD_SELECT_SLOT_PROPS}
            >
              { Object.values(ChartTypes).map((type, index) =>
                <MenuItem value={type} key={index}>{ fromEnumValue(type) }</MenuItem>
              ) }
            </TextField>
          </Grid2>
        </Grid2>
      </Box>

      <Box width='100%' minHeight={height}>
        { form.formState.isSubmitting ? <LinearProgress/> : <DatavizCharts data={selectedData} type={chartType} height={height} /> }
        
      </Box>

    </ContentContainer>
  </PageContainer>
}

export default DatavizView