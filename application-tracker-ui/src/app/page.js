import { faker } from "@faker-js/faker"
import RootView from "./rootView"

const mock_enum_stats = ['IN_PROGRESS', 'SUBMITTED', 'REJECTED', 'INTERVIEW', 'OFFER']

const sampleApiFunction = async () => {
  'use server'
  
  // mocks a 2sec wait time
  await new Promise((res, rej) => setTimeout(res, 2000))
  const monthMap = ['January', 'February', 'March', 'April']
  return monthMap.map(month => ({
    month,
    IN_PROGRESS: faker.number.int({ min: 5, max: 200 }),
    SUBMITTED: faker.number.int({ min: 5, max: 200 }),
    REJECTED : faker.number.int({ min: 5, max: 200 }),
    INTERVIEW: faker.number.int({ min: 5, max: 200 }), 
    OFFER: faker.number.int({ min: 5, max: 200 })
  }))

}

const RootPage = async () => {
  const apiData = await sampleApiFunction()
  console.log(apiData)

  const baseStatus = mock_enum_stats.reduce((acc, curr) => ({ ...acc, [curr]: [] }), {})
  const chartData = { ...baseStatus, months: [] }
  for (const object of apiData) {
    for (const [key, value] of Object.entries(object)) {
      if (key === 'month') {
        chartData.months.push(value)
        continue
      }

      if (chartData[key]) {
        chartData[key].push(value)
      }
    }
  }

  return <RootView chartData={chartData} /> 
}
export default RootPage 