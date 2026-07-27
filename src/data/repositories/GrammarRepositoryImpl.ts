import { GrammarCategory, GrammarItem } from '../../domain/entities/GrammarItem'
import { IGrammarRepository } from '../../domain/repositories/IGrammarRepository'
import { grammarData } from '../datasources/grammarData'

export class GrammarRepositoryImpl implements IGrammarRepository {
  getByKind<K extends GrammarCategory>(kind: K): Extract<GrammarItem, { kind: K }>[] {
    return grammarData.filter((item): item is Extract<GrammarItem, { kind: K }> => item.kind === kind)
  }

  getAll(): GrammarItem[] {
    return [...grammarData]
  }
}
