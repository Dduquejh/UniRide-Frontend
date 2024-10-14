import { Pressable, Text, View } from "react-native";

const TripCard = ({ trip }) => {
  return (
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
  );
};

export default TripCard;
