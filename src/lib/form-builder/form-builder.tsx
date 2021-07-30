import { Box, Paper, Typography } from '@material-ui/core'
import { ObjectSchema } from './types'

import { TextInput } from './../../components/TextInput'
import { useEffect, useState } from 'react'

type Props = {
  schema: ObjectSchema
  onSubmit: (values: any) => void
}

export const FormBuilder = ({ schema, onSubmit }: Props) => {
  let value: any
  const [elements, setElements] = useState([])

  schema.properties.map(el => {})

  let ss = schema.properties

  console.log(ss)
  // useEffect(() => {}, [])

  const handleChange = (event: string): void => {
    // let newElements = [...elements]
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
                  />
                </>
              ) : (
                <></>
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
