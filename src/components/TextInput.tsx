import TextField from '@material-ui/core/TextField'

interface Props {
  label: string
  type: string
  value: any
  identor: string
  properties:any
  required: boolean
  handleChange(event: any): void
}

export const TextInput = ({ label, type, value,identor,properties,required,handleChange }: Props) => {
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
        const event = { val: value, name: identor,label:label }
        handleChange(event)
      }}
    />
    ):(
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
          const event = { val: value, name: identor, label:label }
          handleChange(event)
        }}
      />
    )
  }
    </>
  )
}
