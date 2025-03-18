'use client'
import PageContainer from "@/components/PageContainer"
import { Alert, AlertTitle, Box, Button, Divider, Grid2, TextField, Typography } from "@mui/material"
import { useForm } from "react-hook-form"
import *  as Yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup"
import Input from "@/components/Input"
import Form from "@/components/Form"
import SubmitButton from "@/components/SubmitButton"
import { useState } from "react"
import Link from "next/link"
import { ArrowForward } from "@mui/icons-material"

const BodyContent = ({ state, form, submitFunction = () => {} }) => {
  if (state && state?.response) {
    if (state?.response?.status && state?.response?.status === 200) {
      return <Grid2 size={12}>
        <Alert severity='success' >
          <AlertTitle>Nice, You're Registered!</AlertTitle>
          <Link href='/user/login' style={{ textDecoration: 'none' }} >
            <Typography
              sx={{
                display: 'flex',
                alignItems: 'center',
                color: 'darkPurple',
                textDecoration: '1px solid underline'
              }}
            >
              Get Logged In
              <ArrowForward/>
            </Typography>
          </Link>
        </Alert>
      </Grid2>
    } 

    return <Grid2 size={12}>
      <Alert severity='error' >
        <AlertTitle>Something Went Wrong!</AlertTitle>
        <Typography>
          Please refresh the page and try again. Contact us if the issue persists.
        </Typography>
        { state?.response?.error ? <Typography>Error: {state?.response?.error}</Typography> : null }
      </Alert>
    </Grid2>
  }

  return <Form methods={form} onSubmit={form.handleSubmit(submitFunction)} style={{ width: '100%' }} >
    <Grid2 container spacing={1} >
      <Grid2 size={12}>
        <Input fullWidth name='firstName' label='First Name' />
      </Grid2>
      <Grid2 size={12}>
        <Input fullWidth name='lastName' label='Last Name' />
      </Grid2>
      <Grid2 size={12}>
        <Input fullWidth name='emailAddress' label='Email Address' />
      </Grid2>
      <Grid2 size={12}>
        <Input fullWidth name='username' label='Username' />
      </Grid2>
      <Grid2 size={12} display='flex' justifyContent='end' >
        <SubmitButton text='Register' />
      </Grid2>
    </Grid2>
  </Form>
}

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('Required'),
  lastName: Yup.string().required('Required'),
  emailAddress: Yup.string().email('Must be a valid email').required('Required'),
  username: Yup.string().required('Required')
})

const RegistrationView = ({
  handleRegistration = async() => {} 
}) => {
  const [state, setState] = useState({ response: null })

  const form = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      emailAddress: '',
      username: ''
    },
    resolver: yupResolver(validationSchema)
  })

  const submitFunction = async formData => {
    const apiResponse = await handleRegistration(formData)
    setState({ response: apiResponse })
  }

  return <PageContainer>
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
        <Typography fontSize='1.5rem' fontWeight='bold'>Lets Get Started!</Typography>
        <Divider/>
      </Grid2>
      <BodyContent form={form} state={state} submitFunction={submitFunction} />
    </Grid2>
  </PageContainer>
}

export default RegistrationView