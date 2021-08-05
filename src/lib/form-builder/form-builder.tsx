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
  let newJSON: any = {
    name: jsonData.label,
  }
  const generateJSON = () => {
    const findNestedElementValues = (
      item: any,
      previousItem: any,
      index: any,
    ) => {
      if (
        item.type === 'string' ||
        item.type === 'number' ||
        item.type === 'enum'
      ) {
        previousItem[item['name']] = item.value
      } else if (item.type === 'object') {
        previousItem[index.toString()] = {}
        item.properties.map((el: any, i: number) => {
          findNestedElementValues(el, previousItem[index.toString()], i)
        })
      } else if (item.type === 'array') {
        previousItem[item['name']] = []
        item.item.map((el: any, i: number) => {
          findNestedElementValues(el, previousItem[item['name']], i)
        })
      }
    }
    jsonData.properties.map((item: any, index: number) => {
      if (
        item.type === 'string' ||
        item.type === 'number' ||
        item.type === 'enum'
      ) {
        newJSON[item['name']] = item.value
      }
      if (item.type === 'object') {
        newJSON[item['name']] = {}
        findNestedElementValues(item, newJSON[item['name']], index)
      }
      if (item.type === 'array') {
        newJSON[item['name']] = []
        item.item.map((el: any, index: number) => {
          findNestedElementValues(el, newJSON[item['name']], index)
        })
      }
    })
  }

  const [watchForm, setWatchForm] = useState(false)

  // let jsonData
  // = JSON.parse(jsonData) //
  let value: any

  const AddElement = (el: any) => {
    let deepClone = JSON.parse(JSON.stringify(el.item[0]))
    deepClone.properties.map((item: any) => (item.value = ''))
    el.item = [...el.item, deepClone]
    setWatchForm(!watchForm)
  }
  const DeleteElement = (el: any, index: any) => {
    let oneDrillingUpElement = JSON.parse(JSON.stringify(el.item))
    const deletedElements = oneDrillingUpElement.filter(
      (unsuned: any, i: any) => i !== index,
    )
    el.item = [...deletedElements]
    setWatchForm(!watchForm)
  }
  useEffect(() => {
    renderFields()
  }, [watchForm])

  const ARRAY = 'array'
  const OBJECT = 'object'

  const SetNestedElementValue = (nestedElement: any, value: any, i: any) => {
    if (nestedElement.type === ARRAY) {
      nestedElement.item.forEach((element: any, index: number) => {
        if (i.length > 0) {
          if (index === i[0]) {
            if (element.type === OBJECT) {
              SetNestedElementValue(element, value, index)
            } else {
              element.value = value
            }
          }
        }
      })
    } else {
      nestedElement.properties.forEach((element: any, index: number) => {
        if (i.length > 0) {
          if (index === i[0]) {
            if (element.type === OBJECT || element.type === ARRAY) {
              SetNestedElementValue(element, value, index)
            } else {
              element.value = value
            }
          }
        }
      })
    }
    // }
  }
  const SetValue = (event: any): void => {
    value = event.val
    if (!event.index.toString().includes(';')) {
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

          SetNestedElementValue(el, event.val, arr)
        }
      })
    }
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
              {' '}
              {ele.label}{' '}
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
              value={el.value ? el.value : value}
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
            onSubmit={() => {
              generateJSON()
              onSubmit(newJSON)
            }}
          >
            Submit
          </Button>
        </Box>
      </Paper>
    </>
  )
}
