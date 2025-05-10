'use client'
import { Box, Grid2, Tooltip, Zoom } from '@mui/material'
import {
  BarChartRounded,
  Article,
  HelpOutline,
  ShowChart,
  Reviews,
  SelfImprovementRounded,
  DangerousOutlined as Dangerous
} from '@mui/icons-material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const COMMON_ICON_STYLES = {
  sx: {
    borderRadius: 1,
    backgroundColor: 'white',
    color: 'black'
  }
}

const HeaderEntry = ({ href = '/', children, name, disabled = false }) =>
  <Grid2
    size={12}
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '60px'
    }}
  >
    <Tooltip slots={{ transition: Zoom }} arrow title={disabled ? 'Disabled for Zen Mode' : name} placement='right' >
      {
        disabled ?
        <Dangerous sx={{ backgroundColor: 'transparent', color: 'customGray' }} /> :
        <Link href={href}>
          {children}
        </Link>
      }
    </Tooltip>
  </Grid2>

const Header = () => {

  const path = usePathname()
  const isZenMode = path.includes('zen-mode')

  return <Box sx={{
    width: '60px',
    float: 'left',
    backgroundColor: 'darkPurple',
    height: '100%',
  }}>
    <Grid2 container mt={2}>
      <HeaderEntry href='/' name='Home' >
        <BarChartRounded {...COMMON_ICON_STYLES} />
      </HeaderEntry>
      <HeaderEntry href='/applications/view' name='Applications' disabled={isZenMode} >
        <Article {...COMMON_ICON_STYLES} />
      </HeaderEntry>
      <HeaderEntry href='/applications/zen-mode' name='Zen Mode' disabled={isZenMode} >
        <SelfImprovementRounded {...COMMON_ICON_STYLES} />
      </HeaderEntry>
      <HeaderEntry href='/recommendations' name='Recommendations' disabled={isZenMode}>
        <Reviews {...COMMON_ICON_STYLES} />
      </HeaderEntry>
      <HeaderEntry href='/dataviz' name='Data Visualiztion' disabled={isZenMode} >
        <ShowChart {...COMMON_ICON_STYLES} />
      </HeaderEntry>
      <HeaderEntry href='/faq' name='FAQ' disabled={isZenMode} >
         <HelpOutline {...COMMON_ICON_STYLES} />
      </HeaderEntry>

    </Grid2>
  </Box>
}
export default Header
