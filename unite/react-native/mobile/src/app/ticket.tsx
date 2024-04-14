import { useState } from "react";
import { StatusBar, Text, View, ScrollView,TouchableOpacity, Alert, Modal } from "react-native";
import * as ImagePicker from 'expo-image-picker';

import { Button } from "@/components/button";
import { Credential } from "@/components/credential";
import { Header } from "@/components/header";
import { colors } from "@/styles/colors";
import { FontAwesome } from "@expo/vector-icons";
import { QRCode } from "@/components/qrcode";

export default function Ticket() {
  const [imageUrl, setImageUrl] = useState('')
  const [expandQRCode, setExpandQRCode] = useState(false)

  async function handlePickImage() {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if(status === 'granted') {
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 4],
        })
        if(result.assets) {
          setImageUrl(result.assets[0].uri)
        }
      }
    } catch (error) {
      console.log(error)
      Alert.alert('Atenção', 'Não foi possivel carregar a imagem')
    }
  }


  return (
    <View className='flex-1 bg-green-500 items-center justify-center'>
      <StatusBar barStyle="light-content" />
      <Header title="Minha credencial"/>
      <ScrollView className="-mt-28 -z-10" contentContainerClassName="px-8 pb-8" showsVerticalScrollIndicator={false}>

        <Credential image={imageUrl} onChangeAvatar={handlePickImage} onExpandQRCode={() => {setExpandQRCode(true)}} />

        <FontAwesome name="angle-double-down" size={24} color={colors.gray[300]} className="mt-6 self-center"/>
        <Text className="text-gray-100 text-2xl font-bold mt-4">Compartilhar credencial</Text>
        <Text className="text-gray-100 text-base font-regular mt-1 mb-6">Mostre ao mundo que você vai participar do Unite Summit!</Text>
        
        <Button>
          <Button.text>Compartilhar</Button.text>
        </Button>

        <TouchableOpacity activeOpacity={0.7} className="mt-10">
          <Text className="text-base text-gray-100 text-center">Remover Ingresso</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Modal uses to show in full screen @QRCode */}
      <Modal visible={expandQRCode} statusBarTranslucent animationType="slide">
        <View className="flex-1 bg-green-500 items-center justify-center">
          <TouchableOpacity activeOpacity={0.9} onPress={() => setExpandQRCode(false)}>
            <QRCode size={300} value="teste" />
          </TouchableOpacity>
        </View>
      </Modal>

    </View>
  )
}