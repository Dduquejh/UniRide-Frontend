import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Text, View } from "react-native";
import TabBar from "../components/TabBar";

const Profile = () => {
  const insets = useSafeAreaInsets();

  return (
    <View
      className="flex-1 w-4/5 justify-center mx-auto"
      style={{ marginTop: insets.top }}
    >
      <View className="flex-1 w-4/5 justify-center items-center">
        <Text>Profile</Text>
      </View>
      <TabBar />
    </View>
  );
};

export default Profile;
