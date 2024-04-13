import { Text, View } from "react-native";

interface HeaderProps {
  title: string
}

export function Header({ title }: HeaderProps) {
  return (
    <View className='w-full h-28 bg-black/20 px-8 pb-4 border-b border-white/10 flex-row items-end justify-center'>
      <Text className='flex-1 text-white font-medium text-lg text-center'>{title}</Text>
    </View>
  )
}