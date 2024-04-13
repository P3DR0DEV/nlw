import "@/styles/global.css"

import { Slot } from "expo-router"
import { useFonts,Roboto_500Medium, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto'

import { Loading } from "@/components/loading"

export default function Layout() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular,Roboto_500Medium, Roboto_700Bold })

  return (
    <>
      {/* Slot is where you want the children to be rendered */}
      { fontsLoaded ? <Slot /> : <Loading /> }
    </>
)
}