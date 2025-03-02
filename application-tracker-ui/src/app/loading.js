import { Grid2 } from "@mui/material"
import Summary from "@/components/dashboard/summary"
import QuickActions from "@/components/dashboard/quickActions"
import ChartSection from "@/components/dashboard/charts"

const RootLoadingView = () =>
  <Grid2 container spacing={2} p={2}>
    <Summary loading />
    <QuickActions loading/>
    <ChartSection loading />
  </Grid2>

export default RootLoadingView