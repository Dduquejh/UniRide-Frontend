import React, { useState } from "react";
import { Pressable, Text } from "react-native";

const CustomButton = React.forwardRef(({ text, ...props }, ref) => {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <Pressable
      ref={ref}
      className={`w-72 h-12 justify-center items-center rounded-xl ${
        isPressed ? "bg-gray-400" : "bg-gray-300"
      }`}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      {...props}
    >
      <Text className="text-black text-lg">{text}</Text>
    </Pressable>
  );
});

CustomButton.displayName = "CustomButton";

export default CustomButton;
