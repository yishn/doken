export interface Token<T extends string | number, V = string> {
  type: T | null
  value: V
  row: number
  col: number
  pos: number
  length: number
}

export interface Rule<T extends string | number, V = string, S = {}> {
  type: T
  lineBreaks?: boolean
  match(
    input: string,
    position: number,
    state: Readonly<S>
  ): RuleMatch<V, S> | null
}

export interface RuleMatch<V = string, S = {}> {
  length: number
  value?: V
  last?: boolean
  state?: S
}

export function regexRule<T extends string | number, V = string, S = {}>(
  type: T,
  regex: RegExp,
  options?: {
    lineBreaks?: boolean
    stateCondition?: (state: Readonly<S>) => boolean
    value?: (match: RegExpExecArray, state: Readonly<S>) => V
    last?: (match: RegExpExecArray, state: Readonly<S>) => boolean
    condition?: (match: RegExpExecArray, state: Readonly<S>) => boolean
    nextState?: (match: RegExpExecArray, state: Readonly<S>) => S
  }
): Rule<T, V, S>

export function tokenizerRule<
  T extends string,
  ST extends string,
  SV,
  V = Token<ST, SV>[],
  S = {}
>(
  type: T,
  tokenize: IterableIterator<Token<ST, SV>>,
  options?: {
    lineBreaks?: boolean
    stateCondition?: (state: Readonly<S>) => boolean
    value?: (tokens: Token<ST, SV>[], state: Readonly<S>) => V
    last?: (tokens: Token<ST, SV>[], state: Readonly<S>) => boolean
    condition?: (tokens: Token<ST, SV>[], state: Readonly<S>) => boolean
    nextState?: (tokens: Token<ST, SV>[], state: Readonly<S>) => S
  }
): Rule<T, V, S>

export function createTokenizer<T extends string | number, V, S = {}>(options: {
  rules: Rule<T, V, S>[]
  strategy?: 'first' | 'longest'
  state?: S
}): (input: string) => IterableIterator<Token<T, V>>
