// src/services/aiService.ts
import { Hadith } from "../models/Hadith";

const GROQ_API_KEY = process.env.EXPO_PUBLIC_GROQ_API_KEY;
// ✅ Use current Groq model (old ones were decommissioned)
const GROQ_MODEL = "llama-3.1-8b-instant";

if (!GROQ_API_KEY) {
  console.warn(
    "[aiService] No GROQ API key found. Add EXPO_PUBLIC_GROQ_API_KEY to your .env file."
  );
}

export async function generateProverbsFromHadith(
  hadith: Hadith
): Promise<string[]> {
  if (!GROQ_API_KEY) {
    throw new Error("Missing GROQ API key");
  }

  const systemPrompt = `
You help Muslims reflect on authentic hadith by generating short Islamic wisdom reminders.
You DO NOT invent new hadith or Qur'anic verses.
You DO NOT attribute new statements directly to the Prophet.
You ONLY produce short motivational reflections inspired by the meaning of the hadith.
Write in simple, clear English.
`;

  const userPrompt = `
Here is a hadith:

Collection: ${hadith.collection}
Reference: ${hadith.reference ?? "N/A"}
Narration header: ${hadith.narrator ?? ""}
Text: ${hadith.textEnglish}

Based on the meaning of this hadith, generate 3 SHORT Islamic reflections.

Rules:
- 1–2 sentences each.
- Do NOT say "The Prophet said..." or quote as hadith.
- Do NOT claim this is Qur'an or hadith.
- Just write general reminders (hikmah) about iman, character, patience, etc.

Format exactly like:
1. ...
2. ...
3. ...
`;

  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${GROQ_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: GROQ_MODEL,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.7,
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    console.error("Groq API error:", errText);
    throw new Error(`Groq API error: ${res.status}`);
  }

  const json = await res.json();
  const content: string = json.choices?.[0]?.message?.content ?? "";

  const lines = content
    .split("\n")
    .map((line) => line.replace(/^\d+\.\s*/, "").trim())
    .filter((line) => line.length > 0);

  return lines;
}
