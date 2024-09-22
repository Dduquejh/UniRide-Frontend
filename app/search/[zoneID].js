import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

import { zones } from "../../constants";
import TabBar from "../../components/TabBar";

const PruebaZoneID = () => {
  const insets = useSafeAreaInsets();
  const { zoneID } = useLocalSearchParams();
  const zone = zones.find((z) => z.zoneID === zoneID);
  return (
    <View
      className="flex-1 w-4/5 justify-center mx-auto"
      style={{ marginTop: insets.top }}
    >
      <View className="flex-1 w-4/5 justify-center items-center">
        <Text>Options for {zone.text}</Text>
        <Text>Building...</Text>
      </View>
      <TabBar />
    </View>
  );
};

export default PruebaZoneID;
