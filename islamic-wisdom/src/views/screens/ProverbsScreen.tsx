// src/views/screens/ProverbsScreen.tsx
import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { getAllProverbs } from "../../controllers/wisdomController";
import { Proverb } from "../../models/Proverb";

const ProverbsScreen: React.FC = () => {
  const data: Proverb[] = getAllProverbs();

  const renderItem = ({ item }: { item: Proverb }) => (
    <View style={styles.item}>
      <Text style={styles.text}>{item.text}</Text>
      <Text style={styles.category}>{item.category}</Text>
      {item.source ? <Text style={styles.source}>{item.source}</Text> : null}
    </View>
  );

  return (
    <FlatList
      contentContainerStyle={styles.container}
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 32,
    backgroundColor: "#f5f5f5",
  },
  item: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    elevation: 1,
  },
  text: {
    fontSize: 14,
    marginBottom: 4,
  },
  category: {
    fontSize: 12,
    color: "#777",
  },
  source: {
    fontSize: 11,
    color: "#999",
    marginTop: 2,
  },
});

export default ProverbsScreen;
