// eslint-disable-next-line prettier/prettier
import {Button, Paper, Typography } from '@material-ui/core'
// import { ObjectSchema } from './types'

import { TextInput } from './../components/TextInput'
import { SelectInput } from './../components/SelectInput'

import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import './../css/style.css'
// import { ShowAlert } from './../../components/Alert'
const STRING = 'string'
const NUMBER = 'number'
const ENUM = 'enum'
const ARRAY = 'array'
const OBJECT = 'object'
const BOOLEAN = 'boolean'

type Props = {
  RenderNestedObjects: any
  el: any
  value: any
  index: any
  SetValue: any
  AddElement: any
  DeleteElement: any
  GenerateProperties: any
}
export const RenderContent = ({
  RenderNestedObjects,
  GenerateProperties,
  AddElement,
  DeleteElement,
  value,
  SetValue,
  el,
  index,
}: Props) => {
  const RenderAsJsx = () => {
    if (el.type === STRING || el.type === NUMBER) {
      return (
        <TextInput
          props={el}
          key={index}
          index={index}
          value={value}
          handleChange={SetValue}
          properties={GenerateProperties(el)}
          required={el.required ? true : false}
        />
      )
    } else if (el.type === ENUM) {
      return (
        <SelectInput
          key={index}
          el={el}
          index={index}
          label={el.label!}
          value={value}
          handleChange={SetValue}
          type={el.type}
          name={el.name}
          options={el.options}
        />
      )
    } else if (el.type === OBJECT) {
      return (
        <Paper className="paper-style">
          <Typography variant="h5" gutterBottom>
            {el.label}
          </Typography>
          {el.properties.map((ele: any, i: number) => {
            let indexPath = index.toString() + ';' + i.toString()
            return ele.type === OBJECT ? (
              RenderNestedObjects(ele, indexPath)
            ) : (
              <RenderContent
                RenderNestedObjects={RenderNestedObjects}
                GenerateProperties={GenerateProperties}
                AddElement={AddElement}
                DeleteElement={DeleteElement}
                value={value}
                SetValue={SetValue}
                el={ele}
                index={indexPath}
              />
            )
          })}
        </Paper>
      )
    } else if (el.type === ARRAY) {
      return (
        <Paper style={{ marginTop: 7, padding: 20 }}>
          <Typography variant="h5" gutterBottom>
            {el.label}
          </Typography>
          <Paper className="paper-style">
            {el.item.map((ele: any, i: string) => {
              let indexPath = index.toString() + ';' + i.toString()
              return (
                <>
                  <div className="paper-div">
                    {ele.type === OBJECT ? (
                      RenderNestedObjects(ele, indexPath)
                    ) : (
                      <RenderContent
                        RenderNestedObjects={RenderNestedObjects}
                        GenerateProperties={GenerateProperties}
                        AddElement={AddElement}
                        DeleteElement={DeleteElement}
                        value={value}
                        SetValue={SetValue}
                        el={ele}
                        index={indexPath}
                      />
                    )}
                    <Button
                      style={{ width: 100, marginTop: 10 }}
                      onClick={() => DeleteElement(el, i)}
                      variant="outlined"
                      disabled={el.item.length > 1 ? false : true}
                    >
                      Remove
                    </Button>
                  </div>
                </>
              )
            })}
            <Button
              style={{ width: 100, marginTop: 10 }}
              onClick={() => AddElement(el)}
              variant="outlined"
            >
              Add
            </Button>
          </Paper>
        </Paper>
      )
    } else if (el.type === BOOLEAN) {
      console.log(el, 'sfsd')
      return (
        <FormControlLabel
          control={
            <Checkbox
              checked={value}
              onChange={e => {
                value = e.target.checked
                SetValue({ val: e.target.checked, index })
              }}
              name={el.name}
              color="primary"
            />
          }
          label={el.label}
        />
      )
    }
  }
  return <>{RenderAsJsx()}</>
}
