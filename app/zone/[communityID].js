import { useLocalSearchParams } from "expo-router";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ZoneCard from "../../components/ZoneCard";
import { CommunitiesContext } from "../../components/GetCommunities";
import TabBar from "../../components/TabBar";
import { useCallback, useContext, useEffect, useState } from "react";
import Constants from "expo-constants";
import axios from "axios";
import { SearchIcon } from "../../components/Icons";
import debounce from "lodash.debounce";

export default function Zone() {
  const insets = useSafeAreaInsets();
  const { communityID, token } = useLocalSearchParams();
  const { communities, loading, error } = useContext(CommunitiesContext);
  const [zones, setZones] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredZones, setFilteredZones] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const debounceDelay = 500;

  useEffect(() => {
    const fetchData = async () => {
      const url = Constants.expoConfig.extra.apiUrl;
      try {
        const response = await axios.get(`${url}/zones`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        setZones(response.data);
        setFilteredZones(response.data);
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

  const searchNeighborhoods = useCallback(
    debounce(async (name) => {
      setIsLoading(true);
      try {
        const url = Constants.expoConfig.extra.apiUrl;
        const encodedName = encodeURIComponent(name);
        const response = await axios.get(
          // eslint-disable-next-line prettier/prettier
          `${url}/neighborhoods/search/${encodedName}`
        );
        setFilteredZones(response.data);
        setIsLoading(false);
      } catch (error) {
        if (error.status === 404) {
          setFilteredZones([]);
          setIsLoading(false);
        }
      }
    }, debounceDelay), // El valor en ms, ajusta según la experiencia deseada
    // eslint-disable-next-line prettier/prettier
    [debounceDelay]
  );

  const handleSearch = (text) => {
    if (!text) {
      setFilteredZones(zones);
      setSearchText(text);
      return;
    }
    setSearchText(text);
    searchNeighborhoods(text);
  };

  if (loading || isLoading) {
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
      <View className="relative w-full pb-4">
        <SearchIcon
          size={20}
          color="#000000"
          style={{
            position: "absolute",
            left: 10,
            top: "50%",
            transform: [{ translateY: -12 }],
            zIndex: 1, // Asegúrate de que el ícono esté encima
          }}
        />
        <TextInput
          className="bg-slate-200 rounded-xl pl-10"
          placeholder="Ingresa tu barrio"
          value={searchText}
          onChangeText={handleSearch}
        />
      </View>

      <ScrollView
        contentContainerStyle={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        {filteredZones.length > 0 ? (
          filteredZones.map((zone) => (
            <View key={zone.id} style={{ width: "45%", marginBottom: 8 }}>
              <ZoneCard
                imgSource={zone.imageSource}
                text={zone.text}
                zoneID={zone.id}
                communityID={communityID}
                token={token}
              />
            </View>
          ))
        ) : (
          <Text className="text-center text-lg text-gray-500">
            No hay zonas asignadas para el barrio ingresado
          </Text>
        )}
      </ScrollView>
      <TabBar communityID={communityID} token={token} />
    </View>
  );
}
