📱 Daily Islamic Wisdom — React Native (Expo) App

AI-powered Islamic reflections • Authentic Hadith API Integration • Swipable UI • MVC Architecture • SQLite Ready

<img src="https://img.shields.io/badge/React%20Native-Expo-blue"/> <img src="https://img.shields.io/badge/AI-Groq%20Llama%203.1-green"/> <img src="https://img.shields.io/badge/API-Hadith%20API-orange"/>

🌙 Overview

Daily Islamic Wisdom is a modern React Native (Expo) mobile application that delivers:

✔ Authentic Sahih al-Bukhari & Sahih Muslim hadith (via real API)
✔ AI-generated Islamic reflections inspired by each hadith
✔ A curated collection of Islamic proverbs
✔ Swipeable UI with smooth gesture cards
✔ Clean MVC architecture
✔ Environment variable protection
✔ Ready for SQLite Favorites

This app is designed to showcase production-ready mobile engineering for recruiters and hiring managers.

✨ Features
📖 1. Authentic Hadith API Integration

Random hadith fetched from a real online API (Sahih al-Bukhari & Muslim).

Arabic + English + metadata (book, narrator, reference).

🤖 2. AI Islamic Reflections

Uses Groq Llama 3.1 model (free API) to generate:

3 short reflections

Inspired by hadith meaning

Without inventing new hadith

Safe religious constraints included in system prompt

💬 3. Islamic Proverbs

100+ hand-curated Islamic wisdom lines

Random “Wisdom of the Day”

Full list screen (ProverbsScreen)

👆 4. Swipeable Cards

Swipe Hadith card → next hadith

Swipe Proverb card → next proverb

Uses react-native-gesture-handler

🎨 5. Modern UI

Dark background

Glassy rounded cards

Smooth shadows

Green accent theme

Perfect for portfolio showcase

📦 6. MVC Folder Structure

Clear, scalable architecture:

src/
 ├─ controllers/
 ├─ models/
 ├─ services/
 ├─ views/
 │   ├─ screens/
 │   └─ components/
 ├─ navigation/
 └─ data/

🔐 7. Secure Environment Variables

.env ignored by Git

Uses process.env.EXPO_PUBLIC_* (Expo automatic env loading)

🗂 8. SQLite Ready

The database service is prepared for:

Saving favorites

Saving AI reflections

History of viewed hadith

(Feature coming next update.)

🛠 Tech Stack
Layer	Technology
Framework	React Native (Expo)
Language	TypeScript
State	React Hooks
Navigation	React Navigation
AI	Groq Llama 3.1 Chat Completions
API	Hadith API (Sahih Bukhari / Muslim)
UI	Swipable gesture cards
Architecture	MVC + modular services
Storage	SQLite (expo-sqlite, optional)
Env	.env (Expo public)
📡 Hadith API

The app fetches hadith from an online REST API:

Random hadith

Supports Sahih Bukhari & Muslim

Arabic + English + Metadata

Example service:

export async function fetchRandomHadith() {
  const url = "https://api.hadith.sutanlab.id/books/muslim/1";
  const res = await fetch(url);
  return res.json();
}

🧠 AI Integration (Groq)

The app uses:

llama-3.1-8b-instant


☑ FREE
☑ Fast
☑ OpenAI-compatible API
☑ Great for short Islamic reflections

Example prompt:

Generate 3 short Islamic reflections inspired by this hadith.
Do not quote hadith.
Do not attribute statements to the Prophet.
Write short, motivational reminders only.

🔐 Environment Variables

Create .env in the project root:

EXPO_PUBLIC_GROQ_API_KEY=your-key-here


Make sure it is ignored:

.env


Expo automatically loads variables starting with:

EXPO_PUBLIC_

🎨 UI Highlights

Floating rounded cards

Dark theme

Swipable interactions

Clean typography

Auto layout spacing

Minimalistic + modern

📁 Folder Structure
src/
 ├─ controllers/
 │   └─ wisdomController.ts
 ├─ models/
 │   ├─ Hadith.ts
 │   └─ Proverb.ts
 ├─ services/
 │   ├─ aiService.ts
 │   └─ hadithApi.ts
 ├─ navigation/
 │   └─ AppNavigator.tsx
 ├─ data/
 │   └─ proverbs.ts
 └─ views/
     ├─ screens/
     │   ├─ HomeScreen.tsx
     │   └─ ProverbsScreen.tsx
     └─ components/

🚀 Run Locally
1. Install dependencies
npm install

2. Create .env
EXPO_PUBLIC_GROQ_API_KEY=your-key-here

3. Start App
npx expo start --tunnel


Scan the QR with Expo Go on iPhone/Android.

🤝 Contributing

Pull requests welcome!
If you want to expand the app:

Add favorites (SQLite)

Add history

Add daily notifications

Add tasbeeh counter

Add Islamic goals tracker

📄 License

MIT License

### If you like this project…

Please ⭐ star the repo — it helps the portfolio!

🕌 Author

Shueib Abdirahman
React Native Developer • AI Engineer • Software Engineer
