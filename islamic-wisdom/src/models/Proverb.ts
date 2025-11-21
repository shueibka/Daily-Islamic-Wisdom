// src/models/Proverb.ts
export interface Proverb {
  id: string;
  category:
    | "Patience"
    | "Gratitude"
    | "Discipline"
    | "Tawakkul"
    | "Sincerity"
    | "Hope";
  text: string;
  source?: string; // hadith/athar/wise saying reference if you want
}
