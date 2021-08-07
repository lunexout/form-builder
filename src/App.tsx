import { FormBuilder } from 'lib/form-builder'
import { useState } from 'react'
import { Layout } from 'Layout'
import { ResultDialog } from 'ResultDialog'
import firebase from './firebase/firebase'
export const App = () => {
  const [submittedData, setSubmittedData] = useState<any>(null)
  return (
    <Layout
      render={jsonInput => {
        // Replace hardcoded `studentProfileSchema` with the parsed `jsonInput`.
        try {

          return (
            <>
              <FormBuilder
                jsonData={JSON.parse(jsonInput)}
                onSubmit={(values: any) => {
                  setSubmittedData(values)
                  // Send data to Firestore here.
                  firebase.firestore().collection("forms").doc().set(values);
                }}
              />

              <ResultDialog
                data={submittedData}
                onClose={() => window.location.reload()}
              />
            </>
          )
        } catch (error) {
          alert(error)
        }
      }}
    />
  )
}
