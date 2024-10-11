import { useState } from "react";
import { Alert, View, Text, Pressable, ScrollView } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Checkbox from "expo-checkbox";
import { Picker } from "@react-native-picker/picker";

const SearchForm = () => {
  const [selectedCheckbox, setSelectedCheckbox] = useState(false);
  const [date, setDate] = useState(new Date());
  const [formattedDate, setFormattedDate] = useState(
    // eslint-disable-next-line prettier/prettier
    "Selecciona la fecha"
  );
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedHour, setSelectedHour] = useState("");
  const [isPressed, setIsPressed] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);

    const dateString = currentDate.toLocaleDateString();
    setFormattedDate(dateString);
  };

  const handleSubmit = () => {
    Alert.alert(
      "Esto debería de mostrar los viajes que coinciden con tu búsqueda",
      "Por el momento está en desarrollo",
      [
        {
          text: "OK",
        },
        // eslint-disable-next-line prettier/prettier
      ]
    );
    console.log("Form submitted");
    // Implement form submission logic here
  };

  const hourOptions = [];
  for (let hour = 6; hour <= 20; hour++) {
    hourOptions.push(`${hour < 10 ? `0${hour}` : hour}:00`);
    hourOptions.push(`${hour < 10 ? `0${hour}` : hour}:30`);
  }
  return (
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
              {formattedDate}
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
            Selecciona la hora
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

        <Pressable
          onPress={handleSubmit}
          onPressIn={() => setIsPressed(true)}
          onPressOut={() => setIsPressed(false)}
          className={`mt-4 h-12 justify-center items-center rounded-xl ${
            isPressed ? "bg-teal-800" : "bg-teal-700"
          }`}
        >
          <Text className="text-white font-semibold">Encontrar un viaje</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default SearchForm;
