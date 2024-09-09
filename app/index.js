import { Text, View } from "react-native";
import CustomButton from "../components/CustomButton";
import { Link } from "expo-router";

export default function Index() {
  return (
    <View className="flex-1 justify-center items-center w-64">
      <Text className="text-2xl font-bold mb-8">UniRide</Text>
      <Text className="text-lg mb-8">
        Comparte viajes desde y hacia la universidad y ahorra dinero
      </Text>
      <Link asChild href="/community">
        <CustomButton text="Inicio" />
      </Link>
    </View>
  );
}
