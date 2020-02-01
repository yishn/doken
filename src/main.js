exports.regexRule = function(
  type,
  regex,
  {lineBreaks, value = match => match[0], condition = match => true} = {}
) {
  return {
    type,
    match(input) {
      let match = regex.exec(input)
      if (match == null || match.index !== 0 || !condition(match)) return null

      return {
        length: match[0].length,
        value: value(match)
      }
    },
    lineBreaks
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
          let mightContainLineBreaks = false

          for (let rule of rules) {
            let match = rule.match(restInput)
            if (match == null) continue

            let value = match.value
            if (value === undefined) value = restInput.slice(0, match.length)

            if (token == null || token.length < match.length) {
              token = {
                type: rule.type,
                value,
                row,
                col,
                pos,
                length: match.length
              }

              mightContainLineBreaks = !!rule.lineBreaks
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

            mightContainLineBreaks = true
          }

          // Update source position

          let newlines = 0
          let lastNewLineIndex = -1

          if (mightContainLineBreaks) {
            newlines = Array.from(
              restInput.slice(0, token.length)
            ).filter((c, i) =>
              c === '\n' ? ((lastNewLineIndex = i), true) : false
            ).length

            row += newlines
          }

          if (newlines > 0) {
            col = token.length - lastNewLineIndex - 1
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
