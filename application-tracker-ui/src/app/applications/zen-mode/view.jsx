'use client'

import { Alert, AlertTitle, Box, Divider, Grid2, Typography, MenuItem } from "@mui/material"
import { useForm } from "react-hook-form"
import * as Yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup"
import Input from "@/components/Input"
import Form from "@/components/Form"
import SubmitButton from "@/components/SubmitButton"
import { useState } from "react"
import Link from "next/link"
import { ArrowForward } from "@mui/icons-material"
import Select from "@/components/Select"
import { AppPriority, AppStatus } from "@/constants"
import { fromEnumValue } from "@/utils/enumUtils"

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Required'),
  link: Yup.string().url('Must be a valid URL').required('Required'),
  salaryMin: Yup.number().required('Required'),
  salaryMax: Yup.number().required('Required'),
  keywords: Yup.string().required('Required'),
  employer: Yup.string().required('Required'),
  status: Yup.string().required('Required').oneOf(Object.values(AppStatus)),
  priority: Yup.string().required('Required').oneOf(Object.values(AppPriority))
})

const ZenModeView = () => {
  const totalApplications = 5
  const [currentApplication, setCurrentApplication] = useState(1)

  const form = useForm({
    defaultValues: {
      title: '',
      link: '',
      salaryMin: '',
      salaryMax: '',
      keywords: '',
      employer: '',
      status: AppStatus.IN_PROGRESS,
      priority: AppPriority.LOW
    },
    resolver: yupResolver(validationSchema)
  })

  const submitFunction = async formData => {
    // fake api working
    const apiResponse = { status: 200 }

    if (apiResponse.status === 200) {
      if (currentApplication <= totalApplications) {
        setCurrentApplication(currentApplication + 1)
        form.reset()
      }
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        p: 2
      }}
    >
      <Grid2
        container
        sx={{
          backgroundColor: 'white',
          maxWidth: 600,
          width: '100%',
          borderRadius: 2,
          boxShadow: 3,
          p: 2
        }}
        spacing={2}
      >
        <Grid2 size={12}>
          <Typography variant="h5" fontWeight="bold">
            Create Job Application (
            {currentApplication > totalApplications
              ? currentApplication - 1
              : currentApplication} of {totalApplications})
          </Typography>
          <Divider sx={{ my: 1 }} />
        </Grid2>
        <Grid2 size={12}>
          {currentApplication > totalApplications ? (
            <Alert severity="success">
              <AlertTitle>Success!</AlertTitle>
              All {totalApplications} job applications submitted.
              <Link href="/applications/view" style={{ textDecoration: 'none' }}>
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
              </Link>
            </Alert>
          ) : (
              <Form methods={form} onSubmit={form.handleSubmit(submitFunction)} style={{ width: '100%' }}>
                <Grid2 container spacing={1}>
                  <Grid2 size={12}>
                    <Input fullWidth name="title" label="Job Title" />
                  </Grid2>
                  <Grid2 size={12}>
                    <Input fullWidth name="link" label="Job Posting Link" />
                  </Grid2>
                  <Grid2 size={12}>
                    <Input type="number" fullWidth name="salaryMin" label="Min Salary" />
                  </Grid2>
                  <Grid2 size={12}>
                    <Input type="number" fullWidth name="salaryMax" label="Max Salary" />
                  </Grid2>
                  <Grid2 size={12}>
                    <Input fullWidth name="keywords" label="Keywords/Skills" />
                  </Grid2>
                  <Grid2 size={12}>
                    <Input fullWidth name="employer" label="Employer" />
                  </Grid2>
                  <Grid2 size={12}>
                    <Select name="status" label="Status">
                      {Object.values(AppStatus).map(option => (
                        <MenuItem key={option} value={option}>
                          {fromEnumValue(option)}
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid2>
                  <Grid2 size={12}>
                    <Select name="priority" label="Priority">
                      {Object.values(AppPriority).map(option => (
                        <MenuItem key={option} value={option}>
                          {fromEnumValue(option)}
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid2>
                  <Grid2 size={12} display="flex" justifyContent="flex-end">
                    <SubmitButton text={`Create Application`} />
                  </Grid2>
                </Grid2>
              </Form>
          )}
        </Grid2>
      </Grid2>
    </Box>
  )
}

export default ZenModeView