import { Text, View } from "react-native";
import CustomButton from "../components/CustomButton";
import { Link } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Index() {
  const insets = useSafeAreaInsets();
  return (
    <View
      className="flex-1 justify-center items-center w-64"
      style={{ paddingTop: insets.top }}
    >
      <Text className="text-3xl font-bold mb-8">UniRide</Text>
      <Text className="text-lg mb-8">
        Comparte viajes desde y hacia la universidad y ahorra dinero
      </Text>
      <Link asChild href="/community">
        <CustomButton text="Inicio" />
      </Link>
    </View>
  );
}
