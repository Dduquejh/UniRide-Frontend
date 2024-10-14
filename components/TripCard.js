import { useState } from "react";
import { Pressable, Text, View } from "react-native";

const TripCard = ({ trip }) => {
  const [isSelected, setIsSelected] = useState(false);

  const handleSelect = () => {
    setIsSelected(!isSelected);
  };
  return (
    <View
      key={trip.id}
      className={`border-teal-700 border-2 p-2 mb-2 mx-1 rounded-xl ${isSelected ? "bg-black" : "bg-slate-200"}`}
      style={{ minHeight: 150 }}
    >
      {!isSelected ? (
        <View>
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
            <Pressable
              onPress={handleSelect}
              className="bg-teal-700 py-1 px-2 rounded-lg"
            >
              <Text className="text-white font-semibold">Concretar viaje</Text>
            </Pressable>
            <View className="flex-row ml-12">
              <Text className="font-semibold p-1">Cupos disponibles: </Text>
              <Text className="bg-slate-300 px-2 py-1 rounded-lg">
                {trip.seats}
              </Text>
            </View>
          </View>
        </View>
      ) : (
        <View>
          <Text className="text-white text-xl font-semibold mb-2">
            Contacta al estudiante
          </Text>
          <Text className="text-white text-base mb-6">
            Contacta al estudiante que publicó este viaje para concretar
            detalles
          </Text>
          <View className="flex-row mx-auto">
            <Pressable
              onPress={handleSelect}
              className="bg-gray-400 py-1 px-8 rounded-lg mx-4"
            >
              <Text className="text-white font-semibold">Cancelar</Text>
            </Pressable>
            <Pressable className="bg-lime-500 py-1 px-8 rounded-lg mx-4">
              <Text className="text-white font-semibold">WhatsApp</Text>
            </Pressable>
          </View>
        </View>
      )}
    </View>
  );
};

export default TripCard;
