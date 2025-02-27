const RootView = async () => {
  await new Promise((res, rej) => setTimeout(res, 5000))
  return null
}
export default RootView