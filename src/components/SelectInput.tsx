import { makeStyles } from '@material-ui/core/styles'
import { useState } from 'react'

const useStyles = makeStyles(() => ({
  select: {
    padding: 10,
    border: '1px solid gray',
    outline: 'none',
    borderRadius: 5,
    marginTop: 7,
  },
}))
interface Props {
  label: string
  type: string
  value: any
  name: string
  index: any
  el: any
  options: Array<any>
  handleChange(event: any): void
}
export const SelectInput = ({
  label,
  value,
  index,
  el,
  options,
  handleChange,
}: Props) => {
  const classes = useStyles()
  const [selectValue, setSelectValue] = useState('')

  const RenderMenuItems = () => {
    return options.map(item => {
      return (
        <option key={item.value} value={item.value}>
          {item.label}
        </option>
      )
    })
  }
  return (
    <>
      <select
        className={classes.select}
        value={el.value ? el.value : selectValue}
        onChange={e => {
          value = e.target.value
          setSelectValue(e.target.value)
          handleChange({ val: value, index: index })
        }}
      >
        <option defaultValue={``}>{label}</option>
        {RenderMenuItems()}
      </select>
    </>
  )
}
