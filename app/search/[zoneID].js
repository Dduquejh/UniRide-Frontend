import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import { Pressable, Text, View } from "react-native";

import { zones } from "../../constants";
import TabBar from "../../components/TabBar";
import { useState } from "react";
import ShareForm from "../../components/ShareForm";

const SearchZone = () => {
  const insets = useSafeAreaInsets();
  const { zoneID, communityID } = useLocalSearchParams();
  const zone = zones.find((z) => z.zoneID === zoneID);
  const [isSharing, setIsSharing] = useState(true);
  return (
    <View
      className="flex-1 w-full mx-auto items-center"
      style={{ marginTop: insets.top }}
    >
      <View className="p-4 shadow-2xl mb-4 border-b-4 border-gray-200 w-full bg-gray-100 rounded-xl">
        <Text className="text-2xl font-bold text-black">
          Comunidad {communityID}
        </Text>
      </View>

      <View className="w-4/5 mx-auto">
        <View className="flex-row justify-around pb-2 border-b-2 border-gray-200">
          <Pressable
            asChild
            className="flex items-center space-y-1 w-1/2"
            onPress={() => setIsSharing(true)}
          >
            <Text className={`${isSharing ? "font-bold" : ""}`}>
              Compartir mi vehículo
            </Text>
          </Pressable>

          <Pressable
            className="flex items-center space-y-1 w-1/2"
            onPress={() => setIsSharing(false)}
          >
            <Text className={`${!isSharing ? "font-bold" : ""}`}>
              Tomar un viaje
            </Text>
          </Pressable>
        </View>

        <View className="pt-6 mt-6 bg-slate-300 h-5/6 rounded-xl">
          {isSharing ? (
            <ShareForm />
          ) : (
            <Text>Información sobre tomar un viaje...</Text>
          )}
        </View>
      </View>

      <View className="w-4/5 mx-auto absolute bottom-0">
        <TabBar communityID={communityID} />
      </View>
    </View>
  );
};

export default SearchZone;
