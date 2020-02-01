exports.regexRule = function(type, regex, value = match => match[0]) {
  return {
    type,
    match(input) {
      let match = regex.exec(input)
      if (match == null || match.index !== 0) return null

      return {
        length: match[0].length,
        value: value(match)
      }
    }
  }
}

exports.keywordRule = function(type, regex, keywords) {
  let rule = exports.regexRule(type, regex)

  return {
    type,
    match(input) {
      let match = rule.match(input)
      if (match == null || !keywords.includes(match.value)) return null

      return match
    }
  }
}

exports.createTokenizer = function({rules, strategy = 'first'}) {
  if (!['first', 'longest'].includes(strategy)) {
    throw new TypeError(
      "Only 'first' and 'longest' are allowed as values for the strategy option."
    )
  }

  return function tokenize(input) {
    let row = 0
    let col = 0
    let pos = 0
    let restInput = input

    return {
      [Symbol.iterator]() {
        return this
      },

      next() {
        while (restInput.length > 0) {
          let token = null

          for (let {type, match: rule} of rules) {
            let match = rule(restInput)
            if (match == null) continue

            let value = match.value
            if (value === undefined) value = restInput.slice(0, match.length)

            if (token == null || token.length < match.length) {
              token = {
                type,
                value,
                row,
                col,
                pos,
                length: match.length
              }
            }

            if (strategy === 'first') break
          }

          if (token == null) {
            token = {
              type: null,
              value: restInput[0],
              row,
              col,
              pos,
              length: 1
            }
          }

          // Update source position

          let newlineIndices = Array.from(restInput.slice(0, token.length))
            .map((c, i) => (c === '\n' ? i : null))
            .filter(x => x != null)

          row += newlineIndices.length

          if (newlineIndices.length > 0) {
            col = token.length - newlineIndices.slice(-1)[0] - 1
          } else {
            col += token.length
          }

          pos += token.length
          restInput = restInput.slice(token.length)

          // Return token

          if (token.type == null || token.type[0] !== '_') {
            return {value: token, done: false}
          }
        }

        return {done: true}
      }
    }
  }
}
