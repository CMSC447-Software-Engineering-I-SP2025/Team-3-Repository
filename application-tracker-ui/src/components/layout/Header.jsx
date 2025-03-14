'use client'
import { Box, Grid2 } from '@mui/material'
import { BarChartRounded, Article, Search, Person, AddBox } from '@mui/icons-material';
import Link from 'next/link';

const COMMON_ICON_STYLES = {
  sx: {
    borderRadius: 1,
    backgroundColor: 'white',
    color: 'black'
  }
}

const HeaderEntry = ({ href = '/', children }) =>
  <Grid2
    size={12}
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '60px'
    }}
  >
    <Link href={href} >
      {children}
    </Link>
  </Grid2>

const Header = () =>
  <Box sx={{
    width: '60px',
    float: 'left',
    backgroundColor: 'darkPurple',
    height: '100%',
  }}>
    <Grid2 container mt={2}>
      <HeaderEntry href='/' >
        <BarChartRounded {...COMMON_ICON_STYLES} />
      </HeaderEntry>
      <HeaderEntry href='/applications' >
        <Article {...COMMON_ICON_STYLES} />
      </HeaderEntry>
      <HeaderEntry href='/applications/search' >
        <Search {...COMMON_ICON_STYLES} />
      </HeaderEntry>
      <HeaderEntry href='/applications/create' >
        <AddBox {...COMMON_ICON_STYLES} />
      <HeaderEntry href='/account' >
        <Person {...COMMON_ICON_STYLES} />
      </HeaderEntry>
    </Grid2>
  </Box>
export default Header
