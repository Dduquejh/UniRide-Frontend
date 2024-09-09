import { Image, Pressable, Text } from "react-native";
import { Link } from "expo-router";

const CommunityCard = ({ imageSource, text, id }) => {
  return (
    <Link href={"/${id}"} asChild>
      <Pressable className="flex-row items-center border-2 border-gray-400 rounded-lg p-4 mb-4 bg-slate-100 shadow-xl">
        <Image
          source={imageSource}
          style={{ width: 40, height: 40 }}
          resizeMode="contain"
        />
        <Text className="ml-4 text-lg font-semibold text-gray-800">{text}</Text>
      </Pressable>
    </Link>
  );
};

export default CommunityCard;