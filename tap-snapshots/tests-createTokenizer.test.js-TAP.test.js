/* IMPORTANT
 * This snapshot file is auto-generated, but designed for humans.
 * It should be checked into source control and tracked carefully.
 * Re-generate by setting TAP_SNAPSHOT=1 and running tests.
 * Make sure to inspect the output below.  Do not ignore changes!
 */
'use strict'
exports[
  `tests/createTokenizer.test.js TAP Create JSON tokenizer > Test JSON tokens 1`
] = `
Array [
  Object {
    "col": 0,
    "length": 1,
    "pos": 0,
    "row": 0,
    "type": "brace",
    "value": "{",
  },
  Object {
    "col": 2,
    "length": 3,
    "pos": 4,
    "row": 1,
    "type": "string",
    "value": "\\"a\\"",
  },
  Object {
    "col": 5,
    "length": 1,
    "pos": 7,
    "row": 1,
    "type": "colon",
    "value": ":",
  },
  Object {
    "col": 7,
    "length": 1,
    "pos": 9,
    "row": 1,
    "type": "bracket",
    "value": "[",
  },
  Object {
    "col": 4,
    "length": 1,
    "pos": 15,
    "row": 2,
    "type": "number",
    "value": "0",
  },
  Object {
    "col": 5,
    "length": 1,
    "pos": 16,
    "row": 2,
    "type": "comma",
    "value": ",",
  },
  Object {
    "col": 4,
    "length": 5,
    "pos": 22,
    "row": 3,
    "type": "number",
    "value": "1.234",
  },
  Object {
    "col": 9,
    "length": 1,
    "pos": 27,
    "row": 3,
    "type": "comma",
    "value": ",",
  },
  Object {
    "col": 4,
    "length": 2,
    "pos": 33,
    "row": 4,
    "type": "number",
    "value": "-2",
  },
  Object {
    "col": 6,
    "length": 1,
    "pos": 35,
    "row": 4,
    "type": "comma",
    "value": ",",
  },
  Object {
    "col": 4,
    "length": 4,
    "pos": 41,
    "row": 5,
    "type": "null",
    "value": "null",
  },
  Object {
    "col": 2,
    "length": 1,
    "pos": 48,
    "row": 6,
    "type": "bracket",
    "value": "]",
  },
  Object {
    "col": 3,
    "length": 1,
    "pos": 49,
    "row": 6,
    "type": "comma",
    "value": ",",
  },
  Object {
    "col": 2,
    "length": 3,
    "pos": 53,
    "row": 7,
    "type": "string",
    "value": "\\"b\\"",
  },
  Object {
    "col": 5,
    "length": 1,
    "pos": 56,
    "row": 7,
    "type": "colon",
    "value": ":",
  },
  Object {
    "col": 7,
    "length": 1,
    "pos": 58,
    "row": 7,
    "type": "brace",
    "value": "{",
  },
  Object {
    "col": 4,
    "length": 4,
    "pos": 64,
    "row": 8,
    "type": "string",
    "value": "\\"k1\\"",
  },
  Object {
    "col": 8,
    "length": 1,
    "pos": 68,
    "row": 8,
    "type": "colon",
    "value": ":",
  },
  Object {
    "col": 10,
    "length": 19,
    "pos": 70,
    "row": 8,
    "type": "string",
    "value": "\\"\\\\\\"hello \\\\nworld\\\\\\"\\"",
  },
  Object {
    "col": 29,
    "length": 1,
    "pos": 89,
    "row": 8,
    "type": "comma",
    "value": ",",
  },
  Object {
    "col": 4,
    "length": 4,
    "pos": 95,
    "row": 9,
    "type": "string",
    "value": "\\"k2\\"",
  },
  Object {
    "col": 8,
    "length": 1,
    "pos": 99,
    "row": 9,
    "type": "colon",
    "value": ":",
  },
  Object {
    "col": 10,
    "length": 5,
    "pos": 101,
    "row": 9,
    "type": "boolean",
    "value": "false",
  },
  Object {
    "col": 2,
    "length": 1,
    "pos": 109,
    "row": 10,
    "type": "brace",
    "value": "}",
  },
  Object {
    "col": 0,
    "length": 1,
    "pos": 111,
    "row": 11,
    "type": "brace",
    "value": "}",
  },
]
`

exports[
  `tests/createTokenizer.test.js TAP Create JSON tokenizer > Test invalid token 1`
] = `
Array [
  Object {
    "col": 0,
    "length": 1,
    "pos": 0,
    "row": 0,
    "type": "brace",
    "value": "{",
  },
  Object {
    "col": 1,
    "length": 1,
    "pos": 1,
    "row": 0,
    "type": null,
    "value": "a",
  },
]
`
