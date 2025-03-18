import Input from "./Input"
const Select = ({ children, ...props }) =>
  <Input
    select
    fullWidth
    inputProps={{
      MenuProps: {
        PaperProps: {
          sx: {
            backgroundColor: 'white'
          }
        }
      }
    }}
    {...props}
  >
    {children ?? []}
  </Input>

export default Select