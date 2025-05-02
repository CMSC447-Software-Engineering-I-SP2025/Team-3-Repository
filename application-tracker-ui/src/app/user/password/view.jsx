'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, TextField, Typography, Container, Box, IconButton, Grid2, Alert } from '@mui/material';
import { useRouter } from 'next/navigation';
import Input from '@/components/Input';
import Form from '@/components/Form';
import ContentContainer from '@/components/ContentContainer';
import PageContainer from '@/components/PageContainer';
import Link from 'next/link';

const ResetPasswordView = ({ action, token, id: recoveryId }) => {
  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: ''
    },
  });

  const [state, setState] = useState({ errors: null })

  const onSubmit = async (data) => {
    const result = await action({
      ...data,
      recoveryId,
      token
    })

    if (result.status === 200) { 
      setState({ errors: null, success: true })
      return
    }

    setState({ errors: 'Unable to reset your password.' })
  };

  return (
    <PageContainer>
      <ContentContainer>
          { state?.errors && <Grid2  width='100%' sx={{ mt: 2 }} container> <Alert sx={{ width: '100%' }} severity='error' >{state?.errors}</Alert> </Grid2> }
          { state?.success && <Grid2 width='100%' sx={{ mt: 2 }} container> <Alert sx={{ width: '100%' }} severity='success' >Your password has been reset. Please go <Link href='/login' >login</Link></Alert> </Grid2> }
          <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h4" component="h1" gutterBottom>
              Reset Password
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Update your password below.
            </Typography>
            <Form methods={form} onSubmit={form.handleSubmit(onSubmit)}>
              <Grid2 container spacing={2}>
                <Grid2 size={12}>
                  <Input fullWidth name='email' label='Email' />
                </Grid2>
                <Grid2 size={12}>
                  <Input fullWidth name='password' label='New Password' />
                </Grid2>
                <Grid2 size={12}>
                  <Input fullWidth name='confirmPassword' label='Confirm Password' />
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

export default ResetPasswordView;