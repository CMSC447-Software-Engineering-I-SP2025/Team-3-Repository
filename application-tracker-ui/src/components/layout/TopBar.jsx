'use client'
import { Box, Typography } from "@mui/material"
import { AccountCircle } from "@mui/icons-material"
import Link from "next/link"
import { usePathname } from "next/navigation"

const PathMappings = {
  '/': 'Dashboard',
  '/applications': 'Applications',
  '/applications/search': 'Search',
  '/registration': 'Register',
  '/account': 'Account',
  '/edit': 'Edit',
}

const TopBar = () => {
  const path = usePathname() 


  return (
    <Box
      sx={{
        height: 60,
        backgroundColor: 'white',
        display: 'flex',
        filter: theme => `drop-shadow(0px 5px 3px ${theme.palette.shadow})`,
        px: 2
      }}
    >
      <Box flex={1} display='flex' alignItems='center' >
        <Typography variant='h5' fontWeight='bold' >
          { PathMappings[path] }
        </Typography>
      </Box>
      <Box flex={1} display='flex' justifyContent='end' alignItems='center' >
        <Link href='/account' >
          <AccountCircle fontSize='large' sx={{ color: 'customGray' }} />
        </Link>
      </Box>
    </Box>
  )
}

export default TopBar