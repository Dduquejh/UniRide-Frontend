import { useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { Image, Text, TextInput, View } from "react-native";
import { Link } from "expo-router";

import { communities } from "../../constants";
import CustomButton from "../../components/CustomButton";

export default function Login() {
  const { communityID } = useLocalSearchParams();
  const community = communities.find((c) => c.communityID === communityID);
  const imageSource = community ? community.imageSource : null;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <View className="w-4/5 justify-center">
      <View className="flex-row items-center mb-8 bg-teal-700 rounded-xl justify-center w-full">
        <Text className="mr-4 text-2xl font-bold text-white">
          Ingresa a {"\n"}
          {community.text}
        </Text>
        <Image
          source={imageSource}
          style={{ width: 100, height: 100 }}
          resizeMode="contain"
        />
      </View>
      <View className="w-full max-w-sm items-center">
        <TextInput
          placeholder="correo institucional"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          autoCompleteTyoe="email"
          className="mb-4 border-b-2 border-gray-200 w-full h-10"
        />
        <TextInput
          placeholder="Contraseña"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          className="mb-4 border-b-2 border-gray-200 w-full h-10"
        />
        <Link asChild href={`../zone/${communityID}`}>
          <CustomButton text="Log In" />
        </Link>
      </View>
    </View>
  );
}
