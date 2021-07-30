import TextField from '@material-ui/core/TextField'

interface Props {
  label: string
  type: string
  handleChange(arg: string): void
  value: any
}

export const TextInput = ({ label, type, handleChange, value }: Props) => {
  // const { handleChange } = useContext(FormContext)

  return (
    <>
      <TextField
        id="outlined-basic"
        label={`${label}`}
        variant="outlined"
        type={type}
        value={value}
        onChange={e => {
          value = e.target.value
          console.log(value)
          handleChange(value)
        }}
      />
    </>
  )
}
