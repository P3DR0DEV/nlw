import { Input } from '@/components/input'
import { View, Image, StatusBar, Alert } from 'react-native'
import { FontAwesome6, MaterialIcons, AntDesign, Ionicons } from '@expo/vector-icons'
import { colors } from '@/styles/colors'
import { Button } from '@/components/button'
import { Link, router } from 'expo-router'
import { useState } from 'react'
import { api } from '@/lib/axios'
import axios from 'axios'
import { useBadgeStore } from '@/store/badge-store'

const eventId = '23f44cb2-6c5a-4660-8af0-a9e41224430f'

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isLoadind, setIsLoadind] = useState(false)
  const badgeStore = useBadgeStore()


  async function handleRegister() {
    try {
      setIsLoadind(true)
      if (!name.trim() || !email.trim()) {
        return Alert.alert('Atenção', 'Por favor preencha todos os campos')
      }

      const response = await api.post(`/events/${eventId}/attendees`, {
        name,
        email
      })
      
      if (response.status === 201) {
        const { data } = await api.get(`/attendees/${response.data.attendeeId}/badge`)

        badgeStore.save(data.badge)
        
        // redirect if user confirms
        Alert.alert('Atenção', 'Ingresso registrado com sucesso', [{ text: 'OK', onPress: () => router.push('/ticket') }])
      }

    } catch (error) {
      console.log(error)

      if(axios.isAxiosError(error)) {
        if(error.response?.data.message ) {
          return Alert.alert('Atenção', error.response.data.message)
        }
      }
      Alert.alert('Atenção', 'Não foi possivel registrar o ingresso')
    } finally {
      setIsLoadind(false)
    }
  }

  return (
    <View className='flex-1 bg-green-500 items-center justify-center'>
      {/* StatusBar component === native status bar where locates hours and apps */}
      <StatusBar barStyle="light-content" />

      <Image source={require('@/assets/logo.png')} className='h-16' resizeMode='contain' />

      <View className='w-full mt-12 gap-3'>
        <Input>
          <FontAwesome6 name="user-circle" size={20} color={colors.green[200]} />
          <Input.field placeholder='Nome Completo' value={name} onChangeText={setName} />
        </Input>

        <Input>
          <MaterialIcons name="alternate-email" size={20} color={colors.green[200]} />
          <Input.field placeholder='E-mail' keyboardType='email-address' value={email} onChangeText={setEmail} />
        </Input>

        <Button onPress={handleRegister} isLoading={isLoadind}>
          <Ionicons name="create-outline" size={20} color={colors.green[500]} />
          <Button.text>
            Realizar Inscrição
          </Button.text>
        </Button>

        <Link href="/" className='text-gray-100 text-base font-bold text-center'>
          Já possui ingresso?
        </Link>
      </View>
    </View>
  )
}
