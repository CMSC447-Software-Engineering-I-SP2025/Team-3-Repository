import { Divider, Grid2, Skeleton, Typography } from "@mui/material"
import AppsByMonth from "./AppsByMonth"
import DashboardHistogram from "./DashboardHistogram"

const ChartSection = ({ chartData, loading = false }) => {
  if (loading) {
    return <Grid2 size={12}>
      <Skeleton sx={{ height: 400, width: '100%' }} variant='rounded' />
    </Grid2>
  }

  return <>
    <Grid2 size={12}>
      <Typography fontSize='1.5rem' fontWeight='bold'>Your Monthly Outlook</Typography>
      <Divider/>
    </Grid2>
    <AppsByMonth loading={false} chartData={chartData}/>
    {/** <DashboardHistogram loading={false} chartData={chartData} /> */}
  </>

}

export default ChartSection