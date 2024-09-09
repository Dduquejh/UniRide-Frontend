import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Login() {
  return (
    <View>
      <Text>Login</Text>
      <Link href="/community" asChild>
        <Text>Go to Communities</Text>
      </Link>
    </View>
  );
}
