import { ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CommunityCard from "../components/CommunityCard";
import { communities } from "../constants";

export default function Community() {
  const insets = useSafeAreaInsets();
  return (
    <View className="flex-1 w-full">
      <View
        className="px-4 mt-8 shadow-2xl mb-6 border-b-2 border-gray-200 w-full items-center pb-4"
        style={{ paddingTop: insets.top }}
      >
        <Text className="text-2xl font-bold">Selecciona tu comunidad</Text>
      </View>

      <ScrollView className="flex-1 p-4 rounded-lg">
        {communities.map((community) => (
          <CommunityCard
            key={community.id}
            imageSource={community.imageSource}
            text={community.text}
            id={community.id}
          />
        ))}
      </ScrollView>

      <View className="px-4 py-2 border-t border-gray-200">
        <Text className="text-center text-sm text-gray-500">
          2023 UniRide All Rights Reserved
        </Text>
      </View>
    </View>
  );
}
