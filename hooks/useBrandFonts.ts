// hooks/useBrandFonts.ts
import { useFonts } from 'expo-font';

/** Loads brand fonts (Montserrat only). Returns true when ready. */
export function useBrandFonts(): boolean {
  const [fontsLoaded] = useFonts({
    // Montserrat
    'Montserrat-Light': require('../assets/fonts/Montserrat-Light.ttf'),
    'Montserrat-Regular': require('../assets/fonts/Montserrat-Regular.ttf'),
    'Montserrat-Medium': require('../assets/fonts/Montserrat-Medium.ttf'),
    'Montserrat-SemiBold': require('../assets/fonts/Montserrat-SemiBold.ttf'),
    'Montserrat-Bold': require('../assets/fonts/Montserrat-Bold.ttf'),
  });

  return fontsLoaded;
}
