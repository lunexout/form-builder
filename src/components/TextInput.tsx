import TextField from '@material-ui/core/TextField'

interface Props {
  label: string
  type: string
  handleChange(event: any): void
  value: any
  identor: string
  properties:any
}

export const TextInput = ({ label, type, handleChange, value,identor,properties }: Props) => {
  return (
    <>
      <TextField
        id="outlined-basic"
        label={`${label}`}
        variant="outlined"
        type={identor === 'phone' ? properties.inputType : type}
        inputProps={{ pattern: properties.pattern && properties.pattern }}
        value={value}
        required
        onChange={e => {
          value = e.target.value
          const event = {
            val: value,
            name: identor
          }
          handleChange(event)
        }}
      />
    </>
  )
}
