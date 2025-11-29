// src/controllers/wisdomController.ts
import { Proverb } from "../models/Proverb";
import { Hadith } from "../models/Hadith";
import {
  fetchRandomHadith,
  fetchRandomBukhari,
  fetchRandomMuslim,
} from "../services/hadithApi";
import { PROVERBS } from "../data/proverbs";

/**
 * Get a random hadith from either Sahih al-Bukhari or Sahih Muslim.
 */
export async function getRandomHadith(): Promise<Hadith> {
  return fetchRandomHadith();
}

/**
 * Get a random hadith from Sahih al-Bukhari only.
 */
export async function getRandomBukhari(): Promise<Hadith> {
  return fetchRandomBukhari();
}

/**
 * Get a random hadith from Sahih Muslim only.
 */
export async function getRandomMuslim(): Promise<Hadith> {
  return fetchRandomMuslim();
}

/**
 * Get a random local proverb (wisdom line) from the static dataset.
 */
export function getRandomProverb(): Proverb {
  const index = Math.floor(Math.random() * PROVERBS.length);
  return PROVERBS[index];
}

/**
 * Alias, in case you still use getRandomLocalProverb somewhere.
 */
export function getRandomLocalProverb(): Proverb {
  return getRandomProverb();
}

/**
 * Get all proverbs in the dataset (used by ProverbsScreen).
 */
export function getAllProverbs(): Proverb[] {
  return PROVERBS;
}
