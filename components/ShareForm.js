import { useEffect, useState } from "react";
import {
  Alert,
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Checkbox from "expo-checkbox";
import { Picker } from "@react-native-picker/picker";
import Constants from "expo-constants";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const ShareForm = ({ zoneId, token }) => {
  const [selectedCheckbox, setSelectedCheckbox] = useState(false);
  const [date, setDate] = useState(new Date());
  const [formattedDate, setFormattedDate] = useState(() =>
    // eslint-disable-next-line prettier/prettier
    new Date().toLocaleDateString("es-ES")
  );
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedHour, setSelectedHour] = useState("");
  const [carSeats, setCarSeats] = useState(1);
  const [description, setDescription] = useState("");
  const [plate, setPlate] = useState("");
  const [isPressed, setIsPressed] = useState(false);
  const [userId, setUserId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUserId = async () => {
      await getIdFromToken(token);
    };
    fetchUserId();
  }, [token]);

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);

    const dateString = currentDate.toLocaleDateString("es-ES");
    setFormattedDate(dateString);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    await getIdFromToken(token);
    if (!userId) {
      Alert.alert("Error", "No se pudo obtener el ID del usuario.");
      setIsLoading(false);
      return;
    }
    try {
      const url = Constants.expoConfig.extra.apiUrl;
      const tripData = {
        fromOrTo: selectedCheckbox,
        date: formattedDate,
        hour: selectedHour,
        seats: carSeats,
        description: description,
        userId: userId,
        zoneId: zoneId,
        plate: plate,
      };
      const response = await axios.post(`${url}/trips`, tripData);
      if (response.status === 201) {
        Alert.alert(
          "Tu viaje ha sido publicado con éxito!",
          "Recuerda actualizar el número de cupos disponibles desde tu perfil. Los interesados en tu viaje te contactaran por WhatsApp.",
          [
            {
              text: "Editar Viaje",
            },
            {
              text: "OK",
            },
            // eslint-disable-next-line prettier/prettier
          ]
        );
      }
    } catch (e) {
      console.log(e);
      console.log(e.response);
    } finally {
      setIsLoading(false);
    }
  };

  const getIdFromToken = async (token) => {
    if (!token) {
      return;
    }
    try {
      const decodedToken = jwtDecode(token);
      setUserId(decodedToken.id);
    } catch (e) {
      console.log("Error decoding token", e);
    }
  };

  const hourOptions = [];
  hourOptions.push("Selecciona la hora");
  for (let hour = 6; hour <= 20; hour++) {
    hourOptions.push(`${hour < 10 ? `0${hour}` : hour}:00`);
    hourOptions.push(`${hour < 10 ? `0${hour}` : hour}:30`);
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView className="w-4/5 mx-auto">
        <View>
          <View className="flex-row items-center">
            <Checkbox
              value={selectedCheckbox === "From"}
              onValueChange={() => setSelectedCheckbox("From")}
            />
            <Text className="pl-2 text-lg">Desde la universidad</Text>
          </View>
          <View className="flex-row items-center">
            <Checkbox
              value={selectedCheckbox === "To"}
              onValueChange={() => setSelectedCheckbox("To")}
            />
            <Text className="pl-2 text-lg">Hacia la universidad</Text>
          </View>
          <View>
            <Text className="font-semibold text-base pt-4">Fecha</Text>
            <Pressable onPress={() => setShowDatePicker(true)}>
              <Text className="text-base font-semibold bg-white rounded-xl pl-4">
                {formattedDate || new Date().toLocaleDateString("es-ES")}
              </Text>
            </Pressable>
            {showDatePicker && (
              <DateTimePicker
                value={date}
                mode="date"
                display="default"
                onChange={handleDateChange}
              />
            )}

            <Text className="text-base font-semibold pt-2">
              {selectedCheckbox
                ? selectedCheckbox === "From"
                  ? "Selecciona la hora de salida"
                  : "Selecciona la hora de llegada"
                : "Selecciona la hora"}
            </Text>
            <View className="bg-white rounded-xl justify-center h-6">
              <Picker
                selectedValue={selectedHour}
                onValueChange={(itemValue) => setSelectedHour(itemValue)}
              >
                {hourOptions.map((hour) => (
                  <Picker.Item key={hour} label={hour} value={hour} />
                ))}
              </Picker>
            </View>
          </View>

          <Text className="text-xl font-bold pt-4">Placa</Text>
          <TextInput
            className="bg-white rounded-xl px-4 h-10"
            value={plate}
            onChangeText={(text) => {
              const formattedText = text.toUpperCase(); // Convierte a mayúsculas automáticamente
              if (
                /^[A-Z]{0,3}$/.test(formattedText) ||
                /^[A-Z]{3}[0-9]{0,3}$/.test(formattedText)
              ) {
                setPlate(formattedText);
              }
            }}
            placeholder="ABC123"
            keyboardType="default"
            autoCapitalize="characters"
          />

          <Text className="text-xl font-bold pt-4">Cupos disponibles</Text>
          <View className="bg-white rounded-xl justify-center h-6">
            <Picker
              selectedValue={carSeats}
              onValueChange={(itemValue) => setCarSeats(itemValue)}
            >
              {[1, 2, 3, 4, 5].map((seats) => (
                <Picker.Item
                  key={seats}
                  label={seats.toString()}
                  value={seats}
                />
              ))}
            </Picker>
          </View>

          <Text className="text-xl font-bold pt-4 pb-2">
            Descripción del trayecto
          </Text>
          <TextInput
            value={description}
            onChangeText={setDescription}
            placeholder="Describe tu trayecto"
            className="bg-white rounded-xl px-4 h-24"
            multiline={true}
            textAlignVertical="top"
          />

          {isLoading ? (
            <ActivityIndicator size="large" color="#00ff00" />
          ) : (
            <Pressable
              onPress={handleSubmit}
              onPressIn={() => setIsPressed(true)}
              onPressOut={() => setIsPressed(false)}
              disabled={isLoading} // Deshabilitar el botón mientras está cargando
              className={`mt-4 h-12 justify-center items-center rounded-xl ${
                isPressed ? "bg-teal-800" : "bg-teal-700"
              }`}
            >
              <Text className="text-white font-semibold">Ofrecer un viaje</Text>
            </Pressable>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ShareForm;
