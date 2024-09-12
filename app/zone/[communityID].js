import { useLocalSearchParams } from "expo-router";
import { Image, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ZoneCard from "../../components/ZoneCard";
import { communities } from "../../constants";
import { zones } from "../../constants";

export default function Zone() {
  const insets = useSafeAreaInsets();
  const { communityID } = useLocalSearchParams();
  const community = communities.find((c) => c.communityID === communityID);
  const imageSource = community ? community.imageSource : null;

  return (
    <View
      className="flex-1 w-4/5 justify-center mx-auto"
      style={{ marginTop: insets.top }}
    >
      <View className="w-full bg-teal-700 justify-center items-center rounded-xl mb-4">
        <Text className="text-white text-4xl font-bold pt-4">Bienvenido</Text>
        <Image
          source={imageSource}
          style={{ width: 100, height: 100 }}
          resizeMode="contain"
        />
      </View>
      <ScrollView
        contentContainerStyle={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        {zones.map((zone) => (
          <View key={zone.zoneID} style={{ width: "45%", marginBottom: 8 }}>
            <ZoneCard
              imgSource={zone.imageSource}
              text={zone.text}
              zoneID={zone.zoneID}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
