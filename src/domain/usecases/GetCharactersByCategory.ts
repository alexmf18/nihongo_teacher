import { Character, CharacterCategory } from '../entities/Character'
import { ICharacterRepository } from '../repositories/ICharacterRepository'

export class GetCharactersByCategory {
  constructor(private repository: ICharacterRepository) {}

  execute(category: CharacterCategory): Character[] {
    return this.repository.getByCategory(category)
  }
}
