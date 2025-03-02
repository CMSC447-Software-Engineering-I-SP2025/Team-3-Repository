'use client'
import ChartSection from "@/components/dashboard/charts"
import QuickActions from "@/components/dashboard/quickActions"
import Summary from "@/components/dashboard/summary"
import { Grid2 } from "@mui/material"

const RootView = ({ chartData = null }) => 
  <Grid2 container spacing={2} p={2}>
    <Summary chartData={chartData} loading={false} />
    <QuickActions loading={false} />
    <ChartSection chartData={chartData} loading={false} />
  </Grid2>

export default RootView