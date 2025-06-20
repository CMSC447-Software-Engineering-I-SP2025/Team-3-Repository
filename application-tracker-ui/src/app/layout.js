import Header from "@/components/layout/Header";
import TopBar from "@/components/layout/TopBar";
import Provider from "@/components/Providers";
import { Box } from "@mui/material";

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
          display: 'flex',
          height: '100%'
        }}
      >
        <Provider>
          <Box sx={{ flex: 1, flexGrow: 1 }} >
            <Header/>
            <Box
              sx={{
                marginLeft: '60px',
                backgroundColor: 'background',
                height: 'fit-content',
                minHeight: '100vh',
                pb: 2
              }}
            >
              <TopBar/>
              { children }
            </Box>
          </Box>
        </Provider>
      </body>
    </html>
  );
}
