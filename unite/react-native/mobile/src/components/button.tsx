import { Text, TouchableOpacity, TouchableOpacityProps, ActivityIndicator } from "react-native";

interface ButtonProps extends TouchableOpacityProps {
  isLoading?: boolean
}

function Button({ isLoading = false, ...props }: ButtonProps) {
  return (
    <TouchableOpacity
      disabled={isLoading}
      activeOpacity={0.7}
      className="w-full h-14 bg-orange-500 items-center justify-center rounded-lg"
      {...props}
    >
      {isLoading ? <ActivityIndicator /> : props.children}
    </TouchableOpacity>
  )
}

function TextButton(props: TouchableOpacityProps) {
  return (
    <Text className="text-green-500 text-base font-bold uppercase" {...props}>{props.children}</Text>
  )
}

Button.text = TextButton

export { Button }