import { Box, Paper, Typography } from '@material-ui/core'
import { ObjectSchema } from './types'

type Props = {
  schema: ObjectSchema
  onSubmit: (values: any) => void
}

export const FormBuilder = ({ schema, onSubmit }: Props) => {
  return (
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
        {/* Code here */}
      </Box>
    </Paper>
  )
}
