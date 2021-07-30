/**
 * Glossary
 *
 * - `?` means optional type. The property marked with `?` can either exist or not exist on an object.
 *   https://www.typescriptlang.org/docs/handbook/2/objects.html#optional-properties
 *
 * - 'string', 'number', 'enum', 'boolean' are literal types - subtypes of a `string` type.
 *   They are used for pattern matching.
 *   https://www.typescriptlang.org/docs/handbook/2/narrowing.html#discriminated-unions
 *
 * - `|` means union type. The value of the type `A | B` can either match the `A` or `B` type.
 *   https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#union-types
 */

//

export type StringSchema = {
  type: 'string'
  name: string
  label?: string
  required?: boolean
  multiline?: boolean
  inputType?: string
  minLength?: number
  maxLength?: number
  pattern?: string
}

export type NumberSchema = {
  type: 'number'
  name: string
  label?: string
  required?: boolean
  integer?: boolean
  minimum?: number
  maximum?: number
}

export type EnumSchema = {
  type: 'enum'
  name: string
  label?: string
  required?: boolean
  options: Array<{ value: string; label: string }>
}

export type BooleanSchema = {
  type: 'boolean'
  name: string
  label?: string
}

export type ArraySchema = {
  type: 'array'
  name: string
  label?: string
  required?: boolean
  item: ObjectSchema
}

export type ObjectSchema = {
  type: 'object'
  name: string
  label?: string
  properties: Array<FormSchema>
}

export type FormSchema =
  | StringSchema
  | NumberSchema
  | EnumSchema
  | BooleanSchema
  | ArraySchema
  | ObjectSchema
