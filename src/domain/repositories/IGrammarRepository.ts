import { GrammarCategory, GrammarItem } from '../entities/GrammarItem'

export interface IGrammarRepository {
  getByKind<K extends GrammarCategory>(kind: K): Extract<GrammarItem, { kind: K }>[]
  getAll(): GrammarItem[]
}
