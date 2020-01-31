# doken [![CI Status](https://github.com/yishn/doken/workflows/CI/badge.svg?branch=master)](https://github.com/yishn/doken/actions)

A minimalistic, general purpose tokenizer generator.

## Usage

Use npm to install:

```
$ npm install doken
```

Import doken and create a tokenizer with regular expression rules:

```js
const {createTokenizer, regexRule} = require('doken')

const tokenizeJSON = createTokenizer({
  rules: [
    regexRule('_whitespace', /^\s+/),
    regexRule('brace', /^[{}]/),
    regexRule('bracket', /^[\[\]]/),
    regexRule('colon', /^:/),
    regexRule('comma', /^,/),
    regexRule('string', /^"([^"\n\\]|\\[^\n])*"/),
    regexRule('number', /^(-|\+)?\d+(.\d+)?/),
    regexRule('boolean', /^(true|false)(?!\w)/),
    regexRule('null', /^null(?!\w)/)
  ]
})

let tokens = tokenizeJSON("{a: 'Hello World!'}")

console.log([...tokens])
```
