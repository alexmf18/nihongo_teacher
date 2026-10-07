import { GrammarCategory, GrammarItem } from '../../domain/entities/GrammarItem'
import { IGrammarRepository } from '../../domain/repositories/IGrammarRepository'
import { grammarData } from '../datasources/grammarData'
import { sentenceData } from '../datasources/sentenceData'

const allItems: GrammarItem[] = [...grammarData, ...sentenceData]

export class GrammarRepositoryImpl implements IGrammarRepository {
  getByKind<K extends GrammarCategory>(kind: K): Extract<GrammarItem, { kind: K }>[] {
    return allItems.filter((item): item is Extract<GrammarItem, { kind: K }> => item.kind === kind)
  }

  getAll(): GrammarItem[] {
    return [...allItems]
  }
}
