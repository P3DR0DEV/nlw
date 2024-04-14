import { Input } from '@/components/input'
import { View, Image, StatusBar, Alert } from 'react-native'
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons'
import { colors } from '@/styles/colors'
import { Button } from '@/components/button'
import { Link, router } from 'expo-router'
import { useState } from 'react'
import { api } from '@/lib/axios'

export default function Home() {
  const [code, setCode] = useState('')
  const [isLoadind, setIsLoadind] = useState(false)

  async function handleAccessCredential() {
    try  {
      setIsLoadind(true)
      if(!code.trim()) {
        return Alert.alert('Atenção', 'Por favor informe o seu ingresso')
      }
  
      const response = await api.get(`/attendees/${code}/badge`)

      if(response.status === 200) {
        Alert.alert('Atenção', 'Ingresso acessado com sucesso', [{ text: 'OK', onPress: () => router.push('/ticket') }])
      }
    } finally {
      setIsLoadind(false)
    }
  }
  
  return(
    <View className='flex-1 bg-green-500 items-center justify-center'>
      {/* StatusBar component === native status bar where locates hours and apps */}
      <StatusBar barStyle="light-content" />

      <Image source={require('@/assets/logo.png')} className='h-16' resizeMode='contain'/>

      <View className='w-full mt-12 gap-3'>
        <Input>
          <MaterialCommunityIcons name="ticket-confirmation-outline" size={20} color={colors.green[200]} />
          <Input.field placeholder='Código do Ingresso' value={code} onChangeText={setCode} />
        </Input>

        <Button onPress={handleAccessCredential} isLoading={isLoadind}>
          <AntDesign name="login" size={20} color={colors.green[500]} />
          <Button.text>
            Acessar Credencial
          </Button.text> 
        </Button>

        <Link href="/register" className='text-gray-100 text-base font-bold text-center'>
          Ainda não possui ingresso?
        </Link>
      </View>
    </View>
  )
}
