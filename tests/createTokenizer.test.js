const t = require('tap')
const {regexRule, createTokenizer} = require('..')

t.test('Create JSON tokenizer', async t => {
  let tokenize = createTokenizer({
    rules: [
      regexRule('_whitespace', /^\s+/),
      regexRule('brace', /^[{}]/),
      regexRule('bracket', /^[\[\]]/),
      regexRule('colon', /^:/),
      regexRule('comma', /^,/),
      regexRule('string', /^"([^"\n\\]|\\[^\n])*"/),
      regexRule('number', /^(-|\+)?\d+(.\d+)?/),
      regexRule('boolean', /^\w+/, match =>
        ['true', 'false'].includes(match[0]) ? match[0] : null
      ),
      regexRule('null', /^\w+/, match =>
        match[0] === 'null' ? match[0] : null
      )
    ]
  })

  let test = {
    a: [0, 1.234, -2, null],
    b: {
      k1: '"hello \nworld"',
      k2: false
    }
  }

  let input = JSON.stringify(test, null, '  ')
  let lines = input.split('\n')

  let tokens = [...tokenize(input)]
  t.matchSnapshot(tokens, 'Test JSON tokens')

  // Test token position tracking

  for (let token of tokens) {
    t.equal(input.slice(token.pos, token.pos + token.length), token.value)
    t.equal(
      lines[token.row].slice(token.col, token.col + token.length),
      token.value
    )
  }

  // Test reconstruction

  let reconstructed = tokens.map(t => t.value).join('')
  t.strictDeepEqual(JSON.parse(reconstructed), test)

  // Test invalid tokens

  tokens = [...tokenize('{a: 0, "b": truey}')]
  t.matchSnapshot(tokens, 'Test invalid token')
})
