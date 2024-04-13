import { Image, ImageBackground, Text, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons"
import { colors } from "@/styles/colors";
import { QRCode } from "./qrcode";
interface CredentialProps {
  image: string
  onChangeAvatar: () => void
  onExpandQRCode: () => void
}

export function Credential(props: CredentialProps) {
  return (
    <View className='w-full self-stretch items-center'>
      <Image source={require('@/assets/ticket/band.png')} className='h-16' resizeMode='contain' />

      <View className="bg-black/20 self-stretch items-center pb-6 border border-white/10 mx-3 rounded-2xl -mt-5">
        <ImageBackground
          source={require('@/assets/ticket/header.png')}
          className='px-6 py-8 border-b border-white/10 self-stretch overflow-hidden h-40'
          resizeMode='contain'
          imageStyle={{ borderRadius: 8 }}
        >

          {/* Event Info @Name, @Code */}
          <View className="w-full flex-row items-center justify-between">
            <Text className="text-zinc-50 text-sm font-bold">Unite Summit</Text>
            <Text className="text-zinc-50 text-sm font-bold">#123</Text>
          </View>

          <View className="size-40 bg-black rounded-full" />
        </ImageBackground>

        {/* User Info  @ProfilePicture, @Name, @Email */}
        {props.image ? (
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={props.onChangeAvatar}
          >
            <Image source={{ uri: props.image }} className='size-36 rounded-full -mt-24' />
          </TouchableOpacity>

        ) : (
          <TouchableOpacity
            className='size-36 rounded-full bg-gray-400 items-center justify-center -mt-24'
            activeOpacity={0.9}
            onPress={props.onChangeAvatar}
          >

            <Feather name="camera" size={32} color={colors.green[400]} className="absolute bottom-0 right-0" />
          </TouchableOpacity>
        )}
        <Text className="text-zinc-50 text-2xl font-bold mt-4">Pedro Henrique</Text>
        <Text className="text-zinc-300 text-base font-regular">email</Text>

        {/* Generated QR */}
        <QRCode size={120} value="teste"/>
        <TouchableOpacity activeOpacity={0.7} className="mt-6" onPress={props.onExpandQRCode}>
          <Text className="text-orange-500 text-sm font-bold">Ampliar QRCode</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}