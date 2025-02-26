import Header from "@/components/Header";
import theme from "@/theme";
import { ThemeProvider } from "@mui/material";
import Grid2 from "@mui/material/Grid2";

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
        <ThemeProvider theme={theme}>
          <Grid2
            sx={{
              flex: 1,
              flexGrow: 1,
            }}
          >
            <Header/>
            {children}
          </Grid2>
        </ThemeProvider>
      </body>
    </html>
  );
}
