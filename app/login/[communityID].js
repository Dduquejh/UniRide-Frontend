import { useContext, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import {
  ActivityIndicator,
  Alert,
  Image,
  Text,
  TextInput,
  View,
} from "react-native";

import { CommunitiesContext } from "../../components/GetCommunities";
import Constants from "expo-constants";
import CustomButton from "../../components/CustomButton";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { communityID } = useLocalSearchParams();
  const { communities, loading, error } = useContext(CommunitiesContext);
  if (loading) {
    return (
      <View className="w-4/5 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  if (error) {
    return (
      <View className="w-4/5 justify-center items-center">
        <Text className="text-2xl font-bold text-red-600">
          Error: {error.message}
        </Text>
      </View>
    );
  }
  const community = communities.find((c) => c.id === communityID);
  const imageSource = community ? community.imageSource : null;

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Por favor, llene todos los campos");
      return;
    }
    try {
      const url = Constants.expoConfig.extra.apiUrl;
      const userData = {
        email: email,
        password: password,
      };
      const response = await axios.post(`${url}/auth/login`, userData);
      if (response.status === 201) {
        router.push(`../zone/${communityID}?token=${response.data.token}`);
        console.log(response.data.token);
      } else if (response.status === 400) {
        Alert.alert("Error", response.data.message);
      }
      if (response.status === 404) {
        Alert.alert("Error", "dsa");
        console.log(response.data.message);
      }
    } catch (e) {
      console.log(e);
      console.log(e.message);
      Alert.alert("Error", "Error al ingresar");
    }
  };

  return (
    <View className="w-4/5 justify-center">
      <View className="flex-row items-center mb-8 bg-teal-700 rounded-xl justify-center w-full">
        <Text className="mr-4 text-2xl font-bold text-white">
          Ingresa a {"\n"}
          {community.text}
        </Text>
        <Image
          source={{ uri: imageSource }}
          style={{ width: 100, height: 100 }}
          resizeMode="contain"
        />
      </View>
      <View className="w-full max-w-sm items-center">
        <TextInput
          placeholder="correo institucional"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          autoCompleteTyoe="email"
          className="mb-4 border-b-2 border-gray-200 w-full h-10"
        />
        <TextInput
          placeholder="Contraseña"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          className="mb-4 border-b-2 border-gray-200 w-full h-10"
        />

        <CustomButton text="Log In" onPress={handleLogin} />
      </View>
    </View>
  );
}
