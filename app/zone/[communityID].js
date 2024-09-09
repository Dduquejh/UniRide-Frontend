import { useLocalSearchParams } from "expo-router";
import { Image, Text, View } from "react-native";

import { communities } from "../../constants";

export default function Zone() {
  const { communityID } = useLocalSearchParams();
  const community = communities.find((c) => c.communityID === communityID);
  const imageSource = community ? community.imageSource : null;
  return (
    <View>
      <Image
        source={imageSource}
        style={{ width: 100, height: 100 }}
        resizeMode="contain"
      />
      <Text>Zone page is building...</Text>
    </View>
  );
}
