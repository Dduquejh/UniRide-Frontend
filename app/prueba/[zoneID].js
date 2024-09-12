import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

import { zones } from "../../constants";

const PruebaZoneID = () => {
  const { zoneID } = useLocalSearchParams();
  const zone = zones.find((z) => z.zoneID === zoneID);
  return (
    <View>
      <Text>Options for {zone.text}</Text>
      <Text>Building...</Text>
    </View>
  );
};

export default PruebaZoneID;
