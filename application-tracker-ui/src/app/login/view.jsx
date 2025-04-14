// src/components/login/view.jsx
'use client';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, TextField, Typography, Container, Box, IconButton, Link } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useSessionStorage } from '@/utils/hooks';
import { useRouter } from 'next/navigation';
import { HeaderValues } from '@/constants';

const LoginView = ({ action }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [session, setSessionStorage] = useSessionStorage(HeaderValues.TOKEN)
  const router = useRouter()
  const { register, handleSubmit, formState: { errors } } = useForm({
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
    }

    router.replace('/')
  };

  useEffect(() => {
    const token = sessionStorage.getItem(HeaderValues.TOKEN)
    if (token) {
      router.push('/')      
      return
    }
  }, [])

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Log In
          </Button>
		  
		  <Button
				href="/user/register"
				variant="outlined"
				fullWidth
				sx={{ mt: 1 }}
		  >
			Register
		  </Button>

        </Box>
      </Box>
    </Container>
  );
};

export default LoginView;