// src/services/hadithApi.ts
import { Hadith } from "../models/Hadith";

type RandomHadithResponse = {
  data: {
    book: string;
    bookName?: string;
    chapterName?: string;
    hadith_english: string;
    header?: string;
    id: number | string;
    refno?: string;
  };
};

const BASE_URL = "https://random-hadith-generator.vercel.app";

async function fetchFromEndpoint(path: string): Promise<RandomHadithResponse> {
  const res = await fetch(`${BASE_URL}${path}`);

  if (!res.ok) {
    throw new Error(`Hadith API error: ${res.status}`);
  }

  return (await res.json()) as RandomHadithResponse;
}

function mapToHadith(dto: RandomHadithResponse["data"]): Hadith {
  return {
    id: String(dto.id),
    collection: dto.book,
    bookName: dto.bookName?.trim(),
    chapterName: dto.chapterName?.trim(),
    textEnglish: dto.hadith_english.trim(),
    textArabic: undefined, // this API doesn't provide Arabic text
    narrator: dto.header?.replace(/^\\s*|\\s*$/g, ""), // trim header
    reference: dto.refno,
  };
}

/**
 * Get a random hadith from Sahih al-Bukhari.
 */
export async function fetchRandomBukhari(): Promise<Hadith> {
  const json = await fetchFromEndpoint("/bukhari/");
  return mapToHadith(json.data);
}

/**
 * Get a random hadith from Sahih Muslim.
 */
export async function fetchRandomMuslim(): Promise<Hadith> {
  const json = await fetchFromEndpoint("/muslim/");
  return mapToHadith(json.data);
}

/**
 * Get a random hadith from either Bukhari or Muslim.
 */
export async function fetchRandomHadith(): Promise<Hadith> {
  const useBukhari = Math.random() < 0.5;
  return useBukhari ? fetchRandomBukhari() : fetchRandomMuslim();
}
