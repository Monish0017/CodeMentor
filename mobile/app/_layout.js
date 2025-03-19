import { Stack } from "expo-router";
import { View } from "react-native";
// Don't import NavigationContainer here

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}