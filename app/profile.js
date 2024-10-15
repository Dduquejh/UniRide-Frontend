import JWT from "expo-jwt";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Pressable, Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import TabBar from "../components/TabBar";
import { useEffect, useState } from "react";
import Constants from "expo-constants";
import axios from "axios";
import UserCard from "../components/UserCard";
import { CarIcon, ZoneIcon } from "../components/Icons";

const Profile = () => {
  const insets = useSafeAreaInsets();
  const { communityID, token } = useLocalSearchParams();
  const [userData, setUserData] = useState({});
  console.log(token);
  useEffect(() => {
    console.log("UseEffect profile page");
    const decodeTokenAndFetchData = async () => {
      const jwtKey = Constants.expoConfig.extra.jwtKey;
      const decodedToken = JWT.decode(token, jwtKey);
      const TokenUserId = decodedToken.id;
      await fetchUserData(TokenUserId);
    };
    decodeTokenAndFetchData();
  }, [token]);

  const fetchUserData = async (userId) => {
    const apiUrl = Constants.expoConfig.extra.apiUrl;
    try {
      const response = await axios.get(`${apiUrl}/auth/${userId}`);
      setUserData(response.data);
    } catch (error) {
      console.error("Error Message:", error.message);
    }
  };

  return (
    <View
      className="flex-1 w-4/5 justify-center mx-auto"
      style={{ marginTop: insets.top }}
    >
      <View className="flex-1 items-center h-full">
        <View className="mt-6">
          <Text className="text-4xl font-bold">Perfil</Text>
        </View>
        <UserCard userData={userData} />

        <Pressable className="bg-gray-200 p-4 flex-row items-center mt-9 w-full rounded-xl">
          <CarIcon />
          <Text className="text-lg ml-2">Detalles de mis viajes</Text>
        </Pressable>

        <Pressable className="bg-gray-200 p-4 flex-row items-center mt-9 w-full rounded-xl">
          <ZoneIcon />
          <Text className="text-lg ml-2">Cambiar zona</Text>
        </Pressable>
      </View>
      <TabBar communityID={communityID} token={token} />
    </View>
  );
};

export default Profile;
