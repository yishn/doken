export interface Token<T extends string, V = string> {
  type: T | null
  value: V
  row: number
  col: number
  pos: number
  length: number
}

export interface Rule<T extends string, V = string, S = {}> {
  type: T
  lineBreaks?: boolean
  match(input: string, position: number, state: S): RuleMatch<V, S> | null
}

export interface RuleMatch<V = string, S = {}> {
  length: number
  value?: V
  last?: boolean
  state?: S
}

export function regexRule<T extends string, V = string, S = {}>(
  type: T,
  regex: RegExp,
  options?: {
    lineBreaks?: boolean
    value?: (match: RegExpExecArray, state: S) => V
    last?: (match: RegExpExecArray, state: S) => boolean
    condition?: (match: RegExpExecArray, state: S) => boolean
    nextState?: (match: RegExpExecArray, state: S) => S
  }
): Rule<T, V, S>

export function createTokenizer<T extends string, V, S = {}>(options: {
  rules: Rule<T, V, S>[]
  strategy?: 'first' | 'longest'
  state?: S
}): (input: string) => IterableIterator<Token<T, V>>
