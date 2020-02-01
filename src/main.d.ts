export interface Token {
  type: string | null
  value: any
  row: number
  col: number
  pos: number
  length: number
}

export interface Rule {
  type: string
  match(input: string): RuleMatch | null
  lineBreaks?: boolean
}

export interface RuleMatch {
  length: number
  value?: any
}

export function regexRule(
  type: string,
  regex: RegExp,
  options: {
    lineBreaks?: boolean
    value?: (match: RegExpExecArray) => any
    condition?: (match: RegExpExecArray) => boolean
  }
): Rule

export function createTokenizer(options: {
  rules: Rule[]
  strategy?: 'first' | 'longest'
}): (input: string) => IterableIterator<Token>
