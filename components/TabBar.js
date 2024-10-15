import { Link, usePathname } from "expo-router";
import { Text, View, Pressable } from "react-native";
import { ProfileIcon, SearchIcon } from "./Icons";

export default function TabBar({ communityID, token }) {
  const currentPath = usePathname();
  return (
    <View className="flex-row justify-around p-2 bg-gray-100">
      <Link href={`/zone/${communityID}?token=${token}`} asChild>
        <Pressable className="flex items-center space-y-1 w-1/2">
          <SearchIcon
            className={`${currentPath.includes("zone") || currentPath.includes("search") ? "text-blue-500" : "text-gray-800"}`}
          />
          <Text
            className={`${currentPath.includes("zone") || currentPath.includes("search") ? "font-bold text-blue-500" : "text-gray-800"}`}
          >
            Buscar
          </Text>
        </Pressable>
      </Link>

      {/* Pestaña de perfil */}
      <Link
        href={{
          pathname: "/profile",
          params: ((communityID = { communityID }), (token = { token })),
        }}
        asChild
      >
        <Pressable className="flex items-center space-y-1 w-1/2">
          <ProfileIcon
            className={`${currentPath === "/profile" ? "text-blue-500" : "text-gray-800"}`}
          />
          <Text
            className={`${currentPath === "/profile" ? "font-bold text-blue-500" : "text-gray-800"}`}
          >
            Perfil
          </Text>
        </Pressable>
      </Link>
    </View>
  );
}
