import { AppStatus, ChartTypes } from "@/constants"
import theme from "@/theme"
import { useMediaQuery } from "@mui/material"
import SsrSafePlot from "../SsrSafePlot"
import { fromEnumValue } from "@/utils/enumUtils"

const Pie = ({ data, height }) => {
  const layout = {
    title: { text: 'Totals in Duration' },
    yaxis: { title: { text: 'Number in Status' } },
    xaxis: { title: { text: 'Month Opened' } },
    barcornerradius: 5
  }

  const config = { responsive: true }
  const style = { width: '100%', height }

  const chartValues = Object.entries(data.mappings)
  .filter(([_, value]) => value > 0)
  .reduce((acc, curr) => ({
    values: [...acc.values, curr[1]],
    labels: [...acc.labels, fromEnumValue(curr[0])]
  }), { values: [], labels: [] })

  const chartData = {
    ...chartValues,
    type: 'pie'
  }

  const options = { data: [chartData], layout, config, style }
  return <SsrSafePlot {...options} />

}

const Bar = ({ data, height }) => {
  const layout = {
    title: { text: 'Monthly Outlook' },
    scatterMode: 'group',
    yaxis: { title: { text: 'Number in Status' } },
    xaxis: { title: { text: 'Month Opened' } },
    barcornerradius: 5
  }

  const config = { responsive: true }
  const style = { width: '100%', height }

  const totalMonths = data?.length
  const monthOrd = []

  const defaults = Object.keys(AppStatus).reduce((acc, curr) => ({ ...acc, [curr]: new Array(totalMonths).fill(0) }), {})

  for (const index in data) {
    const { month, mappings } = data[index]
    monthOrd.push(fromEnumValue(month))
    for (const [key, value] of Object.entries(mappings)) {
      const arr = defaults[key]
      arr[index] = value
    }
  }

  const chartData = Object.entries(defaults).map(([status, value]) => ({
    x: monthOrd,
    y: value,
    name: fromEnumValue(status),
    type: 'bar'
  }))

  const options = { data: chartData, layout, config, style }
  return <SsrSafePlot {...options} />
}

const Line = ({ data, height }) => {

  const asLines = data.reduce((acc, { first: date, second: total }) =>({
    x: [...acc.x, date],
    y: [...acc.y, total]
  }), { x: [], y: [] })

  const max = Math.max(asLines.x)

  const layout = {
    title: { text: 'By-Date Applications Created' },
    yaxis: { title: { text: 'Total' } },
    xaxis: { title: { text: 'Date Opened' } },
    barcornerradius: 5,
    yaxis: { range: [0, max] }
  }

  const config = { responsive: true }
  const style = { width: '100%', height }

  const chartData = { ...asLines, name: 'Total Created', type: 'line' }

  const options = { data: [chartData], config, style, layout }

  return <SsrSafePlot {...options} />
}

const DatavizCharts = ({ data, type, height }) => {

  if (type === ChartTypes.LINE) {
    return <Line data={data} height={height}/>
  }

  if (type === ChartTypes.BAR) {
    return <Bar data={data} height={height} />
  }

  if (type === ChartTypes.PIE) {
    return <Pie data={data} height={height} />
  }

  return null
}

export default DatavizCharts