import { Grid2 } from "@mui/material"

const ContentContainer = ({ children, sx = {}, ...props }) =>
  <Grid2
    container 
    sx={{
      backgroundColor: 'white',
      maxWidth: 600,
      width: '100%',
      height: '100%',
      minHeight: 200,
      borderRadius: 2,
      filter: theme => `drop-shadow(0px 10px 5px ${theme.palette.shadow})`,
      padding: 2,
      ...sx
    }}
    spacing={2}
    {...props}
  >
    {children}
  </Grid2>

export default ContentContainer