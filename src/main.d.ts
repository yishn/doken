export interface Token<T extends string> {
  type: T | null
  value: any
  row: number
  col: number
  pos: number
  length: number
}

export interface Rule<T extends string, S = {}> {
  type: T
  lineBreaks?: boolean
  match(input: string, position: number, state: S): RuleMatch<S> | null
}

export interface RuleMatch<S = {}> {
  length: number
  value?: any
  state?: S
}

export function regexRule<T extends string, S = {}>(
  type: T,
  regex: RegExp,
  options: {
    lineBreaks?: boolean
    value?: (match: RegExpExecArray) => any
    condition?: (match: RegExpExecArray) => boolean
  }
): Rule<T, S>

export function createTokenizer<T extends string, S = {}>(options: {
  rules: Rule<T, S>[]
  strategy?: 'first' | 'longest'
  state?: S
}): (input: string) => IterableIterator<Token<T>>
