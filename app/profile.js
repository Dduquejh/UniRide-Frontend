import JWT from "expo-jwt";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  LayoutAnimation,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import TabBar from "../components/TabBar";
import { useEffect, useState } from "react";
import Constants from "expo-constants";
import axios from "axios";
import UserCard from "../components/UserCard";
import { CarIcon, ZoneIcon } from "../components/Icons";
import TripCard from "../components/TripCard";

const Profile = () => {
  const insets = useSafeAreaInsets();
  const { communityID, token } = useLocalSearchParams();
  const [userData, setUserData] = useState({});

  const [tripDetails, setTripDetails] = useState([]);
  const [showTripDetails, setShowTripDetails] = useState(false);

  const [reservedTrips, setReservedTrips] = useState([]);
  const [showReservedTrips, setShowReservedTrips] = useState(false);

  useEffect(() => {
    const decodeTokenAndFetchData = async () => {
      const jwtKey = Constants.expoConfig.extra.jwtKey;
      const decodedToken = JWT.decode(token, jwtKey);
      const TokenUserId = decodedToken.id;
      await fetchUserData(TokenUserId);
      fetchTripDetails(TokenUserId);
      fetchReserveTrip(TokenUserId);
    };
    decodeTokenAndFetchData();
  }, [token]);

  const fetchUserData = async (userId) => {
    const apiUrl = Constants.expoConfig.extra.apiUrl;
    try {
      const response = await axios.get(`${apiUrl}/auth/${userId}`);
      setUserData(response.data);
    } catch (error) {
      console.log("Error Message:", error.message);
    }
  };

  const fetchTripDetails = async (TokenUserId) => {
    const data = { userId: TokenUserId };
    const apiUrl = Constants.expoConfig.extra.apiUrl;
    try {
      const response = await axios.post(
        `${apiUrl}/trips/findTripsByUser`,
        // eslint-disable-next-line prettier/prettier
        data
      );
      setTripDetails(response.data);
    } catch (error) {
      console.log(
        "Error al obtener los detalles de los viajes:",
        // eslint-disable-next-line prettier/prettier
        error.message
      );
    }
  };

  const fetchReserveTrip = async (TokenUserId) => {
    const apiUrl = Constants.expoConfig.extra.apiUrl;
    try {
      const response = await axios.get(
        // eslint-disable-next-line prettier/prettier
        `${apiUrl}/trips/reserved/${TokenUserId}`
      );
      setReservedTrips(response.data);
    } catch (error) {
      console.log(
        "Error al obtener los detalles de los viajes:",
        // eslint-disable-next-line prettier/prettier
        error.message
      );
    }
  };

  const handleToggleTripDetails = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut); // Animación
    setShowTripDetails(!showTripDetails);
  };

  const handleToggleReservedTrips = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setShowReservedTrips(!showReservedTrips); // Alterna la visualización de viajes reservados
  };

  const reload = async () => {
    router.push(`/profile?communityID=${communityID}&token=${token}`);
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
        <UserCard
          userData={userData}
          totalTrips={tripDetails.length}
          totalReserved={reservedTrips.length}
        />

        <Pressable
          onPress={handleToggleTripDetails}
          className="bg-gray-200 p-4 flex-row items-center mt-9 w-full rounded-xl"
        >
          <CarIcon />
          <Text className="text-lg ml-2">Detalles de mis viajes</Text>
        </Pressable>

        {showTripDetails && (
          <ScrollView className="mt-4 bg-gray-100 p-4 rounded-lg w-full">
            {tripDetails.length > 0 ? (
              tripDetails.map((trip) => (
                <TripCard
                  key={trip.id}
                  trip={trip}
                  isEditable={true}
                  isReserved={false}
                  onChange={reload}
                />
              ))
            ) : (
              <Text>No se encontraron viajes.</Text>
            )}
          </ScrollView>
        )}

        <Pressable
          onPress={handleToggleReservedTrips} // Alterna la visualización de los viajes reservados
          className="bg-gray-200 p-4 flex-row items-center mt-9 w-full rounded-xl"
        >
          <CarIcon />
          <Text className="text-lg ml-2">Mis viajes reservados</Text>
        </Pressable>

        {showReservedTrips && (
          <ScrollView className="mt-4 bg-gray-100 p-4 rounded-lg w-full">
            {reservedTrips.length > 0 ? (
              reservedTrips.map((trip) => (
                <TripCard
                  key={trip.id}
                  trip={trip}
                  isEditable={false}
                  isReserved={true}
                  user={userData}
                  onChange={reload}
                />
              ))
            ) : (
              <Text>No se encontraron viajes reservados.</Text>
            )}
          </ScrollView>
        )}

        <Pressable
          onPress={() => router.push(`../zone/${communityID}?token=${token}`)}
          className="bg-gray-200 p-4 flex-row items-center mt-9 w-full rounded-xl"
        >
          <ZoneIcon />
          <Text className="text-lg ml-2">Cambiar zona</Text>
        </Pressable>
      </View>
      <TabBar communityID={communityID} token={token} />
    </View>
  );
};

export default Profile;
