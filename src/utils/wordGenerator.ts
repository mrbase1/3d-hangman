import * as randomWords from 'random-words';
import { WordCategory, CATEGORY_WORDS } from '../types/categories';

/**
 * Generates a random word based on the selected category
 * @param category The category to generate a word from
 * @returns A random word in uppercase
 */
export function generateWord(category: WordCategory): string {
  // If random category is selected, use random-words package
  if (category === 'random') {
    // Generate a random word with at least 4 letters
    const word = (randomWords as unknown as (options: { exactly: number, minLength: number, maxLength: number }) => string[])({ exactly: 1, minLength: 4, maxLength: 12 })[0];
    return word.toUpperCase();
  }
  
  // Otherwise, use our predefined category words
  const categoryWords = CATEGORY_WORDS[category];
  const randomIndex = Math.floor(Math.random() * categoryWords.length);
  return categoryWords[randomIndex];
}
