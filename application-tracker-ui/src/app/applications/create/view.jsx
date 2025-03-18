'use client'

import PageContainer from "@/components/PageContainer"
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
import { DateTime } from "luxon"

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Required'),
  link: Yup.string().url('Must be a valid URL').required('Required'),
  salary: Yup.string().required('Required'),
  keywords: Yup.string().required('Required'),
  employer: Yup.string().required('Required'),
  status: Yup.string().required('Required').oneOf(Object.values(AppStatus)),
  priority: Yup.string().required('Required').oneOf(Object.values(AppPriority))
})

const BodyContent = ({ state, form, submitFunction = () => {} }) => {
  if (state && state?.response) {
    if (state?.response?.status === 200) {
      return (
        <Grid2 size={12}>
          <Alert severity="success">
            <AlertTitle>Success!</AlertTitle>
            Job application created successfully.
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
        </Grid2>
      )
    }

    return (
      <Grid2 size={12}>
        <Alert severity="error">
          <AlertTitle>Error!</AlertTitle>
          {state.response.error}
        </Alert>
      </Grid2>
    )
  }

  return (
    <Form methods={form} onSubmit={form.handleSubmit(submitFunction)} style={{ width: '100%' }}>
      <Grid2 container spacing={1}>
        <Grid2 size={12}>
          <Input fullWidth name="title" label="Job Title" />
        </Grid2>
        <Grid2 size={12}>
          <Input fullWidth name="link" label="Job Posting Link" />
        </Grid2>
        <Grid2 size={12}>
          <Input fullWidth name="salary" label="Salary Range" />
        </Grid2>
        <Grid2 size={12}>
          <Input fullWidth name="keywords" label="Keywords/Skills" />
        </Grid2>
        <Grid2 size={12}>
          <Input fullWidth name="employer" label="Employer" />
        </Grid2>
        <Grid2 size={12}>
          <Select
            name="status"
            label="Status"
          >
            {Object.values(AppStatus).map(option => (
              <MenuItem
                key={option}
                value={option}
              >
                {fromEnumValue(option)}
              </MenuItem>
            ))}
          </Select>
        </Grid2>
        <Grid2 size={12}>
          <Select
            name="priority"
            label="Priority"
          >
            {Object.values(AppPriority).map(option => (
              <MenuItem
                key={option}
                value={option}
              >
                {fromEnumValue(option)}
              </MenuItem>
            ))}
          </Select>
        </Grid2>
        <Grid2 size={12} display="flex" justifyContent="flex-end">
          <SubmitButton text="Create Application" />
        </Grid2>
      </Grid2>
    </Form>
  )
}

const ApplicationCreateView = ({ handleCreateApplication }) => {
  const [state, setState] = useState({ response: null })

  const form = useForm({
    defaultValues: {
      title: '',
      link: '',
      salary: '',
      keywords: '',
      employer: '',
      status: AppStatus.IN_PROGRESS,
      priority: AppPriority.LOW
    },
    resolver: yupResolver(validationSchema)
  })

  const submitFunction = async formData => {
    const commaDelimedKeywords = formData.keywords.split(',')

    // will fix when login works
    const newValues = {
      ...formData,
      keywords: commaDelimedKeywords,
      userId: '67d8506f9c0d6b3246eed5ba',
      dateCreated: DateTime.now().toISODate(),
      dateApplied: formData.status === AppStatus.SUBMITTED ? DateTime.now().toISODate() : null
    }

    const apiResponse = await handleCreateApplication(newValues)
    setState({ response: apiResponse })
  }

  return (
    <PageContainer
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Grid2
        container
        sx={{
          backgroundColor: 'white',
          maxWidth: 600,
          width: '100%',
          height: '100%',
          minHeight: 200,
          borderRadius: 2,
          filter: theme => `drop-shadow(0px 10px 5px ${theme.palette.shadow})`,
          padding: 2
        }}
        spacing={2}
      >
        <Grid2 size={12}>
          <Typography fontSize="1.5rem" fontWeight="bold">
            Create Job Application
          </Typography>
          <Divider />
        </Grid2>
        <BodyContent form={form} state={state} submitFunction={submitFunction} />
      </Grid2>
    </PageContainer>
  )
}

export default ApplicationCreateView