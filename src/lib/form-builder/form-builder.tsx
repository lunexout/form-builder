import { Box, Button, Paper, Typography } from '@material-ui/core'
import { ObjectSchema } from './types'

import { TextInput } from './../../components/TextInput'
import {SelectInput} from './../../components/SelectInput'
import { useEffect, useState } from 'react'

import {ShowAlert} from './../../components/Alert'

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
      if(el.type === 'object') {
        el.properties.forEach(el=>{
          setElements(oldArray => [...oldArray, {name: el.name, value: null}])
        })
      }else{
        setElements(oldArray => [...oldArray, {name: el.name, value: null}])
      }
    })
  }, [])

  const handleChange = (event: any): void => {
      elements.forEach(el => {
        if(el.name == event.name){el.value = event.val}
      })
  }

          // ShowAlert({error: true, text: 'Please fill the technology input', header: 'Tech input error'})

  const GenerateProperties = (el:any):object => {
        return {
          type: el.inputType && el.inputType,
          min: el.minLength && el.minLength,
          max: el.maxLength && el.maxLength,
          pattern: el.pattern && el.pattern,
          multiline: el.multiline && el.multiline,
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
                    type={el.type === 'string' ? 'text' : 'number'}
                    name={el.name}
                    properties={GenerateProperties(el)}
                    required={el.required ? el.required : false}
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
                    name={el.name}
                    options={el.options}
                  />
                  </>
                ): (
                  <>
                    {el.type === 'array' ?(
                      <>
                      <Paper style={{marginTop:7,padding:20}}>
                      <Typography variant="h5" gutterBottom>{el.label}</Typography>
                      <Paper style={{height:200, display: 'flex', flexDirection: 'column',padding:20}}>
                        {el.item.properties.map(el1 => {
                          return(
                            <>
                            <TextInput
                              key={el1.name + index}
                              label={el1.label!}
                              value={value}
                              handleChange={handleChange}
                              type={el1.type}
                              name={el.name}
                              properties={GenerateProperties(el1)}
                              required={el.required ? el.required : false}
                            />
                            </>
                          )
                        })}
                        <Button style={{width: 100,marginTop: 10}}  variant="outlined">Add</Button>
                      </Paper>
                      </Paper>
                      </>
                    ):(
                      <>
                        {el.type === 'object' && (
                          <>
                          <Paper style={{marginTop:7,padding:20,display: 'flex', flexDirection: 'column',}}>
                          <Typography variant="h5" gutterBottom>{el.label}</Typography>
                            {el.properties.map(el1 => {
                              return(
                                <>
                                <TextInput
                                    key={el1.name + index}
                                    label={el1.label!}
                                    value={value}
                                    handleChange={handleChange}
                                    type={el1.type}
                                    name={el1.name}
                                    properties={GenerateProperties(el1)}
                                    required={false}
                                  />
                                </>
                              )
                            })}
                          </Paper>
                          </>
                        )}
                      </>
                    )}
                  </>
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
          <button onClick={() => onSubmit(elements)}></button>
        </Box>
      </Paper>
    </>
  )
}
