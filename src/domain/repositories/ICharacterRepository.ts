import { Character, CharacterCategory, PhraseCategory } from '../entities/Character'

export interface ICharacterRepository {
  getByCategory(category: CharacterCategory, subCategory?: PhraseCategory): Character[]
  getAll(): Character[]
}
