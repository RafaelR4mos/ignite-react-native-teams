import { StatusBar } from 'expo-status-bar'
import { View } from 'react-native'
import { Groups } from '@screens/Groups'

export default function App() {
  return (
    <View>
      <StatusBar />
      <Groups />
    </View>
  )
}
