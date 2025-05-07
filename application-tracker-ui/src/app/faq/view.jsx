'use client';

import { Typography, Container, Box } from '@mui/material';

export default function FAQView() {
    return (
        <Container maxWidth="md" sx={{ mt: 4, textAlign: 'center' }}>
            <Typography variant="h4" gutterBottom sx={{ color: theme => theme.palette.darkPurple, fontWeight: 'bold' }}>
                Frequently Asked Questions:
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box
                    sx={{
                        border: '1px solid #ddd',
                        padding: 2,
                        borderRadius: 2,
                        boxShadow: 2,
                    }}
                >
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        Will I be charged for using this App? How much does it cost?
                    </Typography>
                    <Typography sx={{ backgroundColor: theme => theme.palette.lightPurple, color: 'white', padding: 2 }}>
                        No, this application is 100% free and is made as a companion tool for job seekers.
                    </Typography>
                </Box>

                <Box
                    sx={{
                        border: '1px solid #ddd',
                        padding: 2,
                        borderRadius: 2,
                        boxShadow: 2,
                    }}
                >
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        Is there any way I can donate to the site?
                    </Typography>
                    <Typography sx={{ backgroundColor: theme => theme.palette.lightPurple, color: 'white', padding: 2 }}>
                        At this time, there is no way to donate.
                    </Typography>
                </Box>

                <Box
                    sx={{
                        border: '1px solid #ddd',
                        padding: 2,
                        borderRadius: 2,
                        boxShadow: 2,
                    }}
                >
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        Does this tracker incorporate LLMs?
                    </Typography>
                    <Typography sx={{ backgroundColor: theme => theme.palette.lightPurple, color: 'white', padding: 2 }}>
                        No.
                    </Typography>
                </Box>

                <Box
                    sx={{
                        border: '1px solid #ddd',
                        padding: 2,
                        borderRadius: 2,
                        boxShadow: 2,
                    }}
                >
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        Can I use this application to track jobs in any industry?
                    </Typography>
                    <Typography sx={{ backgroundColor: theme => theme.palette.lightPurple, color: 'white', padding: 2 }}>
                        Yes, this application is designed to work with apps across all industries.
                    </Typography>
                </Box>

                <Box
                    sx={{
                        border: '1px solid #ddd',
                        padding: 2,
                        borderRadius: 2,
                        boxShadow: 2,
                    }}
                >
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        Can I use this application to track jobs in any industry?
                    </Typography>
                    <Typography sx={{ backgroundColor: theme => theme.palette.lightPurple, color: 'white', padding: 2 }}>
                        Yes, this application is designed to work with apps across all industries.
                    </Typography>
                </Box>

                <Box
                    sx={{
                        border: '1px solid #ddd',
                        padding: 2,
                        borderRadius: 2,
                        boxShadow: 2,
                    }}
                >
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        I forgot my password, how can I log in?
                    </Typography>
                    <Typography sx={{ backgroundColor: theme => theme.palette.lightPurple, color: 'white', padding: 2 }}>
                        Under your login information,
                        click the “forgot password”
                        button and you will be redirected
                        to input your email address to
                        have the password reset.
                    </Typography>
                </Box>

                <Box
                    sx={{
                        border: '1px solid #ddd',
                        padding: 2,
                        borderRadius: 2,
                        boxShadow: 2,
                    }}
                >
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        I cannot remember my username,
                        what do I do?
                    </Typography>
                    <Typography sx={{ backgroundColor: theme => theme.palette.lightPurple, color: 'white', padding: 2 }}>
                        Click the “forgot password”
                        button and follow the prompts.
                    </Typography>
                </Box>

                <Box
                    sx={{
                        border: '1px solid #ddd',
                        padding: 2,
                        borderRadius: 2,
                        boxShadow: 2,
                    }}
                >
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        Do the charts on the dashboard
                        automatically reset or are they
                        there indefinitely?
                    </Typography>
                    <Typography sx={{ backgroundColor: theme => theme.palette.lightPurple, color: 'white', padding: 2 }}>
                        The tracker will never
                        automatically delete any
                        applications until you do so
                        manually.
                    </Typography>
                </Box>

                <Box
                    sx={{
                        border: '1px solid #ddd',
                        padding: 2,
                        borderRadius: 2,
                        boxShadow: 2,
                    }}
                >
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        How do I navigate away from the
                        dashboard
                    </Typography>
                    <Typography sx={{ backgroundColor: theme => theme.palette.lightPurple, color: 'white', padding: 2 }}>
                        Use the navigation panel to the
                        left.
                    </Typography>
                </Box>

                <Box
                    sx={{
                        border: '1px solid #ddd',
                        padding: 2,
                        borderRadius: 2,
                        boxShadow: 2,
                    }}
                >
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        Can I get back a deleted
                        account?
                    </Typography>
                    <Typography sx={{ backgroundColor: theme => theme.palette.lightPurple, color: 'white', padding: 2 }}>
                        No, once an account is deleted,
                        the action is permanent.
                    </Typography>
                </Box>

                <Box
                    sx={{
                        border: '1px solid #ddd',
                        padding: 2,
                        borderRadius: 2,
                        boxShadow: 2,
                    }}
                >
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        How do I edit my information?
                    </Typography>
                    <Typography sx={{ backgroundColor: theme => theme.palette.lightPurple, color: 'white', padding: 2 }}>
                        Click on the “EDIT ACCOUNT”
                        button on your user profile.
                    </Typography>
                </Box>

                <Box
                    sx={{
                        border: '1px solid #ddd',
                        padding: 2,
                        borderRadius: 2,
                        boxShadow: 2,
                    }}
                >
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        Why are some fields unable to be
                        modified?
                    </Typography>
                    <Typography sx={{ backgroundColor: theme => theme.palette.lightPurple, color: 'white', padding: 2 }}>
                        This is by design, these values
                        should not be changed.
                    </Typography>
                </Box>

                <Box
                    sx={{
                        border: '1px solid #ddd',
                        padding: 2,
                        borderRadius: 2,
                        boxShadow: 2,
                    }}
                >
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        What is the priority field used for?
                    </Typography>
                    <Typography sx={{ backgroundColor: theme => theme.palette.lightPurple, color: 'white', padding: 2 }}>
                        It can be utilized by the user to
                        mark applications by
                        importance.
                    </Typography>
                </Box>

                <Box
                    sx={{
                        border: '1px solid #ddd',
                        padding: 2,
                        borderRadius: 2,
                        boxShadow: 2,
                    }}
                >
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        Can I delete applications?
                    </Typography>
                    <Typography sx={{ backgroundColor: theme => theme.palette.lightPurple, color: 'white', padding: 2 }}>
                        Yes, go to the applications page
                        and click the delete button.
                    </Typography>
                </Box>


            </Box>
        </Container>
    );
}