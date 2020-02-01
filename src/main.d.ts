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
  match?(input: string): RuleMatch | null
}

export interface RuleMatch {
  length: number
  value?: any
}

export function regexRule(
  type: string,
  regex: RegExp,
  value?: (match: RegExpExecArray) => any
): Rule

export function keywordRule(
  type: string,
  regex: RegExp,
  keywords: string[]
): Rule

export function createTokenizer(options: {
  rules: Rule[]
  strategy?: 'first' | 'longest'
}): (input: string) => IterableIterator<Token>
