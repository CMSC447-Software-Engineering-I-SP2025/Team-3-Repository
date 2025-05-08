// src/components/login/view.jsx
'use client';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, TextField, Typography, Container, Box, IconButton, Link, CircularProgress, Alert, AlertTitle } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useSessionStorage } from '@/utils/hooks';
import { useRouter } from 'next/navigation';
import { HeaderValues } from '@/constants';
import PageContainer from '@/components/PageContainer';
import ContentContainer from '@/components/ContentContainer';

const LoginView = ({ action }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginErrors, setLoginErrors] = useState([])
  const [session, setSessionStorage] = useSessionStorage(HeaderValues.TOKEN)
  const router = useRouter()
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = async (data) => {
    // Call the server action passed from page.jsx
    const result = await action(data);
    if (result.success && result.data) {
      setSessionStorage(result.data)
      router.replace('/')
      return
    }

    setLoginErrors([result?.error ?? ''])

  };

  useEffect(() => {
    const token = sessionStorage.getItem(HeaderValues.TOKEN)
    if (token) {
      router.push('/')      
      return
    }
  }, [])

  return (
    <PageContainer>
      <ContentContainer>
        { loginErrors && loginErrors?.length > 0 ?
          <Box width='100%' >
            <Alert severity='error'>
              <Typography>Unable to login. Are your credentials correct?</Typography>
            </Alert>
          </Box>
        : null }
        <Box sx={{ width: '100%', mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Login
          </Typography>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ width: '100%' }}>
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              margin="normal"
              {...register('username', { required: 'Username is required' })}
              error={!!errors.username}
              helperText={errors.username?.message}
              disabled={isSubmitting}
            />
            <Box sx={{ position: 'relative' }}>
              <TextField
                label="Password"
                type={showPassword ? 'text' : 'password'}
                variant="outlined"
                fullWidth
                margin="normal"
                {...register('password', { required: 'Password is required' })}
                error={!!errors.password}
                helperText={errors.password?.message}
                disabled={isSubmitting}
              />
              <IconButton
                onClick={() => setShowPassword(!showPassword)}
                sx={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)' }}
              >
                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </IconButton>
            </Box>
            <Link
              href="/reset-password"
              underline="hover"
              sx={{ display: 'block', mt: 1, textAlign: 'right', fontFamily: 'Roboto Mono, monospace' }}
            >
              Forgot Password?
            </Link>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: 50
              }}
            >
              {
                isSubmitting ?
                <CircularProgress/>
                :
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mt: 2 }}
                  disabled={isSubmitting}
                >
                  Log In
                </Button>
              }
            </Box>
          </Box>
        </Box>
      </ContentContainer>
    </PageContainer>
  );
};

export default LoginView;