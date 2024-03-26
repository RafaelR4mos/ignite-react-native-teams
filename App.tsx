import { StatusBar } from 'react-native';
import { ThemeProvider } from 'styled-components';
import { Groups } from './src/screens/Groups';
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto';
import theme from './src/theme';
import { Loading } from './src/components/Loading';

export default function App() {
  const [fontLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  return (
    <ThemeProvider theme={theme}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      {fontLoaded ? <Groups /> : <Loading />}
    </ThemeProvider>
  );
}
