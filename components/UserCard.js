import { Image, Pressable, Text, View } from "react-native";
import { EditIcon } from "./Icons";

const UserCard = ({ userData, totalTrips }) => {
  return (
    <View className="bg-gray-200 p-4 rounded-xl flex-row items-center justify-between mt-8 w-full">
      <Image
        source={{
          uri: userData.profileImage || "https://via.placeholder.com/150",
        }}
        className="w-20 h-20 rounded-full"
      />

      <View className="flex-1 ml-4">
        <Text className="text-lg font-bold">
          {userData.fullName || "Nombre del usuario"}
        </Text>
        <Text className="text-gray-600">
          Total viajes: {totalTrips || "##"}
        </Text>
        <Text className="text-gray-600">
          Celular: {userData.phone || "###-###-####"}
        </Text>
      </View>
      <Pressable>
        <EditIcon></EditIcon>
      </Pressable>
    </View>
  );
};

export default UserCard;
