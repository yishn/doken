export interface Token<T extends string> {
  type: T | null
  value: any
  row: number
  col: number
  pos: number
  length: number
}

export interface Rule<T extends string> {
  type: T
  lineBreaks?: boolean
  match(input: string, position: number): RuleMatch | null
}

export interface RuleMatch {
  length: number
  value?: any
}

export function regexRule<T extends string>(
  type: T,
  regex: RegExp,
  options: {
    lineBreaks?: boolean
    value?: (match: RegExpExecArray) => any
    condition?: (match: RegExpExecArray) => boolean
  }
): Rule<T>

export function createTokenizer<T extends string>(options: {
  rules: Rule<T>[]
  strategy?: 'first' | 'longest'
}): (input: string) => IterableIterator<Token<T>>
