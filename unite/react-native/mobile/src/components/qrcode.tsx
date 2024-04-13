import { colors } from "@/styles/colors";
import { View } from "react-native";
import QRCodeSvg from 'react-native-qrcode-svg'

interface QRCodeProps {
  size: number
  value: string
}

export function QRCode(props: QRCodeProps) {
  return (
    <QRCodeSvg {...props} color={colors.white} backgroundColor="transparent"/>
  )
}