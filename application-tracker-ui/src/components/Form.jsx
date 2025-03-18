import { FormProvider } from "react-hook-form"

const Form = ({ children, methods = {}, onSubmit, style = { width: '100%' } }) =>
  <FormProvider {...methods}>
    <form style={style} onSubmit={onSubmit}>
      {children}
    </form>
  </FormProvider>

export default Form