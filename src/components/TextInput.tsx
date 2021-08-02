import TextField from '@material-ui/core/TextField'

interface Props {
  props: any
  value: any
  properties:any
  required: boolean
  handleChange(event: any): void
}

export const TextInput = ({ props,value,properties,required, handleChange }: Props) => {
  return (
      <>
        {properties.multiline ? (
          <textarea name={props.name} value={value} required={required}
          cols={40} rows={5} placeholder={props.label}
          onChange={e => {value=e.target.value,handleChange({ val: e.target.value, name: props.name,label:props.label })} }
          style={{borderRadius: 5, border: '1px solid lightgray',padding: 15}}
          ></textarea>
        ) : (
        <TextField id="outlined-basic" variant="outlined" label={props.label} value={value}
          inputProps={{
            type: properties.type ? properties.type : props.type === 'string' ? 'text' : 'number',
            pattern: properties.pattern && properties.pattern,
            max: properties.max && properties.max,
            min: properties.min && properties.min,
          }}
          onChange={e => {value=e.target.value,handleChange({ val: e.target.value, name: props.name,label:props.label })} }
          required={required}
        />
        )}
      </>
  )
}
