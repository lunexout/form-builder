import { Box, Button, Paper, Typography } from '@material-ui/core'
import { ObjectSchema } from './types'

import { TextInput } from './../../components/TextInput'
import { SelectInput } from './../../components/SelectInput'
// import { useState } from 'react'

import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { useEffect, useState } from 'react'

import { RenderContent } from './../../components/RenderContent'
// import { ShowAlert } from './../../components/Alert'

type Props = {
  // jsonData: string
  jsonData: any
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
  const [elements, setElements] = useState<Array<any>>([])
  const [watchForm, setWatchForm] = useState(false)

  // let jsonData
  // = JSON.parse(jsonData) //
  let value: any

  const AddElement = (el: any, index: any) => {
    const deepClone = JSON.parse(JSON.stringify(el.item[0]))
    el.item = [...el.item, deepClone]
    setWatchForm(!watchForm)
  }
  const DeleteElement = (el: any, index: any) => {
    console.log(index)
    if (index.toString().split(';').length === 2) {
      console.log(el.item)
      el.item.splice(parseInt(index.toString().split(';')[1]), 1)
    }
    // else if{

    // }
    setWatchForm(!watchForm)
  }
  useEffect(() => {
    console.log(1)
    renderFields()
  }, [watchForm])

  const STRING = 'string'
  const NUMBER = 'number'
  const ENUM = 'enum'
  const ARRAY = 'array'
  const OBJECT = 'object'
  const BOOLEAN = 'boolean'

  const SetNestedElementValue = (
    el: any,
    label: string,
    value: string,
    i: any,
  ) => {
    // let arr = i
    // arr.splice(0, 1)
    if (el.type === ARRAY) {
      el.item.forEach((el: any, index: number) => {
        if (i.length > 0) {
          if (index === i[0]) {
            if (el.type === OBJECT) {
              SetNestedElementValue(el, label, value, index)
            } else {
              el.value = value
            }
          }
        }
      })
    } else {
      el.properties.forEach((ele: any, index: number) => {
        console.log(ele.type)
        if (i.length > 0) {
          if (index === i[0]) {
            if (ele.type === OBJECT || ele.type === ARRAY) {
              SetNestedElementValue(ele, label, value, index)
            } else {
              ele.value = value
            }
          }
        }
      })
    }
    // }
  }
  const SetValue = (event: any): void => {
    console.log(event)
    if (event.index.toString().length === 1) {
      jsonData.properties[event.index].value = event.val
    } else if (event.index.split(';').length === 2) {
      jsonData.properties[event.index.split(';')[0]].properties[
        event.index.split(';')[1]
      ].value = event.val
    } else {
      event.el.value = event.val
      jsonData.properties.forEach((el: any, i: any) => {
        if (event.index.split(';')[0] === i.toString()) {
          let arr = event.index.split(';')
          arr.splice(0, 1)

          SetNestedElementValue(el, event.label, event.val, arr)
        }
      })
    }
    console.log(jsonData)
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
                  {el1.type !== OBJECT && (
                    <>
                      <RenderContent
                        DeleteElement={DeleteElement}
                        el={el1}
                        index={ind}
                        RenderNestedObjects={RenderNestedObjects}
                        value={value}
                        SetValue={SetValue}
                        AddElement={AddElement}
                        GenerateProperties={GenerateProperties}
                      />
                    </>
                  )}
                  {RenderNestedObjects(el1, ind)}
                </>
              )
            })}
          </Paper>
        )}
      </>
    )
  }

  const renderFields = () => {
    return (
      <>
        {jsonData.properties.map((el: any, index: number) => {
          return (
            <RenderContent
              DeleteElement={DeleteElement}
              el={el}
              index={index}
              RenderNestedObjects={RenderNestedObjects}
              value={value}
              SetValue={SetValue}
              AddElement={AddElement}
              GenerateProperties={GenerateProperties}
            />
          )
        })}
      </>
    )
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
            {jsonData.label}
          </Typography>
          {renderFields()}
          <Button
            variant="contained"
            color="primary"
            style={{ marginTop: 15 }}
            type="submit"
            onClick={() => onSubmit(elements)}
          >
            Submit
          </Button>
        </Box>
      </Paper>
    </>
  )
}
