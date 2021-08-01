var a = {
  "type": "object",
  "name": "test",
  "label": "Test",
  "properties": [
    {
      "type": "string",
      "name": "string_optional",
      "label": "String optional"
    },
    {
      "type": "string",
      "name": "string_required",
      "label": "String required",
      "required": true
    },
    {
      "type": "string",
      "name": "string_validated",
      "label": "String validated",
      "inputType": "tel",
      "minLength": 8,
      "maxLength": 20,
      "pattern": "^\\d{8,20}$"
    },
    {
      "type": "string",
      "name": "string_multiline",
      "label": "String multiline",
      "multiline": true
    },
    {
      "type": "number",
      "name": "number_optional",
      "label": "Number optional"
    },
    {
      "type": "number",
      "name": "number_required",
      "label": "Number required",
      "required": true
    },
    {
      "type": "number",
      "name": "number_validated",
      "label": "Number validated",
      "integer": true,
      "minimum": 1,
      "maximum": 6
    },
    {
      "type": "enum",
      "name": "enum_optional",
      "label": "Enum optional",
      "options": [
        {
          "value": "value1",
          "label": "Value 1"
        },
        {
          "value": "value2",
          "label": "Value 2"
        }
      ]
    },
    {
      "type": "enum",
      "name": "enum_required",
      "label": "Enum required",
      "required": true,
      "options": [
        {
          "value": "value1",
          "label": "Value 1"
        },
        {
          "value": "value2",
          "label": "Value 2"
        }
      ]
    },
    {
      "type": "boolean",
      "name": "boolean",
      "label": "Boolean"
    },
    {
      "type": "object",
      "name": "object",
      "label": "Object",
      "properties": [
        {
          "type": "string",
          "name": "string",
          "label": "String"
        },
        {
          "type": "object",
          "name": "object_nested",
          "label": "Object nested",
          "properties": [
            {
              "type": "string",
              "name": "string_nested",
              "label": "String nested"
            },
            {
              "type": "object",
              "name": "object_nested_2",
              "label": "Object nested 2",
              "properties": [
                {
                  "type": "string",
                  "name": "string_nested_2",
                  "label": "String nested 2"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "type": "array",
      "name": "array_simple",
      "label": "Array simple",
      "item": {
        "type": "object",
        "name": "object",
        "label": "Object",
        "properties": [
          {
            "type": "string",
            "name": "string",
            "label": "String"
          }
        ]
      }
    },
    {
      "type": "array",
      "name": "array_complex",
      "label": "Array complex",
      "required": true,
      "item": {
        "type": "object",
        "name": "object",
        "label": "Object",
        "properties": [
          {
            "type": "array",
            "name": "array_simple",
            "label": "Array simple",
            "item": {
              "type": "object",
              "name": "object",
              "label": "Object",
              "properties": [
                {
                  "type": "string",
                  "name": "string",
                  "label": "String"
                }
              ]
            }
          }
        ]
      }
    }
  ]
}
