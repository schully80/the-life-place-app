import { useEffect, useRef } from 'react';
import {
  Animated,
  Easing,
  Image,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const ACCENT_STRONG = '#B3282D';
const LOGO_IMAGE = require('../assets/logo.png');
const SPLASH_FADE_START_MS = 1200;
const SPLASH_TOTAL_MS = 2000;
const FLASH_DELAY_MS = 550;

type SiteSplashProps = {
  onFinish: () => void;
};

export default function SiteSplash({ onFinish }: SiteSplashProps) {
  const { width } = useWindowDimensions();
  const haloSize = Math.max(176, Math.min(width * 0.34, 240));
  const spinnerSize = Math.max(72, Math.min(width * 0.18, 120));
  const spinnerBorder = Math.max(3, Math.min(width * 0.009, 6));

  const overlayOpacity = useRef(new Animated.Value(1)).current;
  const ringOpacity = useRef(new Animated.Value(0)).current;
  const ringScale = useRef(new Animated.Value(0.7)).current;
  const flashOpacity = useRef(new Animated.Value(0)).current;
  const flashScale = useRef(new Animated.Value(0.7)).current;
  const spinnerRotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const spinnerLoop = Animated.loop(
      Animated.timing(spinnerRotation, {
        toValue: 1,
        duration: 700,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );

    spinnerLoop.start();

    Animated.parallel([
      Animated.sequence([
        Animated.timing(ringOpacity, {
          toValue: 1,
          duration: 540,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(ringOpacity, {
          toValue: 1,
          duration: 360,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]),
      Animated.sequence([
        Animated.timing(ringScale, {
          toValue: 1.08,
          duration: 540,
          easing: Easing.bezier(0.33, 1, 0.68, 1),
          useNativeDriver: true,
        }),
        Animated.timing(ringScale, {
          toValue: 1,
          duration: 360,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]),
    ]).start();

    const flashStart = setTimeout(() => {
      Animated.parallel([
        Animated.sequence([
          Animated.timing(flashOpacity, {
            toValue: 1,
            duration: 240,
            easing: Easing.out(Easing.quad),
            useNativeDriver: true,
          }),
          Animated.timing(flashOpacity, {
            toValue: 0,
            duration: 560,
            easing: Easing.out(Easing.quad),
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.timing(flashScale, {
            toValue: 1,
            duration: 240,
            easing: Easing.out(Easing.quad),
            useNativeDriver: true,
          }),
          Animated.timing(flashScale, {
            toValue: 1.3,
            duration: 560,
            easing: Easing.out(Easing.quad),
            useNativeDriver: true,
          }),
        ]),
      ]).start();
    }, FLASH_DELAY_MS);

    const fadeStart = setTimeout(() => {
      Animated.timing(overlayOpacity, {
        toValue: 0,
        duration: SPLASH_TOTAL_MS - SPLASH_FADE_START_MS,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }).start();
    }, SPLASH_FADE_START_MS);

    const finishTimer = setTimeout(() => {
      onFinish();
    }, SPLASH_TOTAL_MS);

    return () => {
      clearTimeout(flashStart);
      clearTimeout(fadeStart);
      clearTimeout(finishTimer);
      spinnerLoop.stop();
    };
  }, [
    flashOpacity,
    flashScale,
    onFinish,
    overlayOpacity,
    ringOpacity,
    ringScale,
    spinnerRotation,
  ]);

  const spin = spinnerRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.View style={[styles.container, { opacity: overlayOpacity }]}>
      <LinearGradient
        colors={['#FDFAF6', '#F7F6F4', '#F1E8E4']}
        start={{ x: 0.08, y: 0 }}
        end={{ x: 0.92, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      <Image source={LOGO_IMAGE} resizeMode="contain" style={[styles.logoGlow, styles.topGlow]} />
      <Image source={LOGO_IMAGE} resizeMode="contain" style={[styles.logoGlow, styles.bottomGlow]} />

      <View style={styles.center}>
        <Animated.View
          style={[
            styles.ring,
            {
              width: haloSize,
              height: haloSize,
              borderRadius: haloSize / 2,
              opacity: ringOpacity,
              transform: [{ scale: ringScale }],
            },
          ]}
        />

        <Animated.View
          style={[
            styles.flash,
            {
              width: haloSize,
              height: haloSize,
              borderRadius: haloSize / 2,
              opacity: flashOpacity,
              transform: [{ scale: flashScale }],
            },
          ]}
        />

        <Animated.View
          accessibilityLabel="Loading"
          accessibilityRole="progressbar"
          style={[
            styles.spinner,
            {
              width: spinnerSize,
              height: spinnerSize,
              borderRadius: spinnerSize / 2,
              borderWidth: spinnerBorder,
              transform: [{ rotate: spin }],
            },
          ]}
        />
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
  },
  logoGlow: {
    position: 'absolute',
    opacity: 0.08,
  },
  topGlow: {
    top: '14%',
    left: '7%',
    width: 260,
    height: 260,
  },
  bottomGlow: {
    right: '2%',
    bottom: '12%',
    width: 320,
    height: 320,
    opacity: 0.06,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  ring: {
    position: 'absolute',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.4)',
    shadowColor: '#FFFFFF',
    shadowOpacity: 0.35,
    shadowRadius: 30,
    shadowOffset: { width: 0, height: 0 },
  },
  flash: {
    position: 'absolute',
    backgroundColor: 'rgba(179,40,45,0.55)',
  },
  spinner: {
    borderColor: 'rgba(255,255,255,0.2)',
    borderTopColor: ACCENT_STRONG,
  },
});
