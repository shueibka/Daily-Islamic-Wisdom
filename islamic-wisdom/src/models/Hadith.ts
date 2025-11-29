// src/models/Hadith.ts
export interface Hadith {
  id: string;
  collection: string; // e.g. "Sahih al-Bukhari"
  bookName?: string;
  chapterName?: string;
  textEnglish: string;
  textArabic?: string; // this API doesn’t give Arabic, so keep optional
  narrator?: string; // from "header"
  reference?: string; // e.g. "Sahih al-Bukhari 6313"
}
