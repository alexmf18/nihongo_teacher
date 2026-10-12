// The romaji plus, if different, the same written without long vowels
// (juu → ju, tooka → toka, youka → yoka), which learners often type.
export function withShortVowels(romaji: string): string[] {
  const short = romaji.replace(/uu/g, 'u').replace(/oo/g, 'o').replace(/ou/g, 'o')
  return short === romaji ? [romaji] : [romaji, short]
}
