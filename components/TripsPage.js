import { useEffect, useState, useCallback } from "react";
import Constants from "expo-constants";
import axios from "axios";
import { Pressable, ScrollView, Text, View } from "react-native";
import { ReturnIcon } from "./Icons";
import TripCard from "./TripCard";

const TripsPage = ({ tripData, onReturn, token }) => {
  const [trips, setTrips] = useState([]);

  const fetchData = useCallback(async () => {
    const url = Constants.expoConfig.extra.apiUrl;
    const response = await axios.post(`${url}/trips/search`, tripData);
    setTrips(response.data);
  }, [tripData]);

  useEffect(() => {
    fetchData();
  }, [tripData, fetchData]);

  const refreshTrips = () => {
    fetchData();
  };
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
            <TripCard
              key={trip.id}
              trip={trip}
              isEditable={false}
              isReserved={false}
              token={token}
              onReserve={refreshTrips}
            />
          ))
        )}
      </ScrollView>
    </View>
  );
};

export default TripsPage;
