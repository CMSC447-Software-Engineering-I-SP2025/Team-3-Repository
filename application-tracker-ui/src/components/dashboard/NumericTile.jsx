import { Box, Grid2, Skeleton, Typography, useMediaQuery } from "@mui/material"

const NumericTile = ({
  text = '',
  number = 0,
  loading = false,
  backgroundColor = 'red'
}) => {
  const tileProps = {
    width: '100%',
    height: { xs: 90, sm: 100, md: 110, lg: 125 },
    maxWidth: { xs: 500, lg: 350 },
    borderRadius: 5,
    p: 2
  }

  const gridProps = {
    size: { xs: 12, sm: 6, lg: 3  },
    sx: {
      display: 'flex',
      justifyContent: 'center'
    }
  }

  if (loading) {
    return <Grid2 {...gridProps} >
      <Skeleton variant='rounded' sx={tileProps} />
    </Grid2>
  }

  const customBoxSx = {
    ...tileProps,
    backgroundColor,
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column'
  }

  const headerSx = {
    fontWeight: 'bold',
    fontSize: { xs: '1.25rem' }
  }

  const lowerSx = {
    fontSize: {
      xs: '2rem',
      sm: '2.5rem',
      md: '3rem',
      lg: '3.25rem'
    }
  } 

  return <Grid2 {...gridProps}>
    <Box sx={customBoxSx}>
      <Typography sx={headerSx}>{text}</Typography>
      <Typography sx={lowerSx}>{new Intl.NumberFormat('en-US').format(number)}</Typography>
    </Box>
  </Grid2>
}

export default NumericTile