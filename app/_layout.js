import { Slot } from "expo-router";
import { View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { CommunitiesProvider } from "../components/GetCommunities";

export default function Layout() {
  return (
    <SafeAreaProvider>
      <CommunitiesProvider>
        <View className="flex-1 bg-slate-100 items-center justify-center">
          <Slot />
        </View>
      </CommunitiesProvider>
    </SafeAreaProvider>
  );
}
