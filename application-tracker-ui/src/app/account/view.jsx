'use client'
import { useState } from 'react';
import { Grid, Card, CardContent, Typography, Divider, Chip, Box, Button, Modal, Box as MuiBox } from '@mui/material';

export default function ProfilePage({ user }) {
	const [open, setOpen] = useState(false);
	const [deleting, setDeleting] = useState(false);

	// delete confirmation
	const handleDelete = async () => {
		setDeleting(true);
		try {
			const response = await fetch(`/api/users/delete?id=${user._id}`, { method: 'DELETE' });

			if (response.ok) {
				alert("User deleted successfully.");
			} else {
				alert("Failed to delete user.");
			}
		} catch (error) {
			console.error("Error deleting user:", error);
			alert("An error occurred.");
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
							<Button variant="contained" color="error" onClick={() => setOpen(true)} sx={{ mt: 2 }}>
								Delete Account
							</Button>
						</Grid>
					</Grid>
				</CardContent>
			</Card>

			{/* confirmation modal for deletion */}
			<Modal
				open={open}
				onClose={() => setOpen(false)}
				sx={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<MuiBox sx={{
					backgroundColor: 'white',
					padding: 3,
					borderRadius: 2,
					maxWidth: 400,
					width: '100%',
				}}>
					<Typography variant="h6" sx={{ mb: 2 }}>
						Are you sure you want to delete your account?
					</Typography>
					<Grid container spacing={2}>
						<Grid item>
							<Button onClick={() => setOpen(false)} color="primary">
								Cancel
							</Button>
						</Grid>
						<Grid item>
							<Button
								onClick={handleDelete}
								color="error"
								variant="contained"
								disabled={deleting}
							>
								Confirm
							</Button>
						</Grid>
					</Grid>
				</MuiBox>
			</Modal>


		</Box>
	);
}
