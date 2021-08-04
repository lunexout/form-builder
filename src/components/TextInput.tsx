import TextField from '@material-ui/core/TextField'
import { useState } from 'react'

interface Props {
  props: any
  value: any
  properties: any
  required: boolean
  index: any
  handleChange(event: any): void
}

export const TextInput = ({
  props,
  value,
  properties,
  required,
  index,
  handleChange,
}: Props) => {
  const [val, setValue] = useState('')
  return (
    <>
      {properties.multiline ? (
        <textarea
          name={props.name}
          value={value}
          required={required}
          cols={40}
          rows={5}
          placeholder={props.label}
          onChange={e => {
            value = e.target.value
            handleChange({
              val: e.target.value,
              el: props,
              name: props.name,
              label: props.label,
              index: index,
            })
          }}
          style={{
            borderRadius: 5,
            border: '1px solid lightgray',
            padding: 15,
          }}
        ></textarea>
      ) : (
        <TextField
          id="outlined-basic"
          variant="outlined"
          label={props.label}
          // value={value}
          inputProps={{
            type: properties.type
              ? properties.type
              : props.type === 'string'
              ? 'text'
              : 'number',
            pattern: properties.pattern && properties.pattern,
            max: properties.max && properties.max,
            min: properties.min && properties.min,
          }}
          value={val}
          onChange={e => {
            setValue(e.target.value)
            handleChange({
              val: e.target.value,
              el: props,
              name: props.name,
              label: props.label,
              index: index,
            })
          }}
          required={required}
        />
      )}
    </>
  )
}
