'use client'

import PageContainer from "@/components/PageContainer";
import { Alert, AlertTitle, Divider, Grid2, Typography, IconButton, InputAdornment } from "@mui/material";
import { useForm } from "react-hook-form";
import * as Yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "@/components/Input";
import Form from "@/components/Form";
import SubmitButton from "@/components/SubmitButton";
import { useState } from "react";
import Link from "next/link";
import { ArrowForward, Visibility, VisibilityOff } from "@mui/icons-material";

const validationSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  email: Yup.string()
    .email('Must be a valid email')
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Please confirm your password'),
  firstName: Yup.string().required('Required'),
  lastName: Yup.string().required('Required')
});

const BodyContent = ({ state, form, submitFunction = () => {} }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

  if (state && state?.response) {
    if (state?.response?.status === 200) {
      return (
        <Grid2 size={12}>
          <Alert severity="success">
            <AlertTitle>Registration Successful!</AlertTitle>
            <Link href="/user/login" style={{ textDecoration: 'none' }}>
              <Typography
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  color: 'darkPurple',
                  textDecoration: '1px solid underline'
                }}
              >
                Proceed to Login
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
          <AlertTitle>Registration Failed</AlertTitle>
          {state?.response?.error || 'Please try again later.'}
        </Alert>
      </Grid2>
    )
  }

  return (
    <Form methods={form} onSubmit={form.handleSubmit(submitFunction)} style={{ width: '100%' }}>
      <Grid2 container spacing={1}>
        <Grid2 size={12}>
          <Input fullWidth name="firstName" label="First Name" />
        </Grid2>
        <Grid2 size={12}>
          <Input fullWidth name="lastName" label="Last Name" />
        </Grid2>
        <Grid2 size={12}>
          <Input fullWidth name="username" label="Username" />
        </Grid2>
        <Grid2 size={12}>
          <Input fullWidth name="email" label="Email Address" type="email" />
        </Grid2>
        <Grid2 size={12}>
          <Input
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
        </Grid2>
        <Grid2 size={12}>
          <Input
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type={showConfirmPassword ? 'text' : 'password'}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowConfirmPassword}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
        </Grid2>
        <Grid2 size={12} display="flex" justifyContent="flex-end">
          <SubmitButton text="Register" />
        </Grid2>
      </Grid2>
    </Form>
  )
}

const UserRegistrationView = ({ handleRegistration = async () => {} }) => {
  const [state, setState] = useState({ response: null });

  const form = useForm({
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: ''
    },
    resolver: yupResolver(validationSchema)
  });

  const submitFunction = async (formData) => {
    const obj = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      username: formData.username,
      email: formData.email,
      password: formData.password
    }
    const apiResponse = await handleRegistration(obj);
    setState({ response: apiResponse });
  };

  return (
    <PageContainer>
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
            Create Your Account
          </Typography>
          <Divider />
        </Grid2>
        <BodyContent form={form} state={state} submitFunction={submitFunction} />
      </Grid2>
    </PageContainer>
  )
}

export default UserRegistrationView