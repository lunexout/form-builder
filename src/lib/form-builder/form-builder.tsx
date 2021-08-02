import { Box, Button, Paper, Typography } from '@material-ui/core'
import { ObjectSchema } from './types'

import { TextInput } from './../../components/TextInput'
import {SelectInput} from './../../components/SelectInput'
import { useState } from 'react'

import {ShowAlert} from './../../components/Alert'

type Props = {
  jsonData: string
  schema: ObjectSchema
  onSubmit: (values: any) => void
}
interface DataSchema {
  name: string
  value: any
}
const GenerateProperties = (el:any):object => {
  return {
    type: el.inputType && el.inputType,
    min: el.minLength && el.minLength,
    max: el.maxLength && el.maxLength,
    pattern: el.pattern && el.pattern,
    multiline: el.multiline && el.multiline,
  }
}
export const FormBuilder = ({ jsonData, schema, onSubmit }: Props) => {
  const [elements, setElements] = useState<Array<DataSchema>>([])
  const STRING = 'string'
  const NUMBER = 'number'
  const ENUM = 'ENUM'
  const ARRAY = 'array'
  const OBJECT = 'object'

  let readyData = JSON.parse(jsonData) //
  let value: any

  const findElement = (el:any, label: string, value:string) => {
    el.properties.forEach((el:any) => {
      if(el.type === OBJECT) el.properties && findElement(el,label,value)
      else if(el.label === label) el.value = value
    })
  }
  const handleChange = (event: any): void => {
      readyData.properties.forEach((el:any) => {
        switch(el.type){
          case OBJECT: {
            el.properties.map((ele:any) => {
              if(ele.label === event.label) ele.value = event.val
              else if(ele.type == OBJECT) findElement(ele, event.label, event.val)
            })
            break;
          }
          default: { el.name == event.name && (el.value = event.val) }
        }
      })
      console.log(readyData)
  }

  // ShowAlert({error: true, text: 'Please fill the technology input', header: 'Tech input error'})

  const RenderNestedObjects = (ele:any) => {
    return(
      <>
      {ele.type === OBJECT && (
        <Paper style={{marginTop:7,padding:20,display: 'flex', flexDirection: 'column',}}>
        <Typography variant="h5" gutterBottom>{ele.label}</Typography>
          {ele.properties.map((el1:any, index:number) => {
            return(
              <>
              {el1.type !== OBJECT && (
                <TextInput props={el1} key={el1.name + index} value={value} handleChange={handleChange}
                properties={GenerateProperties(el1)} required={el1.required ? true : false} /> )}
              {RenderNestedObjects(el1)}
              </>
              )
            })
          }
        </Paper>
      )
      }
      </>
    )
  }

  const RenderContent = (el: any, index: number) => {
    if(el.type === STRING || el.type === NUMBER){
      return(
        <TextInput props={el} key={el.name + index} value={value} handleChange={handleChange}
          properties={GenerateProperties(el)} required={el.required ? true : false} />
      )
    }else if(el.type === ENUM){
      return(
        <SelectInput key={el.name + index} label={el.label!} value={value} handleChange={handleChange} type={el.type}
          name={el.name} options={el.options} />
      )
    }else if(el.type === OBJECT){
      return(
        <Paper style={{marginTop:7,padding:20,display: 'flex', flexDirection: 'column',}}>
        <Typography variant="h5" gutterBottom>{el.label}</Typography>
        {el.properties.map((ele:any) => {
          return(
            <>
            {ele.type === OBJECT ? RenderNestedObjects(ele) : (
            <TextInput props={ele} key={ele.name} value={value} handleChange={handleChange} properties= {GenerateProperties(ele)} required={ele.required ? true : false}  /> )}
            </>
          )
        })}
        </Paper>
      )
    }else if(el.type === ARRAY){
      return(
        <Paper style={{marginTop:7,padding:20}}>
        <Typography variant="h5" gutterBottom>{el.label}</Typography>
        <Paper style={{height:200, display: 'flex', flexDirection: 'column',padding:20}}>
                        {/* {el.item.properties.map((el1:any) => {
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
                        })} */}
        <Button style={{width: 100,marginTop: 10}}  variant="outlined">Add</Button>
        </Paper>
        </Paper>
      )
    }
  }

  const RenderTextFields = () => {
    return (
      <>
        {readyData.properties.map((el:any,index:number) => {
          return (
            RenderContent(el,index)
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
          {RenderTextFields()}
          {/* Code here */}
          <button onClick={() => onSubmit(readyData)}></button>
        </Box>
      </Paper>
    </>
  )
}
