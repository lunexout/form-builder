import { FormBuilder } from 'lib/form-builder'
import { useState } from 'react'
import { Layout } from 'Layout'
// import { studentProfileSchema } from 'schemas/student-profile'/
import { ResultDialog } from 'ResultDialog'
import firebase from './firebase/firebase'
// import {ObjectSchema} from 'lib/form-builder/types'
// import Ajv from "ajv"
export const App = () => {
  const [submittedData, setSubmittedData] = useState<any>(null)
  // let TYPE:ObjectSchema
  return (
    <Layout
      render={jsonInput => {
        // `jsonInput` is a raw string. You need to convert it to the object of `ObjectSchema` type.
        // There are two types of validations that must take place:
        // 1. Check that `jsonInput` is a valid json.
        // 2. Check that it matches the schema described by the `ObjectSchema` type.
        //    This step is called "Runtime data validation".

        // Replace hardcoded `studentProfileSchema` with the parsed `jsonInput`.
        try {
          // const ajv = new Ajv()
          // const test = ajv.compile(TYPE)
          // const valid = test(JSON.parse(jsonInput))
          // if (!valid) console.log(test.errors)
          return (
            <>
              <FormBuilder
                jsonData={JSON.parse(jsonInput)}
                onSubmit={(values: any) => {
                  setSubmittedData(values)
                  // Send data to Firestore here.
                  firebase.firestore().collection("forms").doc(`${values.name}`).set(values);
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
