import { Slot } from "expo-router";
import { View } from "react-native";

export default function Layout() {
  return (
    <View className="flex-1 bg-slate-300 items-center justify-center">
      <Slot />
    </View>
  );
}
