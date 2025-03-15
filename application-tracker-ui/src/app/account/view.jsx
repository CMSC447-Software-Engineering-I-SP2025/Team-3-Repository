'use client'

import { useState } from 'react';
import { Grid, Card, CardContent, Typography, Divider, Chip, Box, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

export default function ProfilePage({ user }) {
	const [open, setOpen] = useState(false); // controls the confirmation dialog
	const [deleting, setDeleting] = useState(false); // tracks API request state
	const [errorMessage, setErrorMessage] = useState(''); // stores error message
	const [errorOpen, setErrorOpen] = useState(false); // controls error modal visibility

	// handle delete request and error handling
	const handleDelete = async () => {
		setDeleting(true);
		try {
			const response = await fetch(`/api/users/delete?id=${user._id}`, {
				method: 'DELETE',
			});

			if (response.ok) {
				alert("User deleted successfully!");
			} else {
				// show error modal if deletion fails
				setErrorMessage("Failed to delete user.");
				setErrorOpen(true);
			}
		} catch (error) {
			console.error("Error deleting user:", error);
			// show error modal if there's an error with the request
			setErrorMessage("An error occurred while trying to delete the user.");
			setErrorOpen(true);
		} finally {
			setDeleting(false);
			setOpen(false);
		}
	};

	return (
		<Box sx={{ maxWidth: 600, margin: 'auto', padding: 3 }}>
			<Card elevation={3} sx={{ borderRadius: 3, backgroundColor: 'white' }}>
				<CardContent>
					<Typography variant="h4" component="h1" gutterBottom sx={{ color: 'black', fontWeight: 'bold' }}>
						User Profile
					</Typography>
					<Divider sx={{ mb: 3 }} />

					<Grid container spacing={2} direction="column">
						<Grid item>
							<Typography variant="h5" component="span" sx={{ fontWeight: 'medium', color: '#555' }}>
								Username:
							</Typography>
							<Typography variant="h6" component="span" sx={{ marginLeft: 1, color: '#212121' }}>
								{user.username}
							</Typography>
						</Grid>

						<Grid item>
							<Typography variant="h5" component="span" sx={{ fontWeight: 'medium', color: '#555' }}>
								First Name:
							</Typography>
							<Typography variant="h6" component="span" sx={{ marginLeft: 1, color: '#212121' }}>
								{user.firstName}
							</Typography>
						</Grid>

						<Grid item>
							<Typography variant="h5" component="span" sx={{ fontWeight: 'medium', color: '#555' }}>
								Last Name:
							</Typography>
							<Typography variant="h6" component="span" sx={{ marginLeft: 1, color: '#212121' }}>
								{user.lastName}
							</Typography>
						</Grid>

						<Grid item>
							<Typography variant="h5" component="span" sx={{ fontWeight: 'medium', color: '#555' }}>
								Email:
							</Typography>
							<Typography variant="h6" component="span" sx={{ marginLeft: 1, color: '#212121' }}>
								{user.email}
							</Typography>
						</Grid>

						<Grid item sx={{ display: 'flex', alignItems: 'center' }}>
							<Typography variant="h5" component="span" sx={{ fontWeight: 'medium', color: '#555' }}>
								Skills:
							</Typography>
							<Box sx={{ marginTop: 1.5 }}>
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
						</Grid>

						{/* delete account button */}
						<Grid item>
							<Button
								variant="contained"
								color="error"
								onClick={() => setOpen(true)}
								sx={{ mt: 2 }}
							>
								Delete Account
							</Button>
						</Grid>
					</Grid>
				</CardContent>
			</Card>

			{/* delete confirm modal */}
			<Dialog open={open} onClose={() => setOpen(false)} sx={{ "& .MuiDialog-paper": { backgroundColor: 'white' } }}>
				<DialogTitle>Confirm Deletion</DialogTitle>
				<DialogContent>
					<Typography>Are you sure you want to delete your account?</Typography>
				</DialogContent>
				<DialogActions sx={{ justifyContent: "flex-start" }}>
					<Button onClick={() => setOpen(false)} color="primary">Cancel</Button>
					<Button onClick={handleDelete} color="error" variant="contained">
						Confirm
					</Button>
				</DialogActions>
			</Dialog>

			{/* error modal */}
			<Dialog open={errorOpen} onClose={() => setErrorOpen(false)} sx={{ "& .MuiDialog-paper": { backgroundColor: 'white' } }}>
				<DialogTitle>Error</DialogTitle>
				<DialogContent>
					<Typography>An error occurred. Please try again later.</Typography>
				</DialogContent>
				<DialogActions sx={{ justifyContent: "flex-start" }}>
					<Button onClick={() => setErrorOpen(false)} color="primary">Close</Button>
				</DialogActions>
			</Dialog>
		</Box>
	);
}
