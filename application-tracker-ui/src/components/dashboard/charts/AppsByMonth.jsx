import { Box, Grid2, Skeleton, useMediaQuery } from "@mui/material"
import theme from "@/theme";
import SsrSafePlot from "../../SsrSafePlot";
import PlotMappings from "@/constants/plotMappings";

const AppsByMonth = ({ loading = false, chartData }) => {
  if (loading) {
    return <Grid2 size={12}>
      <Skeleton
        sx={{
          width: '100%',
          height: { xs: 400, md: 500, lg: 500 }
        }}
        variant='rounded'
      />
    </Grid2>
  }

  const { palette } = theme
  const {
    darkPurple,
    intermediate,
    cream,
    lightPurple
  } = palette 

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

  if (sm) { return null }
  const height = determineHeight()

  const xAxis = chartData?.months ?? []

  const data = Object.entries(chartData)
    .filter(([key, value]) => key !== 'months')
    .map(([key, value], index) => ({
      x: xAxis,
      y: value,
      name: PlotMappings[key]?.nice,
      type: 'bar',
      marker: { color: PlotMappings[key]?.color ?? lightPurple }
    }))


  const plotOptions = {
    data,
    layout: {
      title: {
        text: 'Monthly Outlook'
      },
      scattermode: 'group',
      yaxis: { title: { text: 'Number in Status' } },
      xaxis: { title: { text: 'Month Opened' } },
      barcornerradius: 5
    },
    config: {
      responsive: true
    },
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

export default AppsByMonth