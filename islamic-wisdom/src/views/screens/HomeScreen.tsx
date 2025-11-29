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
import { Swipeable } from "react-native-gesture-handler";

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
      setHadithError(
        "Failed to load hadith. Please swipe or tap refresh to try again."
      );
    } finally {
      setLoadingHadith(false);
    }
  };

  const refreshHadithOnly = async () => {
    try {
      setHadithError(null);
      setLoadingHadith(true);
      setAiProverbs([]);
      setAiError(null);
      const h = await getRandomHadith();
      setHadith(h);
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
      setAiError(
        "Could not generate reflections. Check AI settings or try again."
      );
    } finally {
      setAiLoading(false);
    }
  };

  useEffect(() => {
    loadContent();
  }, []);

  const renderHadithSwipeAction = () => (
    <View style={[styles.swipeAction, styles.swipeActionPrimary]}>
      <Text style={styles.swipeActionText}>Next hadith ↻</Text>
    </View>
  );

  const renderProverbSwipeAction = () => (
    <View style={[styles.swipeAction, styles.swipeActionSecondary]}>
      <Text style={styles.swipeActionText}>Next wisdom ↻</Text>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.appTitle}>Daily Islamic Wisdom</Text>
      <Text style={styles.subtitle}>
        Swipe cards or tap buttons to discover new hadith and wisdom.
      </Text>

      {/* HADITH CARD (SWIPE LEFT FOR NEXT) */}
      <Swipeable
        renderRightActions={renderHadithSwipeAction}
        onSwipeableRightOpen={refreshHadithOnly}
      >
        <View style={styles.card}>
          <View style={styles.cardHeaderRow}>
            <View>
              <Text style={styles.cardLabel}>Hadith of the Moment</Text>
              <Text style={styles.cardSubLabel}>Bukhari / Muslim</Text>
            </View>

            <TouchableOpacity
              onPress={refreshHadithOnly}
              disabled={loadingHadith}
            >
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

              <View style={styles.metaRow}>
                <Text style={styles.meta}>
                  {hadith.collection}
                  {hadith.bookName ? ` • ${hadith.bookName}` : ""}
                </Text>
                {hadith.reference && (
                  <Text style={styles.meta}>{hadith.reference}</Text>
                )}
              </View>

              {hadith.chapterName && (
                <Text style={styles.meta}>{hadith.chapterName}</Text>
              )}

              {hadith.narrator && (
                <Text style={styles.meta}>Narrated by: {hadith.narrator}</Text>
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
                  <Text style={styles.sectionLabel}>Reflections</Text>
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
      </Swipeable>

      {/* PROVERB CARD (SWIPE LEFT FOR NEXT) */}
      <Swipeable
        renderRightActions={renderProverbSwipeAction}
        onSwipeableRightOpen={() => setProverb(getRandomProverb())}
      >
        <View style={[styles.card, styles.secondaryCard]}>
          <View style={styles.cardHeaderRow}>
            <View>
              <Text style={styles.cardLabel}>Wisdom of the Day</Text>
              <Text style={styles.cardSubLabel}>Short Islamic proverb</Text>
            </View>

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
      </Swipeable>

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
    backgroundColor: "#0f172a", // dark blue background
  },
  appTitle: {
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 4,
    color: "#f9fafb",
  },
  subtitle: {
    fontSize: 13,
    textAlign: "center",
    marginBottom: 16,
    color: "#cbd5f5",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 4,
  },
  secondaryCard: {
    backgroundColor: "#111827",
  },
  cardHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  cardLabel: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111827",
  },
  cardSubLabel: {
    fontSize: 12,
    color: "#6b7280",
  },
  link: {
    color: "#22c55e",
    fontWeight: "600",
    fontSize: 13,
  },
  center: {
    alignItems: "center",
    marginVertical: 8,
  },
  error: {
    color: "#f97316",
    marginTop: 8,
    fontSize: 12,
  },
  arabic: {
    fontSize: 18,
    textAlign: "right",
    marginBottom: 8,
    color: "#111827",
  },
  english: {
    fontSize: 14,
    marginBottom: 10,
    color: "#111827",
  },
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  meta: {
    fontSize: 11,
    color: "#6b7280",
  },
  proverbText: {
    fontSize: 16,
    marginBottom: 6,
    color: "#e5e7eb",
  },
  proverbMeta: {
    fontSize: 12,
    color: "#9ca3af",
  },
  button: {
    marginTop: 8,
    backgroundColor: "#22c55e",
    paddingVertical: 12,
    borderRadius: 999,
    alignItems: "center",
  },
  buttonText: {
    color: "#0f172a",
    fontWeight: "700",
  },
  aiButton: {
    marginTop: 12,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: "#16a34a",
    alignItems: "center",
  },
  aiButtonText: {
    color: "#f9fafb",
    fontWeight: "600",
    fontSize: 14,
  },
  aiList: {
    marginTop: 12,
  },
  aiLine: {
    fontSize: 13,
    marginBottom: 4,
    color: "#111827",
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 4,
    color: "#6b7280",
  },
  swipeAction: {
    justifyContent: "center",
    alignItems: "flex-end",
    paddingHorizontal: 16,
    marginVertical: 4,
    borderRadius: 18,
  },
  swipeActionPrimary: {
    backgroundColor: "#22c55e",
  },
  swipeActionSecondary: {
    backgroundColor: "#0ea5e9",
  },
  swipeActionText: {
    color: "#f9fafb",
    fontWeight: "600",
  },
});

export default HomeScreen;
