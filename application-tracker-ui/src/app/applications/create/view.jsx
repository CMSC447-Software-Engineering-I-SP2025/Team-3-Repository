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

const STATUS_OPTIONS = [
  { value: 'IN_PROGRESS', label: 'In Progress' },
  { value: 'SUBMITTED', label: 'Submitted' },
  { value: 'REJECTED', label: 'Rejected' },
  { value: 'ACCEPTED', label: 'Accepted' }
]

const PRIORITY_OPTIONS = [
  { value: 'LOW', label: 'Low' },
  { value: 'MEDIUM', label: 'Medium' },
  { value: 'HIGH', label: 'High' },
  { value: 'EXPEDITE', label: 'Expedite' }
]

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Required'),
  link: Yup.string().url('Must be a valid URL').required('Required'),
  salary: Yup.string().required('Required'),
  keywords: Yup.string().required('Required'),
  employer: Yup.string().required('Required'),
  status: Yup.string().required('Required').oneOf(STATUS_OPTIONS.map(option => option.value)),
  priority: Yup.string().required('Required').oneOf(PRIORITY_OPTIONS.map(option => option.value))
})

const BodyContent = ({ state, form, submitFunction = () => {} }) => {
  if (state && state?.response) {
    if (state?.response?.status === 200) {
      return (
        <Grid2 size={12}>
          <Alert severity="success">
            <AlertTitle>Success!</AlertTitle>
            Job application created successfully.
            <Link href="/applications" style={{ textDecoration: 'none' }}>
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
          <Input
            name="status"
            label="Status"
            fullWidth
            select
            MenuProps={{
              PaperProps: {
                sx: {
                  backgroundColor: '#ffffff !important', 
                  zIndex: 1300, 
                },
              },
            }}
          >
            {STATUS_OPTIONS.map(option => (
              <MenuItem
                key={option.value}
                value={option.value}
                sx={{
                  backgroundColor: '#ffffff !important', 
                  '&:hover': {
                    backgroundColor: '#f5f5f5 !important',
                  },
                }}
              >
                {option.label}
              </MenuItem>
            ))}
          </Input>
        </Grid2>
        <Grid2 size={12}>
          <Input
            name="priority"
            label="Priority"
            fullWidth
            select
            MenuProps={{
              PaperProps: {
                sx: {
                  backgroundColor: '#ffffff !important', 
                  zIndex: 1300, 
                },
              },
            }}
          >
            {PRIORITY_OPTIONS.map(option => (
              <MenuItem
                key={option.value}
                value={option.value}
                sx={{
                  backgroundColor: '#ffffff !important', 
                  '&:hover': {
                    backgroundColor: '#f5f5f5 !important', 
                  },
                }}
              >
                {option.label}
              </MenuItem>
            ))}
          </Input>
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
      status: 'IN_PROGRESS', 
      priority: 'LOW' 
    },
    resolver: yupResolver(validationSchema)
  })

  const submitFunction = async formData => {
    const apiResponse = await handleCreateApplication(formData)
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