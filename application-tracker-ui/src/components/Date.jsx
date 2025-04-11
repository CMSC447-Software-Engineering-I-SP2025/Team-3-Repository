import { DatePicker } from "@mui/x-date-pickers"
import { Controller, useFormContext } from "react-hook-form"

const Date = ({ name = '', label = '', textFieldProps = {}, ...props }) => {
  const form = useFormContext()

  return <Controller
    name={name}
    control={form.control}
    render={({ field, fieldState }) => {
      const message = fieldState?.error?.message ?? null
      const hasError = !!message
      return <DatePicker
        {...field}
        label={label}
        sx={{
          borderRadius: 2
        }}
        slotProps={{
          textField: {
            error: hasError,
            helperText: message,
            fullWidth: true,
            ...textFieldProps
          },
          desktopPaper: {
            sx: { backgroundColor: 'white' }
          }
        }}
        desktop
        {...props}
      />
    }}
  />
}

export default Date