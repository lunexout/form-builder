import TextField from '@material-ui/core/TextField'

interface Props {
  label: string
  type: string
  value: any
  name: string
  properties:any
  required: boolean
  handleChange(event: any): void
}

export const TextInput = ({ label, type, value,name,properties,required,handleChange }: Props) => {
  return (
    <>
    {required ? (
      <>
        {properties.multiline ? (
          <textarea name={name}
          value={value}
          required
          cols={40} rows={5}
          placeholder={label}
          onChange={e => {
            value = e.target.value
            const event = { val: value, name: name,label:label }
            handleChange(event)
          }}
          style={{borderRadius: 5, border: '1px solid lightgray',padding: 15}}
          ></textarea>
        ) : (
        <TextField
          id="outlined-basic"
          label={`${label}`}
          variant="outlined"
          inputProps={{
            type: properties.type ? properties.type : type,
            pattern: properties.pattern && properties.pattern,
            max: properties.max && properties.max,
            min: properties.min && properties.min,
          }}
          value={value}
          required
          onChange={e => {
            value = e.target.value
            const event = { val: value, name: name,label:label }
            handleChange(event)
          }}
        />
        )}
      </>
    ):(
      <>
        {properties.multiline ? (
          <textarea name={name}
          value={value}
          cols={40} rows={5}
          placeholder={label}
          onChange={e => {
            value = e.target.value
            const event = { val: value, name: name,label:label }
            handleChange(event)
          }}
          style={{borderRadius: 5, border: '1px solid lightgray',padding: 15}}
          ></textarea>
        ) : (
        <TextField
          id="outlined-basic"
          label={`${label}`}
          variant="outlined"
          inputProps={{
            type: properties.type ? properties.type : type,
            pattern: properties.pattern && properties.pattern,
            max: properties.max && properties.max,
            min: properties.min && properties.min,
          }}
          value={value}
          onChange={e => {
            value = e.target.value
            const event = { val: value, name: name,label:label }
            handleChange(event)
          }}
        />
        )}
      </>
    )
  }
    </>
  )
}
