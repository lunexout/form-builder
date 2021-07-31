import { Box, Button, Paper, Typography } from '@material-ui/core'
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
interface TechSchema {
  value:any
}
export const FormBuilder = ({ schema, onSubmit }: Props) => {
  const [elements, setElements] = useState<Array<DataSchema>>([])
  const [techs,setTechs] = useState<Array<TechSchema>>([])

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
    console.log(event)
    if(event.name === 'technologies') {
      setTechs(old => [...old, {value: event.val}])
    }else{
      elements.forEach(el => {
        if(el.name == event.name){el.value = event.val}
      })
    }
    console.log(elements);
    console.log(techs)
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
                  <>
                    {el.type === 'array' ?(
                      <>
                      <Paper style={{height:300,marginTop:7,padding:20}}>
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
                              identor={el.name}
                              properties={GenerateProperties(el1)}
                            />
                            </>
                          )
                        })}
                        <Button style={{width: 100,marginTop: 10}} variant="outlined">Add</Button>
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
                                    identor={el1.name}
                                    properties={GenerateProperties(el1)}
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
        </Box>
      </Paper>
    </>
  )
}
