import { useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { Link } from "expo-router";

const ZoneCard = ({ imgSource, text, zoneID }) => {
  const [isPressed, setIsPressed] = useState(false);
  return (
    <Link asChild href={`/search/${zoneID}`}>
      <Pressable
        className="w-full max-w-xs justify-center items-center mb-4"
        onPressIn={() => setIsPressed(true)}
        onPressOut={() => setIsPressed(false)}
      >
        <View
          className={`bg-slate-300 rounded-xl shadow-lg overflow-hidden w-full ${isPressed ? "bg-slate-400" : ""}`}
        >
          <Image
            source={imgSource}
            style={{ width: "100%", height: 100 }}
            resizeMode="cover"
            className={`${isPressed ? "opacity-50" : ""}`}
          />
          <View className="p-2">
            <Text className="text-lg font-bold text-black text-center">
              {text}
            </Text>
          </View>
        </View>
      </Pressable>
    </Link>
  );
};

export default ZoneCard;
