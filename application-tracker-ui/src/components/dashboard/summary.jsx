import { Grid2, Skeleton, Typography, Divider } from "@mui/material"
import NumericTile from "./NumericTile"

const Summary = ({ chartData = {}, loading = false }) => {
  if (loading) {
    return <Grid2 size={12}>
      <Skeleton sx={{ height: 300, width: '100%' }} variant='rounded' />
    </Grid2>
  }

  return <>
    <Grid2 size={12}>
      <Typography fontSize='1.5rem' fontWeight='bold' >Your Summary</Typography>
      <Divider/>
    </Grid2>
    <NumericTile
      text='In Progress'
      number={chartData?.IN_PROGRESS?.reduce((t, i) => t += i, 0)}
      backgroundColor='lightPurple'
    />
    <NumericTile
      text='Submitted'
      number={chartData?.SUBMITTED?.reduce((t, i) => t += i, 0)}
      backgroundColor='intermediate'
    />
    <NumericTile
      text='Offers'
      number={chartData?.OFFER?.reduce((t, i) => t += i, 0)}
      backgroundColor='customGray'
    />
    <NumericTile
      text='Rejected'
      number={chartData?.REJECTED?.reduce((t, i) => t += i, 0)}
      backgroundColor='cream'
    />
  </>
}

export default Summary