import { Link } from "expo-router";
import { Text, View } from "react-native";
import CustomButton from "../components/CustomButton";

export default function Community() {
  return (
    <View>
      <Text>Community</Text>
      <Link asChild href="/">
        <CustomButton text="Atrás" />
      </Link>
    </View>
  );
}
