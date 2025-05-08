'use client'
import { TEXTFIELD_SELECT_SLOT_PROPS, TEXTFIELD_STYLES } from "@/constants"
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
        slotProps={TEXTFIELD_SELECT_SLOT_PROPS}
        {...props}
        sx={TEXTFIELD_STYLES}
        error={hasError}
        helperText={message}
      /> 
    }}
  />
}

export default Input