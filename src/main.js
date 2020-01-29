exports.regexRule = function(type, regex, transform = match => match[0]) {
  return {
    type,
    match: input => {
      let match = regex.exec(input)
      if (match == null || match.index !== 0) return null

      return {
        length: match[0].length,
        value: transform(match)
      }
    }
  }
}

exports.createTokenizer = function({rules, shouldStop = token => false}) {
  return function tokenize(input) {
    let row = 0
    let col = 0
    let pos = 0
    let restInput = input
    let finished = false

    return {
      [Symbol.iterator]() {
        return this
      },

      next() {
        while (!finished && restInput.length > 0) {
          let token = null

          for (let {type, match: rule} of rules) {
            let match = rule(restInput)
            if (match == null) continue

            let value = match.value
            if (value === undefined) value = restInput.slice(0, match.length)

            token = {
              type,
              value,
              row,
              col,
              pos,
              length: match.length
            }
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

          if (shouldStop(token)) {
            finished = true
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
