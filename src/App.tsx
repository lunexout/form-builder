import {
  Box,
  Container,
  createTheme,
  CssBaseline,
  Dialog,
  DialogContent,
  DialogTitle,
  MuiThemeProvider,
  Paper,
} from '@material-ui/core'
import { FormBuilder } from 'lib/form-builder'
import { useState } from 'react'
import { studentProfileSchema } from 'schemas/student-profile'
import ReactJson from 'react-json-view'

const theme = createTheme({
  props: {
    MuiTextField: {
      variant: 'outlined',
      margin: 'dense',
    },
    MuiFormControl: {
      variant: 'outlined',
      margin: 'dense',
    },
  },
})

export const App = () => {
  const [submittedData, setSubmittedData] = useState<any>(null)

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box p={2}>
          <Paper>
            <FormBuilder
              schema={studentProfileSchema}
              onSubmit={values => {
                setSubmittedData(values)
              }}
            />
          </Paper>
        </Box>
      </Container>
      <Dialog
        open={submittedData !== null}
        maxWidth="sm"
        fullWidth
        onClose={() => setSubmittedData(null)}
      >
        <DialogTitle>Submitted form</DialogTitle>
        <DialogContent>
          <ReactJson
            src={submittedData}
            displayDataTypes={false}
            displayObjectSize={false}
            enableClipboard={false}
            name={null}
          />
        </DialogContent>
      </Dialog>
    </MuiThemeProvider>
  )
}
