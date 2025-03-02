'use client'
import { Grid2, Skeleton, Typography, Divider, Button } from "@mui/material"
import { useRouter } from "next/navigation"

const ActionContainer = ({ text, link, router = { push: () => {} } }) =>  {

  return <Grid2 size={{ xs: 12, sm: 6, md: 3 }} sx={{ display: 'flex', justifyContent: 'center' }}>
    <Button
      variant='contained'
      sx={{ backgroundColor: 'lightPurple' }}
      onClick={() => router.push(link)}
    >
      { text }
    </Button>
  </Grid2>
}

const QuickActions = ({ loading = false }) => {
  const router = useRouter()
  if (loading) {
    return <Grid2 size={12}>
      <Skeleton sx={{ height: 400, width: '100%' }} variant='rounded' />
    </Grid2>
  }

  return <Grid2 size={12}>
    <Typography fontSize='1.5rem' fontWeight='bold'>Quick Actions</Typography>
    <Divider sx={{ mb: 1 }} />
    <Grid2 container spacing={2} >
      <ActionContainer router={router} text='Manage Started Applications' link='/manage?status=IN_PROGRESS' />
      <ActionContainer router={router} text='View Submitted Applications' link='/manage?status=SUBMITTED' />
      <ActionContainer router={router} text='View Your Offers' link='/manage?status=OFFER' />
      <ActionContainer router={router} text='Manage Profile' link='/account' />
    </Grid2>
  </Grid2>
}

export default QuickActions