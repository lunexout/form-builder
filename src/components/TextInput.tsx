import TextField from '@material-ui/core/TextField'

interface Props {
  label: string
  type: string
  handleChange(event: any): void
  value: any
  identor: string
  properties:any
  required: boolean
}

export const TextInput = ({ label, type, handleChange, value,identor,properties,required }: Props) => {
  return (
    <>
    {required ? (
      <TextField
      id="outlined-basic"
      label={`${label}`}
      variant="outlined"
      type={identor === 'phone' ? properties.inputType : type}
      inputProps={{
        pattern: properties.pattern && properties.pattern,
        max: properties.max && properties.max,
        min: properties.min && properties.min
      }}
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
    ): (
      <TextField
        id="outlined-basic"
        label={`${label}`}
        variant="outlined"
        type={identor === 'phone' ? properties.inputType : type}
        inputProps={{
          pattern: properties.pattern && properties.pattern,
          max: properties.max && properties.max,
          min: properties.min && properties.min
        }}
        value={value}
        onChange={e => {
          value = e.target.value
          const event = {
            val: value,
            name: identor
          }
          handleChange(event)
        }}
      />
    )
  }
    </>
  )
}
