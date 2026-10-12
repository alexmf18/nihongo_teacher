import { CheckKosoadoAnswer } from '../../../domain/usecases/CheckKosoadoAnswer'
import { GenerateGrammarChoices } from '../../../domain/usecases/GenerateGrammarChoices'
import { GrammarRepositoryImpl } from '../../../data/repositories/GrammarRepositoryImpl'
import { GrammarCategory, KosoadoItem } from '../../../domain/entities/GrammarItem'
import { findKosoado } from '../../../domain/entities/Kosoado'

const repository = new GrammarRepositoryImpl()
const items = repository.getByKind(GrammarCategory.KOSOADO)

function item(id: string): KosoadoItem {
  return items.find((i) => i.id === id)!
}

describe('kosoado data', () => {
  it('only uses words from the こそあど table', () => {
    expect(items.length).toBeGreaterThan(0)
    items.forEach((i) => {
      expect(findKosoado(i.word)).toBeDefined()
      ;(i.acceptableWords ?? []).forEach((w) => expect(findKosoado(w)).toBeDefined())
    })
  })
})

describe('CheckKosoadoAnswer', () => {
  const useCase = new CheckKosoadoAnswer()

  it('accepts the word in kana or romaji', () => {
    expect(useCase.execute(item('kosoado-asoko-1'), 'あそこ')).toBe(true)
    expect(useCase.execute(item('kosoado-asoko-1'), ' Asoko ')).toBe(true)
    expect(useCase.execute(item('kosoado-kochira-1'), 'kochira')).toBe(true)
    expect(useCase.execute(item('kosoado-konna-1'), 'konna')).toBe(true)
  })

  it('rejects the wrong distance and empty answers', () => {
    expect(useCase.execute(item('kosoado-kore-1'), 'それ')).toBe(false)
    expect(useCase.execute(item('kosoado-kore-1'), '')).toBe(false)
  })

  it('accepts the alternative words', () => {
    expect(useCase.execute(item('kosoado-dochira-1'), 'doko')).toBe(true)
  })
})

describe('GenerateGrammarChoices for kosoado', () => {
  const useCase = new GenerateGrammarChoices(repository)

  it('offers the other distances of the same kind', () => {
    const kore = item('kosoado-kore-1')
    const choices = useCase.execute({ id: kore.id, kind: GrammarCategory.KOSOADO, item: kore })
    expect(choices.sort()).toEqual(['あれ', 'これ', 'それ', 'どれ'].sort())
  })

  it('never offers another accepted word as a wrong option', () => {
    const dochira = item('kosoado-dochira-1')
    for (let i = 0; i < 10; i++) {
      const choices = useCase.execute({ id: dochira.id, kind: GrammarCategory.KOSOADO, item: dochira })
      expect(choices).toHaveLength(4)
      expect(choices).toContain('どちら')
      expect(choices).not.toContain('どこ')
    }
  })
})
