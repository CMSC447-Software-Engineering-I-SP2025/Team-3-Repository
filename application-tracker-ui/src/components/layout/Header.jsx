'use client'
import { Box, Grid2, Tooltip, Zoom } from '@mui/material'
import { BarChartRounded, Article, Search, AddBox, HelpOutline, ShowChart, Reviews, SelfImprovementRounded} from '@mui/icons-material';
import Link from 'next/link';

const COMMON_ICON_STYLES = {
  sx: {
    borderRadius: 1,
    backgroundColor: 'white',
    color: 'black'
  }
}

const HeaderEntry = ({ href = '/', children, name }) =>
  <Grid2
    size={12}
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '60px'
    }}
  >
    <Tooltip slots={{ transition: Zoom }} arrow title={name} placement='right' >
      <Link href={href} >
        {children}
      </Link>
    </Tooltip>
  </Grid2>

const Header = () =>
  <Box sx={{
    width: '60px',
    float: 'left',
    backgroundColor: 'darkPurple',
    height: '100%',
  }}>
    <Grid2 container mt={2}>
      <HeaderEntry href='/' name='Home' >
        <BarChartRounded {...COMMON_ICON_STYLES} />
      </HeaderEntry>
      <HeaderEntry href='/applications/view' name='Applications' >
        <Article {...COMMON_ICON_STYLES} />
      </HeaderEntry>
      <HeaderEntry href='/applications/zen-mode' name='Zen Mode' >
        <SelfImprovementRounded {...COMMON_ICON_STYLES} />
      </HeaderEntry>
      <HeaderEntry href='/recommendations' name='Recommendations'>
        <Reviews {...COMMON_ICON_STYLES} />
      </HeaderEntry>
      <HeaderEntry href='/dataviz' name='Data Visualiztion' >
        <ShowChart {...COMMON_ICON_STYLES} />
      </HeaderEntry>
      <HeaderEntry href='/faq' name='FAQ' >
         <HelpOutline {...COMMON_ICON_STYLES} />
      </HeaderEntry>

    </Grid2>
  </Box>
export default Header
