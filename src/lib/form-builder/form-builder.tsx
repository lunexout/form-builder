import { Box, Button, Paper, Typography } from '@material-ui/core'
import { ObjectSchema } from './types'

import { TextInput } from './../../components/TextInput'
import {SelectInput} from './../../components/SelectInput'
import { useState } from 'react'

import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import {ShowAlert} from './../../components/Alert'

type Props = {
  jsonData: string
  // schema: ObjectSchema
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
export const FormBuilder = ({ jsonData, onSubmit }: Props) => {
  const [elements, setElements] = useState<Array<DataSchema>>([])

  const STRING = 'string'
  const NUMBER = 'number'
  const ENUM = 'enum'
  const ARRAY = 'array'
  const OBJECT = 'object'
  const BOOLEAN = 'boolean'

  let readyData = JSON.parse(jsonData) //
  let value: any

  const SetNestedElementValue = (el:any, label: string, value:string) => {
    el.properties.forEach((el:any) => {
      if(el.type === OBJECT) el.properties && SetNestedElementValue(el,label,value)
      else if(el.label === label) el.value = value
    })
  }
  const SetValue = (event: any): void => {
      readyData.properties.forEach((el:any) => {
        switch(el.type){
          case OBJECT: {
            el.properties.map((ele:any) => {
              if(ele.label === event.label) ele.value = event.val
              else if(ele.type === OBJECT) SetNestedElementValue(ele, event.label, event.val)
            })
            break;
          }
          case ARRAY: {
            el.item.map((ele:any) => {
              console.log(ele.label, event.label)
              if(ele.label === event.label) ele.value = event.val
              else if(ele.type === OBJECT) SetNestedElementValue(ele, event.label, event.val)
            })
            break;
          }
          default: { el.name === event.name && (el.value = event.val) }
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
            return(<>
              {el1.type !== OBJECT && RenderContent(el1,index)}
              {RenderNestedObjects(el1)}
            </>)
          })}
        </Paper>
      )
      }
      </>
    )
  }

  const RenderContent = (el: any, index: number) => {
    if(el.type === STRING || el.type === NUMBER){
      return(
        <TextInput props={el} key={el.name + index} value={value} handleChange={SetValue}
          properties={GenerateProperties(el)} required={el.required ? true : false} />
      )
    }else if(el.type === ENUM){
      return(
        <SelectInput key={el.name} label={el.label!} value={value} handleChange={SetValue}
        type={el.type} name={el.name} options={el.options} />
      )
    }else if(el.type === OBJECT){
      return(
        <Paper style={{marginTop:7,padding:20,display: 'flex', flexDirection: 'column',}}>
        <Typography variant="h5" gutterBottom>{el.label}</Typography>
        {el.properties.map((ele:any) => {
          return(
            ele.type === OBJECT ? RenderNestedObjects(ele) : (
            <TextInput props={ele} key={ele.name} value={value} handleChange={SetValue}
            properties= {GenerateProperties(ele)} required={ele.required ? true : false}  /> )
          )
        })}
        </Paper>
      )
    }else if(el.type === ARRAY){
      return(
        <Paper style={{marginTop:7,padding:20}}>
        <Typography variant="h5" gutterBottom>{el.label}</Typography>
        <Paper style={{ display: 'flex', flexDirection: 'column',padding:20}}>
          {el.item.map((ele: any)=> {
            return(
              <>
                {ele.type === OBJECT ? RenderNestedObjects(ele) : (
                <TextInput props={ele} key={ele.name} value={value} handleChange={SetValue}
                properties= {GenerateProperties(ele)} required={ele.required ? true : false}  /> )}
              </>
            )
          })}
        <Button style={{width: 100,marginTop: 10}}  variant="outlined">Add</Button>
        </Paper>
        </Paper>
      )
    }else if(el.type === BOOLEAN) {
      return(
        <FormControlLabel
        control={
          <Checkbox
            checked={value}
            onChange={(e) => { value=e.target.value, SetValue({ val: value, name: el.name}) }}
            name={el.name}
            color='primary'
          />
        }
        label={el.label}
      />
      )
    }
  }

  const RenderFields = () => { return( readyData.properties.map((el:any,index:number) => { return RenderContent(el,index) }) ) }

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
            {readyData.label}
          </Typography>
          {RenderFields()}
          <Button variant="contained" color="primary" style={{marginTop: 15}} onClick={() => onSubmit(readyData)}> Submit </Button>
        </Box>
      </Paper>
    </>
  )
}
