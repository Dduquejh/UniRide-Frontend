import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";

export default function App() {
  return (
    <View className="bg-slate-300 items-center justify-center flex-1">
      <Text className="text-red-500">test</Text>
      <StatusBar style="auto" />
    </View>
  );
}
