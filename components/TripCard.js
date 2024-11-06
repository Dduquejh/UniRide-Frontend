import { useEffect, useState } from "react";
import {
  Pressable,
  Text,
  View,
  Linking,
  Alert,
  Modal,
  ScrollView,
} from "react-native";
import { CloseIcon, WhatsAppIcon } from "./Icons";
import ShareForm from "./ShareForm";
import JWT from "expo-jwt";
import axios from "axios";
import Constants from "expo-constants";

const TripCard = ({ trip, isEditable, token, onReserve }) => {
  const [isSelected, setIsSelected] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [userData, setUserData] = useState({});

  useEffect(() => {
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

  const handleSelect = () => {
    setIsSelected(!isSelected);
    onReserve();
  };

  const handleWhatsApp = () => {
    const phoneNumber = `+57${trip.user.phone}`;
    const message = `Hola ${trip.userName}, estoy interesado en unirme a tu viaje el ${trip.date} a las ${trip.hour}. ¿Podrías confirmar si aún tienes cupos disponibles?`;

    const url = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
    Linking.openURL(url).catch(() => {
      Alert.alert(
        "Error",
        // eslint-disable-next-line prettier/prettier
        "No se pudo abrir WhatsApp. Por favor, verifica que la aplicación esté instalada en tu dispositivo."
      );
    });
  };

  const bookTrip = async () => {
    if (trip.seats < 1) {
      Alert.alert(
        "Reserva no disponible",
        // eslint-disable-next-line prettier/prettier
        "Lo sentimos, no hay asientos disponibles para este viaje."
      );
      return;
    }
    const apiUrl = Constants.expoConfig.extra.apiUrl;
    const data = {
      tripId: trip.id,
      userId: userData.id,
      seats: 1,
    };
    console.log(data);
    try {
      const response = await axios.post(`${apiUrl}/reservations/reserve`, data);
      console.log(response.status);
      if (response.status === 201) {
        Alert.alert(
          "Viaje reservado",
          "Has reservado tu cupo en este viaje con éxito. En tu perfil en la sección 'Viajes Reservados', encontraras todo la información del viaje y el botón de WhatsApp para que te comuniques con quien publicó el viaje si es necesario.",
          [
            {
              text: "OK",
            },
            // eslint-disable-next-line prettier/prettier
          ]
        );
      }
      handleSelect();
    } catch (error) {
      console.error("Error Message:", error.message);
    }
  };

  const editTrip = () => {
    setIsModalVisible(true);
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
          <View className="flex-row">
            <Text className="font-semibold">Placa: </Text>
            <Text>{trip.plate}</Text>
          </View>
          <View className="mb-2">
            <Text className="font-semibold">Descripción del trayecto:</Text>
            <Text className="ml-2">{trip.description}</Text>
          </View>
          <View className="flex-row justify-between flex-wrap">
            {!isEditable ? (
              <Pressable
                onPress={handleSelect}
                className="bg-teal-700 py-1 px-2 rounded-lg"
              >
                <Text className="text-white font-semibold">
                  Concretar viaje
                </Text>
              </Pressable>
            ) : (
              <Pressable
                onPress={editTrip}
                className="bg-red-500 py-1 px-2 rounded-lg"
              >
                <Text className="text-white font-semibold">Editar</Text>
              </Pressable>
            )}
            <View className="flex-row items-center">
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
              className="bg-gray-400 py-1 px-8 rounded-lg mr-2"
            >
              <Text className="text-white font-semibold">Cancelar</Text>
            </Pressable>
            <Pressable
              onPress={bookTrip}
              className="bg-lime-500 py-1 px-8 rounded-lg mr-2"
            >
              <Text className="text-white font-semibold">Reservar</Text>
            </Pressable>
            <Pressable onPress={handleWhatsApp}>
              <WhatsAppIcon />
            </Pressable>
          </View>
        </View>
      )}

      <Modal
        transparent={true}
        animationType="slide"
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-slate-300 bg-opacity-100">
          <View className="bg-slate-200 p-6 rounded-lg w-3/4 h-[80%]">
            <View className="flex-row mx-auto">
              <Text className="text-lg font-semibold mb-4">Editar Viaje</Text>
              <Pressable
                onPress={() => setIsModalVisible(false)}
                className="ml-24"
              >
                <CloseIcon />
              </Pressable>
            </View>
            <ScrollView>
              <ShareForm zoneId={trip.zoneId} />
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default TripCard;
