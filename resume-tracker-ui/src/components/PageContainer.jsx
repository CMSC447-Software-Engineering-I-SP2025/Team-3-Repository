import { Box } from "@mui/material"

const PageContainer = ({ children, sx = {}, ...props }) =>
  <Box
    sx={{
      minHeight: 'calc(100% - 60px)',
      overflow: 'auto',
      ...sx
    }}
    {...props}
  >
    {children}
  </Box> 

export default PageContainer