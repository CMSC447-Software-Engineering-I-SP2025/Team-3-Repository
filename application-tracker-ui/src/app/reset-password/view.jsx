// src/components/change-password/view.jsx
'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, TextField, Typography, Container, Box, IconButton, Grid2, Alert } from '@mui/material';
import { useRouter } from 'next/navigation';
import Input from '@/components/Input';
import Form from '@/components/Form';
import ContentContainer from '@/components/ContentContainer';
import PageContainer from '@/components/PageContainer';

const ChangePasswordView = ({ action }) => {
  const form = useForm({
    defaultValues: {
      username: '',
      email: ''
    },
  });

  const [state, setState] = useState({ errors: null })

  const router = useRouter()

  const onSubmit = async (data) => {
    const result = await action(data)
    if (result.status === 200) { 
      setState({ errors: null, success: true })
      return
    }

    setState({ errors: 'Unable to initiate recovery. Are your credentials incorrect?' })
  };

  return (
    <PageContainer>
      <ContentContainer>
          { state?.errors && <Grid2  width='100%' sx={{ mt: 2 }} container> <Alert sx={{ width: '100%' }} severity='error' >{state?.errors}</Alert> </Grid2> }
          { state?.success && <Grid2 width='100%' sx={{ mt: 2 }} container> <Alert sx={{ width: '100%' }} severity='success' >Recovery Initiated! You will get an email shortly.</Alert> </Grid2> }
          <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h4" component="h1" gutterBottom>
              Change Password
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Update your password below.
            </Typography>
            <Form methods={form} onSubmit={form.handleSubmit(onSubmit)}>
              <Grid2 container spacing={2}>
                <Grid2 size={12}>
                  <Input fullWidth name='username' label='Username' />
                </Grid2>
                <Grid2 size={12}>
                  <Input fullWidth name='email' label='Email' />
                </Grid2>
                <Grid2 size={12}>
                  <Button disabled={state?.success} type='submit' variant='contained' fullWidth sx={{ backgroundColor: 'lightPurple' }}>
                    Submit
                  </Button>
                </Grid2>
              </Grid2>
            </Form>
          </Box>
      </ContentContainer>

    </PageContainer>
  );
};

export default ChangePasswordView;