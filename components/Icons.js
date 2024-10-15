import Ionicons from "@expo/vector-icons/Ionicons";

export const SearchIcon = (props) => {
  return (
    <Ionicons name="search-circle-outline" size={24} color="black" {...props} />
  );
};

export const ProfileIcon = (props) => {
  return (
    <Ionicons name="person-circle-outline" size={24} color="black" {...props} />
  );
};

export const ReturnIcon = (props) => {
  return <Ionicons name="arrow-back" size={24} color="black" {...props} />;
};

export const EditIcon = (props) => {
  return <Ionicons name="pencil-outline" size={24} color="black" {...props} />;
};

export const CarIcon = (props) => {
  return <Ionicons name="car" size={32} color="black" {...props} />;
};

export const ZoneIcon = (props) => {
  return <Ionicons name="location" size={32} color="black" {...props} />;
};
