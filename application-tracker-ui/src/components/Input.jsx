'use client'
import { TextField } from "@mui/material"
import { Controller, useFormContext } from "react-hook-form"

const Input = ({ name, label, ...props }) => {
  const form = useFormContext()
  const control = form?.control

  return <Controller
    name={name}
    control={control}
    render={({ field, fieldState }) => {
      const message = fieldState?.error?.message ?? null 
      const hasError = !!message 
      return <TextField
        {...field}
        label={label}
        {...props}
        sx={{
          borderRadius: 2,
          "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
              borderColor: 'intermediate' 
            },
          }
        }}
        error={hasError}
        helperText={message}
      /> 
    }}
  />
}

export default Input