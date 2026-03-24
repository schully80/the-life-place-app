import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAppAppearance } from '~/components/AppAppearanceProvider';

export default function ScreenLightingOverlay() {
  const { lightingTheme } = useAppAppearance();

  return (
    <LinearGradient
      pointerEvents="none"
      colors={lightingTheme.overlayColors}
      start={lightingTheme.start}
      end={lightingTheme.end}
      style={styles.overlay}
    />
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 90,
  },
});
