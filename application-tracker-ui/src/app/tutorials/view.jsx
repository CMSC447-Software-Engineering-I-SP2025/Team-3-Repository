'use client';

import { Typography, Container, Box, Divider } from '@mui/material';

export default function TutorialView() {
    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold', color: theme => theme.palette.darkPurple }}>
                Tutorials:
            </Typography>

            <Box sx={{ mt: 4 }}>
                <Typography variant="h5" sx={{ color: theme => theme.palette.darkPurple, fontWeight: 'bold', mb: 2 }}>
                    How do I create a new application?
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {[
                        'Navigate to the "Applications" tab using the left sidebar.',
                        'Click on the purple "Create" button at the top right of the screen.',
                        'Fill out all fields in the box.',
                        'Click the save button at the bottom',
                        'Your new application will now be on the applications page, and will appear in visualizations/metrics.'
                    ].map((step, index) => (
                        <Box
                            key={index}
                            sx={{
                                borderLeft: theme => `5px solid ${theme.palette.darkPurple}`,
                                backgroundColor: theme => theme.palette.lightPurple,
                                color: 'white',
                                padding: 2,
                                borderRadius: 1,
                                boxShadow: 2
                            }}
                        >
                            <Typography variant="body1">
                                <strong>Step {index + 1}:</strong> {step}
                            </Typography>
                        </Box>
                    ))}
                </Box>
            </Box>

            <Divider sx={{ my: 5 }} />

            <Box sx={{ mt: 4 }}>
                <Typography variant="h5" sx={{ color: theme => theme.palette.darkPurple, fontWeight: 'bold', mb: 2 }}>
                    How do I edit an existing application?
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {[
                        'Navigate to the "Applications" tab using the left sidebar.',
                        'Find the application you want to edit and click the purple "EDIT" button.',
                        'Update any fields you want to change. (note: some fields are static by design and cannot be changed)',
                        'Click "UPDATE" at the bottom to apply changes.'
                    ].map((step, index) => (
                        <Box
                            key={index}
                            sx={{
                                borderLeft: theme => `5px solid ${theme.palette.darkPurple}`,
                                backgroundColor: theme => theme.palette.lightPurple,
                                color: 'white',
                                padding: 2,
                                borderRadius: 1,
                                boxShadow: 2
                            }}
                        >
                            <Typography variant="body1">
                                <strong>Step {index + 1}:</strong> {step}
                            </Typography>
                        </Box>
                    ))}
                </Box>
            </Box>

            <Divider sx={{ my: 5 }} />

            <Box sx={{ mt: 4 }}>
                <Typography variant="h5" sx={{ color: theme => theme.palette.darkPurple, fontWeight: 'bold', mb: 2 }}>
                    How do I delete an application?
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {[
                        'Navigate to the "Applications" tab using the left sidebar.',
                        'Find the application you want to delete and click the red "DELETE" button on the right.',
                        'Confirm your deletion of the application',
                        'Deletion will be reflected on the applications page, and the application will no longer appear in visualizations/metrics. '
                    ].map((step, index) => (
                        <Box
                            key={index}
                            sx={{
                                borderLeft: theme => `5px solid ${theme.palette.darkPurple}`,
                                backgroundColor: theme => theme.palette.lightPurple,
                                color: 'white',
                                padding: 2,
                                borderRadius: 1,
                                boxShadow: 2
                            }}
                        >
                            <Typography variant="body1">
                                <strong>Step {index + 1}:</strong> {step}
                            </Typography>
                        </Box>
                    ))}
                </Box>
            </Box>
        </Container>
    );
}