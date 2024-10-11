import { useLocalSearchParams } from "expo-router";
import { ActivityIndicator, Image, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ZoneCard from "../../components/ZoneCard";
import { CommunitiesContext } from "../../components/GetCommunities";
import TabBar from "../../components/TabBar";
import { useContext, useEffect, useState } from "react";
import Constants from "expo-constants";
import axios from "axios";

export default function Zone() {
  const insets = useSafeAreaInsets();
  const { communityID, token } = useLocalSearchParams();
  const { communities, loading, error } = useContext(CommunitiesContext);
  const [zones, setZones] = useState([]);
  useEffect(() => {
    console.log("useEffect");
    const fetchData = async () => {
      const url = Constants.expoConfig.extra.apiUrl;
      try {
        console.log("fetchData");
        const response = await axios.get(`${url}/zones`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        console.log("response", response.data);
        setZones(response.data);
      } catch (error) {
        if (error.response) {
          // La solicitud se hizo y el servidor respondió con un código de estado
          console.error("Error Response:", error.response.data);
          console.error("Error Status:", error.response.status);
        } else if (error.request) {
          // La solicitud se hizo pero no se recibió respuesta
          console.error("Error Request:", error.request);
        } else {
          // Algo pasó al configurar la solicitud
          console.error("Error Message:", error.message);
        }
      }
    };

    fetchData();
  }, [communityID, token]);
  if (loading) {
    return (
      <View className="w-4/5 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  if (error) {
    return (
      <View className="w-4/5 justify-center items-center">
        <Text className="text-2xl font-bold text-red-600">
          Error: {error.message}
        </Text>
      </View>
    );
  }

  const community = communities.find((c) => c.id === communityID);
  const imageSource = community ? community.imageSource : null;

  return (
    <View
      className="flex-1 w-4/5 justify-center mx-auto"
      style={{ marginTop: insets.top }}
    >
      <View className="w-full bg-teal-700 justify-center items-center rounded-xl mb-4">
        <Text className="text-white text-4xl font-bold pt-4">Bienvenido</Text>
        <Image
          source={{ uri: imageSource }}
          style={{ width: 150, height: 100 }}
          resizeMode="contain"
        />
      </View>
      <View className="pb-4">
        <Text className="text-xl font-bold">Selecciona tu zona</Text>
        <Text>
          Esta corresponde a la zona desde la que tomas u ofreces transporte o
          hacia la que te diriges
        </Text>
      </View>
      <ScrollView
        contentContainerStyle={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        {zones.map((zone) => (
          <View key={zone.id} style={{ width: "45%", marginBottom: 8 }}>
            <ZoneCard
              imgSource={zone.imageSource}
              text={zone.text}
              zoneID={zone.id}
              communityID={communityID}
              token={token}
            />
          </View>
        ))}
      </ScrollView>
      <TabBar communityID={communityID} />
    </View>
  );
}
