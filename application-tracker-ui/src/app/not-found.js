import { ArrowForward, WarningOutlined } from "@mui/icons-material"
import { Box, Grid2, Typography } from "@mui/material"
import Link from "next/link"

const NotFoundView = () =>
  <Box
    sx={{
      height: 'calc(100% - 60px)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
    }}
  >
    <Box
      sx={{
        backgroundColor: 'white',
        display: 'flex',
        alignItems: 'center',
        padding: 4,
        borderRadius: 2,
        flexDirection: 'column',
        width: 'fit-content',
        filter: 'drop-shadow(0px 5px 3px rgba(186, 186, 186, 0.3))'
      }}
    >
      <Box display='flex' alignItems='center' >
        <Typography variant='h4'>
          Oops, that wasn't supposed to happen.
        </Typography>
        <WarningOutlined sx={{ fontSize: '2rem', ml: 1 }} />
      </Box>
      <Box display='flex' alignItems='center' sx={{ color: 'lightPurple' }} >
        <Link href='/' style={{ display: 'flex', color: '#9067c6' }} >
          <Typography variant='h5'>
            Go Home
          </Typography>
          <ArrowForward sx={{ fontSize: '2rem', ml: 1 }} />
        </Link>
      </Box>
    </Box>
  </Box>

export default NotFoundView