import { useLocalSearchParams } from "expo-router";
import { Link } from "expo-router";
import { Image, Text, View } from "react-native";

import CustomButton from "../components/CustomButton";

import { communities } from "../constants";

export default function LoginOrSignin() {
  const { communityID } = useLocalSearchParams();
  const community = communities.find((c) => c.communityID === communityID);
  if (!community) {
    return (
      <View className="w-4/5 justify-center items-center">
        <Text className="text-2xl font-bold text-red-600">
          Comunidad no encontrada.
        </Text>
      </View>
    );
  }
  const imageSource = community ? community.imageSource : null;
  return (
    <View className="w-4/5 justify-center">
      <View className="flex-row items-center mb-8 bg-teal-700 rounded-xl justify-center w-full">
        <Image
          source={imageSource}
          style={{ width: 100, height: 100 }}
          resizeMode="contain"
        />
        <Text className="ml-4 text-2xl font-bold text-white">
          {community.text}
        </Text>
      </View>
      <View className="w-full max-w-sm items-center">
        <Link asChild href={`/login/${communityID}`} className="mb-4">
          <CustomButton text="Log In" />
        </Link>
        <Link asChild href={`/signin/${communityID}`}>
          <CustomButton text="Sign In" />
        </Link>
      </View>
    </View>
  );
}
