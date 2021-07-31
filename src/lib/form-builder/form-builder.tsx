import { Box, Paper, Typography } from '@material-ui/core'
import { ObjectSchema } from './types'

import { TextInput } from './../../components/TextInput'
import {SelectInput} from './../../components/SelectInput'
import { useEffect, useState } from 'react'


type Props = {
  schema: ObjectSchema
  onSubmit: (values: any) => void
}
interface DataSchema {
  name: string
  value: any
}
export const FormBuilder = ({ schema, onSubmit }: Props) => {
  const [elements, setElements] = useState<Array<DataSchema>>([])

  let value: any

  useEffect(() => {
    schema.properties.forEach(el => {
      setElements(oldArray => [...oldArray, {name: el.name, value: null}])
    })
  }, [])

  const handleChange = (event: any): void => {
    elements.forEach(el => {
      if(el.name == event.name){el.value = event.val}
    })
    console.log(elements)
  }

  const GenerateProperties = (el:any):object => {
    switch(el.name){
      case 'phone': {
        return {
          type: el.inputType,
          min: el.minLength,
          max: el.maxLength,
          pattern: el.pattern
        }
      }
      case 'universityYears': {
        return {
          min: el.minimum,
          max: el.maximum,
        }
      }
      default: return {}
    }
  }
  const RenderTextFields = () => {
    return (
      <>
        {schema.properties.map((el, index) => {
          return (
            <>
              {el.type === 'string' || el.type === 'number' ? (
                <>
                  <TextInput
                    key={el.name + index}
                    label={el.label!}
                    value={value}
                    handleChange={handleChange}
                    type={el.type}
                    identor={el.name}
                    properties={GenerateProperties(el)}
                  />
                </>
              ) : (
                <>
                {el.type === 'enum' ? (
                  <>
                  <SelectInput
                    key={el.name + index}
                    label={el.label!}
                    value={value}
                    handleChange={handleChange}
                    type={el.type}
                    identor={el.name}
                    options={el.options}
                  />
                  </>
                ): (
                  <></>
                )}
                </>
              )}
            </>
          )
        })}
      </>
    )
  }
  return (
    <>
      <Paper>
        <Box
          p={2}
          display="flex"
          flexDirection="column"
          component="form"
          onSubmit={event => {
            // Code here
          }}
        >
          <Typography variant="h5" gutterBottom>
            {schema.label}
          </Typography>
          <RenderTextFields />
          {/* Code here */}
        </Box>
      </Paper>
    </>
  )
}
