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
interface TechSchema {
  value:any
  exp: number
}
interface ProjectSchema {
  name: string
  link: string
}
export const FormBuilder = ({ schema, onSubmit }: Props) => {
  const [elements, setElements] = useState<Array<DataSchema>>([])
  const [techs,setTechs] = useState<Array<TechSchema>>([])
  const [projects,setProjects] = useState<Array<ProjectSchema>>([])

  let value: any
  let technology = '';
  let experience = 0;

  let projectname = '';
  let projectlink = '';

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
    console.log(event.name, event.label)
    if(event.name === 'technologies') {
      event.label == 'Technology' ? technology = event.val : experience = event.val
    }else if(event.name === 'projects'){
      event.label == 'Name' ? projectname = event.val : projectlink = event.val;
    }else{
      elements.forEach(el => {
        if(el.name == event.name){el.value = event.val}
      })
    }
  }
  const AddElement = (element: string): void => {
    if(element == 'technologies') {
      if(technology == '') {
          ShowAlert({error: true, text: 'Please fill the technology input', header: 'Tech input error'})
      }else {
        if(experience > 6 || experience <= 0) {
          ShowAlert({error: true, text: 'Please fill or write correct experience', header: 'Experience input error'})
        }else {
          setTechs(old => [...old, {value: technology, exp: experience }])
        }
      }
    }else{
      if(projectname == '') {
        ShowAlert({error: true, text: 'Please fill the project name input', header: 'Project name input'})
      }else if(projectlink == '') {
        ShowAlert({error: true, text: 'Please fill the project link input', header: 'Project link input'})
      }else {
        setProjects(old => [...old, {name: projectname, link: projectlink }])
      }
    }
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
                    identor={el.name}
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
                              identor={el.name}
                              properties={GenerateProperties(el1)}
                              required={el.required ? el.required : false}
                            />
                            </>
                          )
                        })}
                        <Button style={{width: 100,marginTop: 10}} onClick={() => AddElement(el.name)}  variant="outlined">Add</Button>

                      </Paper>
                      <Paper>
                        {el.name === 'projects' ? (
                          <>
                          {projects.reverse().map(el => {
                          return(
                            <>
                              <div style={{padding: 20, display: 'flex'}}>
                                <div>
                                <Typography variant="h5" gutterBottom>Project Name: &nbsp;{el.name}</Typography>
                                <Typography variant="h5" gutterBottom>Project Link: &nbsp;{el.link}</Typography>
                                </div>
                                <div>
                                  <Button style={{width: 100,marginTop: 10}} onClick={() => {
                                    setProjects(projects.filter(el1 => el1 != el))
                                  }}  variant="outlined">Remove</Button>
                                </div>
                              </div>
                            </>
                          )
                          })}
                          </>
                        ) : (
                          <>
                          {techs.reverse().map(el => {
                            return(
                              <>
                                <div style={{padding: 20, display: 'flex'}}>
                                  <div>
                                  <Typography variant="h5" gutterBottom>Technology: &nbsp;{el.value}</Typography>
                                  <Typography variant="h5" gutterBottom>Experience(Years): &nbsp;{el.exp}</Typography>
                                  </div>
                                  <div>
                                    <Button style={{width: 100,marginTop: 10}} onClick={() => {
                                      setTechs(techs.filter(el1 => el1 != el))
                                    }}  variant="outlined">Remove</Button>
                                  </div>
                                </div>
                              </>
                            )
                          })}
                          </>
                        )}
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
