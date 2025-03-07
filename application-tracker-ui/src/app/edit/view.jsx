'use client'
import { Grid2, Card, CardContent, Typography, Divider, Chip, Box, TextField, Button } from '@mui/material';
import { useState } from 'react';

export default function EditPage({ user }) {
  const [skills, setSkills] = useState(user.skills);
  const [newSkill, setNewSkill] = useState('');

  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const handleDeleteSkill = (skillToDelete) => {
    setSkills(skills.filter((skill) => skill !== skillToDelete));
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleAddSkill();
    }
  };

  return (
    <Box sx={{ maxWidth: 500, margin: 'auto', padding: 2 }}>
      <Card elevation={2} sx={{ borderRadius: 2, backgroundColor: 'white' }}>
        <CardContent sx={{ p: 2 }}>
          <Typography 
            variant="h5" 
            component="h1" 
            sx={{ 
              color: 'black', 
              fontWeight: 600,
              mb: 1.5 
            }}
          >
            Edit Profile
          </Typography>
          <Divider sx={{ mb: 2 }} />

          <Grid2 container spacing={1.5} direction="column">
            <Grid2 container spacing={1} alignItems="center">
              <Grid2 xs={3}>
                <Typography 
                  variant="body2" 
                  sx={{ fontWeight: 500, color: '#555' }}
                >
                  Username:
                </Typography>
              </Grid2>
              <Grid2 xs={9}>
                <Typography 
                  variant="body1" 
                  sx={{ color: '#212121' }}
                >
                  {user.username}
                </Typography>
              </Grid2>
            </Grid2>

            <Grid2 container spacing={1} alignItems="center">
              <Grid2 xs={3}>
                <Typography 
                  variant="body2" 
                  sx={{ fontWeight: 500, color: '#555' }}
                >
                  Password:
                </Typography>
              </Grid2>
              <Grid2 xs={9}>
                <Typography 
                  variant="body1" 
                  sx={{ color: '#212121' }}
                >
                  {user.password}
                </Typography>
              </Grid2>
            </Grid2>

            <Grid2 container spacing={1} alignItems="center">
              <Grid2 xs={3}>
                <Typography 
                  variant="body2" 
                  sx={{ fontWeight: 500, color: '#555' }}
                >
                  First Name:
                </Typography>
              </Grid2>
              <Grid2 xs={9}>
                <TextField
                  variant="outlined"
                  defaultValue={user.firstName}
                  size="small"
                  fullWidth
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 1,
                      height: 32,
                      '& input': {
                        padding: '0 8px',
                        fontSize: '0.875rem'
                      }
                    }
                  }}
                />
              </Grid2>
            </Grid2>

            <Grid2 container spacing={1} alignItems="center">
              <Grid2 xs={3}>
                <Typography 
                  variant="body2" 
                  sx={{ fontWeight: 500, color: '#555' }}
                >
                  Last Name:
                </Typography>
              </Grid2>
              <Grid2 xs={9}>
                <TextField
                  variant="outlined"
                  defaultValue={user.lastName}
                  size="small"
                  fullWidth
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 1,
                      height: 32,
                      '& input': {
                        padding: '0 8px',
                        fontSize: '0.875rem'
                      }
                    }
                  }}
                />
              </Grid2>
            </Grid2>

            <Grid2 container spacing={1} alignItems="center">
              <Grid2 xs={3}>
                <Typography 
                  variant="body2" 
                  sx={{ fontWeight: 500, color: '#555' }}
                >
                  Email:
                </Typography>
              </Grid2>
              <Grid2 xs={9}>
                <TextField
                  variant="outlined"
                  defaultValue={user.email}
                  size="small"
                  fullWidth
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 1,
                      height: 32,
                      '& input': {
                        padding: '0 8px',
                        fontSize: '0.875rem'
                      }
                    }
                  }}
                />
              </Grid2>
            </Grid2>

            <Grid2 container spacing={1}>
              <Grid2 xs={3}>
                <Typography 
                  variant="body2" 
                  sx={{ fontWeight: 500, color: '#555', mt: 0.5 }}
                >
                  Skills:
                </Typography>
              </Grid2>
              <Grid2 xs={9}>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 1 }}>
                  {skills.map((skill, index) => (
                    <Chip
                      key={index}
                      label={skill}
                      onDelete={() => handleDeleteSkill(skill)}
                      size="small"
                      sx={{
                        backgroundColor: '#e0f2fe',
                        color: '#0d47a1',
                        fontSize: '0.75rem',
                        height: 24,
                        '& .MuiChip-label': {
                          padding: '0 8px'
                        }
                      }}
                    />
                  ))}
                </Box>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <TextField
                    variant="outlined"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Add a skill"
                    size="small"
                    sx={{
                      flex: 1,
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 1,
                        height: 32,
                        '& input': {
                          padding: '0 8px',
                          fontSize: '0.875rem'
                        }
                      }
                    }}
                  />
                  <Button
                    variant="contained"
                    onClick={handleAddSkill}
                    size="small"
                    sx={{
                      height: 32,
                      minWidth: 80,
                      backgroundColor: '#0d47a1',
                      '&:hover': { backgroundColor: '#1565c0' },
                      fontSize: '0.875rem',
                      textTransform: 'none'
                    }}
                  >
                    Add
                  </Button>
                </Box>
              </Grid2>
            </Grid2>
          </Grid2>
        </CardContent>
      </Card>
    </Box>
  );
}