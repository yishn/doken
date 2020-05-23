exports.regexRule = function(
  type,
  regex,
  {
    lineBreaks = false,
    value = (match, state) => match[0],
    last = (match, state) => false,
    condition = (match, state) => true,
    nextState = (match, state) => state
  } = {}
) {
  if (!regex.sticky && !regex.global) {
    throw new TypeError(
      'Either sticky (/y, recommended) or global (/g) has to be enabled for the regular expresion.'
    )
  }

  return {
    type,
    lineBreaks,
    match(input, position, state) {
      regex.lastIndex = position

      let match = regex.exec(input)
      if (
        match == null ||
        match.index !== position ||
        !condition(match, state)
      ) {
        return null
      }

      return {
        length: match[0].length,
        value: value(match, state),
        last: last(match, state),
        state: nextState(match, state)
      }
    }
  }
}

exports.createTokenizer = function({rules, strategy = 'first', state = {}}) {
  if (!['first', 'longest'].includes(strategy)) {
    throw new TypeError(
      "Only 'first' and 'longest' are allowed as values for the strategy option."
    )
  }

  return function tokenize(input) {
    return {
      state,
      row: 0,
      col: 0,
      pos: 0,
      done: false,

      [Symbol.iterator]() {
        return this
      },

      next() {
        while (!this.done && this.pos < input.length) {
          let token, tokenText, match
          let lineBreaks = false

          for (let rule of rules) {
            match = rule.match(input, this.pos, this.state)
            if (match == null) continue

            let value = match.value
            if (value === undefined) {
              value = tokenText = input.substr(this.pos, match.length)
            }

            if (token == null || token.length < match.length) {
              token = {
                type: rule.type,
                value,
                row: this.row,
                col: this.col,
                pos: this.pos,
                length: match.length
              }

              lineBreaks = !!rule.lineBreaks
            }

            if (strategy === 'first') break
          }

          if (token == null) {
            token = {
              type: null,
              value: input[this.pos],
              row: this.row,
              col: this.col,
              pos: this.pos,
              length: 1
            }

            lineBreaks = true
          }

          // Update source position

          let newLineCount = 0
          let lastNewLineIndex = -1

          if (lineBreaks) {
            if (tokenText == null) {
              tokenText = input.substr(this.pos, token.length)
            }

            newLineCount = Array.from(tokenText).filter((c, i) => {
              if (c === '\n') {
                lastNewLineIndex = i
                return true
              }

              return false
            }).length

            this.row += newLineCount
          }

          if (newLineCount > 0) {
            this.col = token.length - lastNewLineIndex - 1
          } else {
            this.col += token.length
          }

          this.pos += token.length

          // Return token

          if (match != null && match.state != null) {
            this.state = match.state
            this.done = !!match.last
          }

          if (token.type == null || token.type[0] !== '_') {
            return {value: token, done: false}
          }
        }

        return {done: true}
      }
    }
  }
}
