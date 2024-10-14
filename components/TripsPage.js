import { useEffect, useState } from "react";
import Constants from "expo-constants";
import axios from "axios";
import { Pressable, ScrollView, Text, View } from "react-native";
import { ReturnIcon } from "./Icons";

const TripsPage = ({ tripData, onReturn }) => {
  const [trips, setTrips] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const url = Constants.expoConfig.extra.apiUrl;
      const response = await axios.post(`${url}/trips/search`, tripData);
      setTrips(response.data);
      console.log(response.data);
    };
    fetchData();
  }, [tripData]);
  return (
    <View className="h-full">
      <View className="p-2">
        <Text className="font-bold text-teal-700 text-lg">
          Resultados de tu búsqueda
        </Text>
        <Pressable onPress={onReturn}>
          <ReturnIcon />
        </Pressable>
      </View>
      <ScrollView>
        {trips.length === 0 ? (
          <View className="flex items-center justify-center h-full">
            <Text className="text-gray-500 text-lg">
              No hay resultados que se ajusten a tu búsqueda.
            </Text>
          </View>
        ) : (
          trips.map((trip) => (
            <View
              key={trip.id}
              className="bg-slate-200 border-teal-700 border-2 p-2 mb-2 mx-1 rounded-xl"
            >
              <Text className="font-semibold text-teal-700 text-base">
                {trip.userName}
              </Text>
              <View className="flex-row">
                <Text className="font-semibold">Fecha: </Text>
                <Text>{trip.date}</Text>
              </View>
              <View className="flex-row">
                <Text className="font-semibold">Hora: </Text>
                <Text>{trip.hour}</Text>
              </View>
              <View className="mb-2">
                <Text className="font-semibold">Descripción del trayecto:</Text>
                <Text className="ml-2">{trip.description}</Text>
              </View>
              <View className="flex-row">
                <Pressable className="bg-teal-700 py-1 px-2 rounded-lg">
                  <Text className="text-white font-semibold">
                    Concretar viaje
                  </Text>
                </Pressable>
                <View className="flex-row ml-12">
                  <Text className="font-semibold p-1">Cupos disponibles: </Text>
                  <Text className="bg-slate-300 px-2 py-1 rounded-lg">
                    {trip.seats}
                  </Text>
                </View>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
};

export default TripsPage;
