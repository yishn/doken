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

export interface RuleOptions<T, V = string, S = {}> {
  lineBreaks?: boolean
  stateCondition?: (state: Readonly<S>) => boolean
  value?: (data: T, state: Readonly<S>) => V
  last?: (data: T, state: Readonly<S>) => boolean
  condition?: (data: T, state: Readonly<S>) => boolean
  nextState?: (data: T, state: Readonly<S>) => S
}

export function regexRule<T extends string | number, V = string, S = {}>(
  type: T,
  regex: RegExp,
  options?: RuleOptions<RegExpExecArray>
): Rule<T, V, S>

export function tokenizerRule<
  T extends string | number,
  ST extends string | number,
  SV,
  V = Token<ST, SV>[],
  S = {}
>(
  type: T,
  tokenize: IterableIterator<Token<ST, SV>>,
  options?: RuleOptions<Token<ST, SV>[]>
): Rule<T, V, S>

export function createTokenizer<T extends string | number, V, S = {}>(options: {
  rules: Rule<T, V, S>[]
  strategy?: 'first' | 'longest'
  state?: S
}): (input: string) => IterableIterator<Token<T, V>>
