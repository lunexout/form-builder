import { Box, Button, Paper, Typography } from '@material-ui/core'
// import { ObjectSchema } from './types'

import { TextInput } from './../../components/TextInput'
import { SelectInput } from './../../components/SelectInput'
// import { useState } from 'react'

import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'

// import { ShowAlert } from './../../components/Alert'

type Props = {
  jsonData: string
  // schema: ObjectSchema
  onSubmit: (values: any) => void
}
// interface DataSchema {
//   name: string
//   value: any
// }
const GenerateProperties = (el: any): object => {
  return {
    type: el.inputType && el.inputType,
    min: el.minLength && el.minLength,
    max: el.maxLength && el.maxLength,
    pattern: el.pattern && el.pattern,
    multiline: el.multiline && el.multiline,
  }
}
export const FormBuilder = ({ jsonData, onSubmit }: Props) => {
  // const [elements, setElements] = useState<Array<DataSchema>>([])

  const STRING = 'string'
  const NUMBER = 'number'
  const ENUM = 'enum'
  const ARRAY = 'array'
  const OBJECT = 'object'
  const BOOLEAN = 'boolean'

  let readyData = JSON.parse(jsonData) //
  let value: any

  const SetNestedElementValue = (
    el: any,
    label: string,
    value: string,
    i: any,
  ) => {
    let arr = i
    arr.splice(0, 1)
    console.log(el.type)
    if (el.type === ARRAY) {
      el.item.forEach((el: any, index: number) => {
        console.log(arr, i, index)
        if (el.type === OBJECT) {
          SetNestedElementValue(el, label, value, arr)
        } else if (i[0] === index.toString()) {
          el.value = value
        } else RenderContent(el, arr)
      })
    } else {
      el.properties.forEach((el: any, index: number) => {
        console.log(i[0], index.toString(), 'dfsgdsfdsf')
        if (el.type === OBJECT || el.type === ARRAY) {
          SetNestedElementValue(el, label, value, arr)
        } else if (i[0] === index.toString()) {
          el.value = value
        } else RenderContent(el, arr)
      })
    }
    // }
  }
  const SetValue = (event: any): void => {
    console.log(event.index)

    if (event.index.toString().length === 2) {
      readyData.properties[event.index.split(';')[0]].properties[
        event.index.split(';')[1]
      ].value = event.val
    } else if (event.index.toString.length === 1) {
      readyData.properties[event.index].value = event.val
    } else {
      readyData.properties.forEach((el: any, i: any) => {
        if (event.index.split(';')[0] === i.toString()) {
          let arr = event.index.split(';')
          arr.splice(0, 1)

          switch (el.type) {
            case OBJECT: {
              el.properties.forEach((ele: any, index: any) => {
                if (ele.type === OBJECT) {
                  SetNestedElementValue(ele, event.label, event.val, arr)
                } else {
                  RenderContent(ele, arr)
                }
              })
              break
            }
            case ARRAY: {
              el.item.forEach((ele: any) => {
                if (ele.type === OBJECT) {
                  SetNestedElementValue(ele, event.label, event.val, arr)
                } else {
                  RenderContent(ele, arr)
                }
              })
              break
            }
            default:
              console.log(el)
          }
        }
      })
    }
    console.log(readyData)
  }

  const RenderNestedObjects = (ele: any, index: any) => {
    return (
      <>
        {ele.type === OBJECT && (
          <Paper
            style={{
              marginTop: 7,
              padding: 20,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography variant="h5" gutterBottom>
              {ele.label}
            </Typography>
            {ele.properties.map((el1: any, i: number) => {
              let ind = index.toString() + ';' + i.toString()
              return (
                <>
                  {el1.type !== OBJECT && RenderContent(el1, ind)}
                  {RenderNestedObjects(el1, ind)}
                </>
              )
            })}
          </Paper>
        )}
      </>
    )
  }

  const RenderContent = (el: any, index: any) => {
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
            style={{ display: 'flex', flexDirection: 'column', padding: 20 }}
          >
            {el.item.map((ele: any, i: number) => {
              let ind = index.toString() + ';' + i.toString()
              return (
                <>
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
                </>
              )
            })}
            <Button style={{ width: 100, marginTop: 10 }} variant="outlined">
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

  const RenderFields = () => {
    return readyData.properties.map((el: any, index: number) => {
      console.log(index)
      return RenderContent(el, index)
    })
  }

  const ReworkSubmittedData = () => {
    return readyData.properties.forEach((el: any) => el)
  }

  return (
    <>
      <Paper>
        <Box
          data-testid="root-form"
          p={2}
          display="flex"
          flexDirection="column"
          component="form"
          onSubmit={event => {
            // Code here
          }}
        >
          <Typography variant="h5" gutterBottom>
            {readyData.label}
          </Typography>
          {RenderFields()}
          <Button
            variant="contained"
            color="primary"
            style={{ marginTop: 15 }}
            type="submit"
            // onSubmit={() => {
            //   console.log(1)
            // }}
            onClick={() => onSubmit(ReworkSubmittedData())}
          >
            Submit
          </Button>
        </Box>
      </Paper>
    </>
  )
}
