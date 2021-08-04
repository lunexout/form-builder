import { Box, Button, Paper, Typography } from '@material-ui/core'
// import { ObjectSchema } from './types'

import { TextInput } from './../components/TextInput'
import { SelectInput } from './../components/SelectInput'
// import { useState } from 'react'

import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { useEffect, useState } from 'react'

// import { ShowAlert } from './../../components/Alert'
const STRING = 'string'
const NUMBER = 'number'
const ENUM = 'enum'
const ARRAY = 'array'
const OBJECT = 'object'
const BOOLEAN = 'boolean'

type Props = {
  RenderNestedObjects: any
  el: any
  value: any
  index: any
  SetValue: any
  AddElement: any
  DeleteElement: any
  GenerateProperties: any
}
export const RenderContent = ({
  RenderNestedObjects,
  GenerateProperties,
  AddElement,
  DeleteElement,
  value,
  SetValue,
  el,
  index,
}: Props) => {
  const [elements, setElements] = useState<Array<any>>([])
  const [watchForm, setWatchForm] = useState(false)

  // const RenderContent = (el: any, index: any) => {
  const func = () => {
    if (el.type === STRING || el.type === NUMBER) {
      return (
        <TextInput
          props={el}
          key={el.name + index}
          index={index}
          value={value}
          handleChange={SetValue}
          properties={GenerateProperties(el)}
          required={el.required ? true : false}
        />
      )
    } else if (el.type === ENUM) {
      return (
        <SelectInput
          key={el.name}
          index={index}
          label={el.label!}
          value={value}
          handleChange={SetValue}
          type={el.type}
          name={el.name}
          options={el.options}
        />
      )
    } else if (el.type === OBJECT) {
      return (
        <Paper
          style={{
            marginTop: 7,
            padding: 20,
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
          }}
        >
          <Typography variant="h5" gutterBottom>
            {el.label}
          </Typography>
          {el.properties.map((ele: any, i: number) => {
            let ind = index.toString() + ';' + i.toString()
            return ele.type === OBJECT ? (
              RenderNestedObjects(ele, ind)
            ) : (
              <TextInput
                props={ele}
                key={ele.name}
                index={ind}
                value={value}
                handleChange={SetValue}
                properties={GenerateProperties(ele)}
                required={ele.required ? true : false}
              />
            )
          })}
        </Paper>
      )
    } else if (el.type === ARRAY) {
      return (
        <Paper style={{ marginTop: 7, padding: 20 }}>
          <Typography variant="h5" gutterBottom>
            {el.label}
          </Typography>
          <Paper
            style={{
              display: 'flex',
              flexDirection: 'column',
              padding: 20,
              width: '100%',
            }}
          >
            {el.item.map((ele: any, i: number) => {
              let ind = index.toString() + ';' + i.toString()
              return (
                <>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    {ele.type === OBJECT ? (
                      RenderNestedObjects(ele, ind)
                    ) : (
                      <TextInput
                        props={ele}
                        index={ind}
                        key={ele.name}
                        value={value}
                        handleChange={SetValue}
                        properties={GenerateProperties(ele)}
                        required={ele.required ? true : false}
                      />
                    )}
                    <Button
                      style={{ width: 100, marginTop: 10 }}
                      onClick={() => DeleteElement(el, ind)}
                      variant="outlined"
                    >
                      remove
                    </Button>
                  </div>
                </>
              )
            })}
            <Button
              style={{ width: 100, marginTop: 10 }}
              onClick={() => AddElement(el, index)}
              variant="outlined"
            >
              Add
            </Button>
          </Paper>
        </Paper>
      )
    } else if (el.type === BOOLEAN) {
      return (
        <FormControlLabel
          control={
            <Checkbox
              checked={value}
              onChange={e => {
                // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                value = e.target.checked
                SetValue({ val: value, name: el.name })
              }}
              name={el.name}
              color="primary"
            />
          }
          label={el.label}
        />
      )
    }
  }
  return <>{func()}</>
}
