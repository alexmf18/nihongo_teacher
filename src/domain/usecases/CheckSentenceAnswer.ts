import { SentenceItem } from '../entities/GrammarItem'

function normalize(text: string): string {
  return text.replace(/[\s。、？！?!]/g, '')
}

export class CheckSentenceAnswer {
  // `answer` is the learner's chunks joined in the order they placed them.
  execute(item: SentenceItem, answer: string): boolean {
    const normalizedAnswer = normalize(answer)
    if (!normalizedAnswer) return false
    const orders = [item.chunks, ...(item.alternativeOrders ?? [])]
    return orders.some((order) => normalize(order.join('')) === normalizedAnswer)
  }
}
