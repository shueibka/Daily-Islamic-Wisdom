// src/controllers/wisdomController.ts
import { PROVERBS } from "../data/proverbs";
import { Proverb } from "../models/Proverb";
import { Hadith } from "../models/Hadith";
import { fetchRandomHadith } from "../services/hadithApi";

export async function getRandomHadith(): Promise<Hadith> {
  return fetchRandomHadith();
}

export function getRandomProverb(): Proverb {
  const index = Math.floor(Math.random() * PROVERBS.length);
  return PROVERBS[index];
}

export function getProverbsByCategory(
  category: Proverb["category"]
): Proverb[] {
  return PROVERBS.filter((p) => p.category === category);
}

export function getAllProverbs(): Proverb[] {
  return PROVERBS;
}
