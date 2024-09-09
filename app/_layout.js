import { Slot } from "expo-router";
import { View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function Layout() {
  return (
    <SafeAreaProvider>
      <View className="flex-1 bg-slate-100 items-center justify-center">
        <Slot />
      </View>
    </SafeAreaProvider>
  );
}
