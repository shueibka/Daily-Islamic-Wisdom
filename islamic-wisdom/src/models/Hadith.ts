// src/models/Hadith.ts
export interface Hadith {
  id: string;
  collection: string;
  hadithNumber?: string;
  textArabic: string;
  textEnglish: string;
  narrator?: string;
  reference?: string;
}
