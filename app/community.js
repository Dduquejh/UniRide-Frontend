import { ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CommunityCard from "../components/CommunityCard";
import { communities } from "../constants";

export default function Community() {
  const insets = useSafeAreaInsets();
  return (
    <View className="flex-1 w-4/5" style={{ paddingTop: insets.top }}>
      <View className="px-4 mt-8 shadow-2xl mb-6 border-b-2 border-gray-200 w-full items-center py-4 bg-teal-700 rounded-xl justify-center">
        <Text className="text-2xl font-bold text-white">
          Selecciona tu comunidad
        </Text>
      </View>

      <ScrollView className="flex-1 p-4 rounded-lg">
        {communities.map((community) => (
          <CommunityCard
            key={community.communityID}
            imageSource={community.imageSource}
            text={community.text}
            communityID={community.communityID}
          />
        ))}
      </ScrollView>

      <View className="px-4 py-2 border-t border-gray-200">
        <Text className="text-center text-sm text-gray-500">
          2024 UniRide All Rights Reserved
        </Text>
      </View>
    </View>
  );
}
