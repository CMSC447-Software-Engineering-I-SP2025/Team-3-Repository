'use client'
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter"
import theme from "@/theme"
import { ThemeProvider } from "@mui/material"
import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon'

const Provider = ({ children }) =>
  <AppRouterCacheProvider>
    <LocalizationProvider dateAdapter={AdapterLuxon}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </LocalizationProvider>
  </AppRouterCacheProvider>

export default Provider