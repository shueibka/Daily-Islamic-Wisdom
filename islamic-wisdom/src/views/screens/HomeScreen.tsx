// src/views/screens/HomeScreen.tsx
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/AppNavigator";
import { Hadith } from "../../models/Hadith";
import { Proverb } from "../../models/Proverb";
import {
  getRandomHadith,
  getRandomProverb,
} from "../../controllers/wisdomController";
import { generateProverbsFromHadith } from "../../services/aiService";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [hadith, setHadith] = useState<Hadith | null>(null);
  const [proverb, setProverb] = useState<Proverb | null>(null);

  const [loadingHadith, setLoadingHadith] = useState(false);
  const [hadithError, setHadithError] = useState<string | null>(null);

  const [aiProverbs, setAiProverbs] = useState<string[]>([]);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  const loadContent = async () => {
    try {
      setHadithError(null);
      setLoadingHadith(true);
      setAiProverbs([]);
      setAiError(null);

      const [h, p] = await Promise.all([
        getRandomHadith(),
        Promise.resolve(getRandomProverb()),
      ]);

      setHadith(h);
      setProverb(p);
    } catch (e) {
      console.error(e);
      setHadithError("Failed to load hadith. Please try again.");
    } finally {
      setLoadingHadith(false);
    }
  };

  const handleGenerateWisdom = async () => {
    if (!hadith) return;

    try {
      setAiError(null);
      setAiLoading(true);
      const result = await generateProverbsFromHadith(hadith);
      setAiProverbs(result);
    } catch (e) {
      console.error(e);
      setAiError("Could not generate reflections. Check AI API key.");
    } finally {
      setAiLoading(false);
    }
  };

  useEffect(() => {
    loadContent();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.appTitle}>Daily Islamic Wisdom</Text>

      {/* HADITH CARD */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Hadith of the Moment</Text>
          <TouchableOpacity onPress={loadContent} disabled={loadingHadith}>
            <Text style={styles.link}>
              {loadingHadith ? "Loading..." : "Refresh"}
            </Text>
          </TouchableOpacity>
        </View>

        {loadingHadith && (
          <View style={styles.center}>
            <ActivityIndicator />
          </View>
        )}

        {hadithError && <Text style={styles.error}>{hadithError}</Text>}

        {hadith && !loadingHadith && !hadithError && (
          <>
            {hadith.textArabic ? (
              <Text style={styles.arabic}>{hadith.textArabic}</Text>
            ) : null}

            <Text style={styles.english}>{hadith.textEnglish}</Text>

            <Text style={styles.meta}>
              {hadith.collection}
              {hadith.bookName ? ` • ${hadith.bookName}` : ""}
            </Text>

            {hadith.chapterName && (
              <Text style={styles.meta}>{hadith.chapterName}</Text>
            )}

            {hadith.narrator && (
              <Text style={styles.meta}>Narrated by: {hadith.narrator}</Text>
            )}

            {hadith.reference && (
              <Text style={styles.meta}>Ref: {hadith.reference}</Text>
            )}

            <TouchableOpacity
              style={styles.aiButton}
              onPress={handleGenerateWisdom}
              disabled={aiLoading}
            >
              <Text style={styles.aiButtonText}>
                {aiLoading
                  ? "Generating wisdom..."
                  : "Generate wisdom from this hadith"}
              </Text>
            </TouchableOpacity>

            {aiError && <Text style={styles.error}>{aiError}</Text>}

            {aiProverbs.length > 0 && (
              <View style={styles.aiList}>
                {aiProverbs.map((line, idx) => (
                  <Text key={idx} style={styles.aiLine}>
                    • {line}
                  </Text>
                ))}
              </View>
            )}
          </>
        )}
      </View>

      {/* PROVERB CARD */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Wisdom of the Day</Text>
          <TouchableOpacity onPress={() => setProverb(getRandomProverb())}>
            <Text style={styles.link}>New wisdom</Text>
          </TouchableOpacity>
        </View>

        {proverb && (
          <>
            <Text style={styles.proverbText}>{proverb.text}</Text>
            <Text style={styles.proverbMeta}>{proverb.category}</Text>
          </>
        )}
      </View>

      {/* NAVIGATION BUTTON */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Proverbs")}
      >
        <Text style={styles.buttonText}>Browse all proverbs</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 32,
    backgroundColor: "#f5f5f5",
  },
  appTitle: {
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  link: {
    color: "#1e88e5",
    fontWeight: "500",
  },
  center: {
    alignItems: "center",
    marginVertical: 8,
  },
  error: {
    color: "#e53935",
    marginTop: 8,
    fontSize: 12,
  },
  arabic: {
    fontSize: 18,
    textAlign: "right",
    marginBottom: 8,
  },
  english: {
    fontSize: 14,
    marginBottom: 8,
  },
  meta: {
    fontSize: 12,
    color: "#777",
  },
  proverbText: {
    fontSize: 16,
    marginBottom: 6,
  },
  proverbMeta: {
    fontSize: 12,
    color: "#888",
  },
  button: {
    marginTop: 8,
    backgroundColor: "#1e88e5",
    paddingVertical: 12,
    borderRadius: 999,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
  aiButton: {
    marginTop: 12,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: "#2e7d32",
    alignItems: "center",
  },
  aiButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
  aiList: {
    marginTop: 10,
  },
  aiLine: {
    fontSize: 13,
    marginBottom: 4,
  },
});

export default HomeScreen;
