// src/navigation/AppNavigator.tsx
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../views/screens/HomeScreen";
import ProverbsScreen from "../views/screens/ProverbsScreen";

export type RootStackParamList = {
  Home: undefined;
  Proverbs: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Daily Islamic Wisdom" }}
        />
        <Stack.Screen
          name="Proverbs"
          component={ProverbsScreen}
          options={{ title: "All Proverbs" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
