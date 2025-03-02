import Header from "@/components/layout/Header";
import TopBar from "@/components/layout/TopBar";
import theme from "@/theme";
import { Box, ThemeProvider } from "@mui/material";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';

export const metadata = {
  title: "Application Tracker UI",
  description: "Welcome Home!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          display: 'flex'
        }}
      >
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <Box sx={{ flex: 1, flexGrow: 1 }} >
              <Header/>
              <Box sx={{ marginLeft: '60px', backgroundColor: 'background', height: '100%' }}>
                <TopBar/>
                { children }
              </Box>
            </Box>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
