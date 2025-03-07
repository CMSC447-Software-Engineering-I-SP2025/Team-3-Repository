'use client'
import { Grid2, Card, CardContent, Typography, Divider, Chip, Box } from '@mui/material';

export default function ProfilePage( {user} ) {
  return (
    <Box sx={{ maxWidth: 600, margin: 'auto', padding: 3}}>
      <Card elevation={3} sx={{ borderRadius: 3, backgroundColor: 'white'}}>
        <CardContent>
         
          <Typography variant="h4" component="h1" gutterBottom sx={{ color: 'black', fontWeight: 'bold' }}>
            User Profile
          </Typography>
          <Divider sx={{ mb: 3 }} />

          <Grid2 container spacing={2} direction="column">
            <Grid2 item>
              <Typography variant="h5" component="span" sx={{ fontWeight: 'medium', color: '#555' }}>
                Username:
              </Typography>
              <Typography variant="h6" component="span" sx={{ marginLeft: 1, color: '#212121' }}>
                {user.username}
              </Typography>
            </Grid2>

            <Grid2 item>
              <Typography variant="h5" component="span" sx={{ fontWeight: 'medium', color: '#555' }}>
                First Name:
              </Typography>
              <Typography variant="h6" component="span" sx={{ marginLeft: 1, color: '#212121' }}>
                {user.firstName}
              </Typography>
            </Grid2>

            <Grid2 item>
              <Typography variant="h5" component="span" sx={{ fontWeight: 'medium', color: '#555' }}>
                Last Name:
              </Typography>
              <Typography variant="h6" component="span" sx={{ marginLeft: 1, color: '#212121' }}>
                {user.lastName}
              </Typography>
            </Grid2>

            <Grid2 item>
              <Typography variant="h5" component="span" sx={{ fontWeight: 'medium', color: '#555' }}>
                Email:
              </Typography>
              <Typography variant="h6" component="span" sx={{ marginLeft: 1, color: '#212121' }}>
                {user.email}
              </Typography>
            </Grid2>

            <Grid2 item sx={{display: 'flex', alignItems: 'center'}} >
              <Typography variant="h5" component="span" sx={{ fontWeight: 'medium', color: '#555' }}>
                Skills:
              </Typography>
              <Box sx={{ marginTop: 1.5}}>
                {user.skills.map((skill, index) => (
                  <Chip
                    key={index}
                    label={skill}
                    sx={{
                      marginRight: 1,
                      marginBottom: 1,
                      backgroundColor: '#e0f2fe',
                      color: '#0d47a1',
                      fontWeight: 'medium',
                    }}
                  />
                ))}
              </Box>
            </Grid2>
          </Grid2>
        </CardContent>
      </Card>
    </Box>
  );
}