import { Button } from "@mui/material"

const SubmitButton = ({ text = null }) =>
  <Button
    fullWidth
    type='submit'
    variant='contained'
    sx={{ backgroundColor: 'lightPurple' }}
  >
    {text}
  </Button>

export default SubmitButton