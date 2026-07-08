import { Character, CharacterCategory, PhraseCategory } from '../../domain/entities/Character'
import { ICharacterRepository } from '../../domain/repositories/ICharacterRepository'
import { characterData } from '../datasources/characterData'

export class CharacterRepositoryImpl implements ICharacterRepository {
  getByCategory(category: CharacterCategory, subCategory?: PhraseCategory): Character[] {
    let chars = characterData.filter((c) => c.category === category)
    if (subCategory !== undefined) {
      chars = chars.filter((c) => c.phraseCategory === subCategory)
    }
    return chars
  }

  getAll(): Character[] {
    return [...characterData]
  }
}
