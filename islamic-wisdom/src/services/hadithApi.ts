// src/services/hadithApi.ts
import { Hadith } from "../models/Hadith";

type RawHadithApiResponse = {
  data?: {
    id?: string | number;
    hadith?: string;
    english?: string;
    arabic?: string;
    collection?: string;
    narrator?: string;
    reference?: string;
    hadithNumber?: string | number;
  };
};

// This function is written to be flexible – adjust mapping once you decide on exact API.
export async function fetchRandomHadith(): Promise<Hadith> {
  // Example API URL – replace with your chosen hadith API endpoint.
  const url = "https://random-hadith-api.vercel.app/api/random"; // or your preferred API

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Failed to fetch hadith: ${res.status}`);
  }

  const json = (await res.json()) as any;

  // This part may need tweaks depending on the exact JSON shape you get.
  const data = Array.isArray(json) ? json[0] : json.data ?? json;

  const hadith: Hadith = {
    id: String(data.id ?? data.hadithNumber ?? Date.now()),
    collection: data.collection ?? "Unknown collection",
    hadithNumber: data.hadithNumber ? String(data.hadithNumber) : undefined,
    textArabic: data.arabic ?? data.hadith ?? "",
    textEnglish: data.english ?? data.hadith ?? "",
    narrator: data.narrator,
    reference: data.reference,
  };

  return hadith;
}
