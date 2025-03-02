import { faker } from "@faker-js/faker"
import { Grid2, Skeleton, Box, useMediaQuery } from "@mui/material"
import { DateTime, Duration, Interval } from "luxon"
import SsrSafePlot from "../../SsrSafePlot"
import theme from "@/theme"

const DashboardHistogram = ({ loading, chartData }) => {
  if (loading) {
    return <Grid2 size={12}>
      <Skeleton
        variant='rounded'
        sx={{
          width: '100%',
          height: { xs: 400, md: 500 }
        }}
      />
    </Grid2>
  }

  // this is setting up heatmap data for a four-month timespan.
  const now = DateTime.now().plus({ days: 1 })
  const then = now.minus({ months: 4 })
  const interval = Interval.fromDateTimes(then, now).splitBy(Duration.fromObject({ days: 1 })) 
  const days = interval.map(int => ({
    iso: int.start.toISODate(),
    dayOfWeek: int.start.toFormat('cccc'),
    dateTime: int,
    submitted: faker.number.int({ min: 0, max: 200 })
  }))

  const yAxis = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday',  'Saturday']

  const firstDataDay = yAxis.indexOf(days?.[0]?.dayOfWeek)
  const heatmapFormattedData = []

  let local = []

  for (let i = 0; i < firstDataDay; i++) {
    local.push(0)
  }

  for (let i = 0; i < days?.length; i++) {
    const currentItem = days[i]
    local.push(currentItem.submitted)

    if (currentItem?.dayOfWeek === 'Saturday') {
      heatmapFormattedData.push(local)
      local = []
      continue
    }
  }


  const { palette } = theme
  const sm = useMediaQuery(theme.breakpoints.down('sm'))
  const md = useMediaQuery(theme.breakpoints.down('md'))

  const determineHeight = () => {
    if (sm) {
      return 300 
    }

    if (md) {
      return 400 
    }

    return 500
  }

  const height = determineHeight()
  const plotOptions = {
    data: [{
      z: heatmapFormattedData,
      x: yAxis,
      type: 'heatmap',
      colorscale: [
        [0, palette.cream],
        [0.5, palette.lightPurple],
        [1, palette.darkPurple]
      ]
    }],
    layout: {
      title: { text: 'Application Submission Heatmap' }
    },
    config: { responsive: true },
    style: { width: '100%', height }

  }


  return <Grid2
    size={{ xs: 12 }}
    sx={{
      backgroundColor: 'white',
      borderRadius: 5,
    }}
  >
    <Box
      sx={{
        backgroundColor: 'white',
        p: 2,
        height,
        borderRadius: 5,
        maxWidth: '100%'
      }}
    >
      <SsrSafePlot {...plotOptions} />
    </Box>
  </Grid2>
}

export default DashboardHistogram