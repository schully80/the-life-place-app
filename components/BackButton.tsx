// components/BackButton.tsx
import React from 'react';
import { Pressable, View, Text, StyleSheet, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { BlurView } from 'expo-blur';
import AppIcon from './AppIcon';

type Props = {
  label?: string;
  color?: string;         // for plain variant
  fallbackTo?: string;    // used when no history
  glass?: boolean;        // round glass style like other headers
  onPress?: () => void;   // custom handler (overrides default back logic)
};

export default function BackButton({
  label,
  color = '#111827',
  fallbackTo = '/community',
  glass = false,
  onPress,
}: Props) {
  const router = useRouter();

  const handlePress = () => {
    if (onPress) {
      onPress();
      return;
    }
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace(fallbackTo);
    }
  };

      if (glass) {
        return (
          <View style={[styles.glassWrap, styles.glassWrapIconOnly]}>
        <BlurView
          intensity={GLASS_BLUR_INTENSITY}
          tint="light"
          style={StyleSheet.absoluteFillObject}
        />
        <Pressable
          onPress={handlePress}
          style={({ pressed }) => [
            styles.surfaceBase,
            styles.surfaceIconOnly,
            styles.glassBtn,
            pressed && Platform.OS !== 'ios' && styles.surfacePressed,
          ]}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          accessibilityRole="button"
          accessibilityLabel={label ? `Back, ${label}` : 'Back'}
          android_ripple={{ color: 'rgba(17,24,39,0.08)', borderless: false, radius: SIZE / 2 }}
        >
          <AppIcon name="back" size={18} color="#111827" />
        </Pressable>
      </View>
    );
  }

  // Plain variant
  return (
    <View style={[styles.glassWrap, label ? styles.glassWrapLabel : styles.glassWrapIconOnly]}>
      <BlurView
        intensity={GLASS_BLUR_INTENSITY}
        tint="light"
        style={StyleSheet.absoluteFillObject}
      />
      <Pressable
        onPress={handlePress}
        style={({ pressed }) => [
          styles.surfaceBase,
          label ? styles.surfaceWithLabel : styles.surfaceIconOnly,
          styles.plainWrap,
          pressed && Platform.OS !== 'ios' && styles.surfacePressed,
        ]}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        accessibilityRole="button"
        accessibilityLabel={label ? `Back, ${label}` : 'Back'}
        android_ripple={{ color: 'rgba(17,24,39,0.08)', borderless: false, radius: SIZE / 2 }}
      >
        <AppIcon name="back" size={22} color={color} />
        {label ? <Text style={[styles.plainLabel, { color }]}>{label}</Text> : null}
      </Pressable>
    </View>
  );
}

const SIZE = 44;
const GLASS_BLUR_INTENSITY = Platform.OS === 'android' ? 56 : 42;
const GLASS_OUTER_BG =
  Platform.OS === 'android' ? 'rgba(241,245,249,0.9)' : 'rgba(241,245,249,0.82)';
const GLASS_INNER_BG =
  Platform.OS === 'android' ? 'rgba(255,255,255,0.66)' : 'rgba(255,255,255,0.52)';
const GLASS_BORDER =
  Platform.OS === 'android' ? 'rgba(148,163,184,0.4)' : 'rgba(148,163,184,0.28)';

const styles = StyleSheet.create({
  // Shared surface language for header controls.
  surfaceBase: {
    minWidth: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  surfaceIconOnly: {
    width: SIZE,
  },
  surfaceWithLabel: {
    flexDirection: 'row',
    paddingHorizontal: 14,
    gap: 6,
  },
  surfacePressed: {
    opacity: 0.88,
    transform: [{ scale: 0.98 }],
  },

  // Glass variant container (round, blurred, subtle border)
  glassWrap: {
    minWidth: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    overflow: 'hidden',
    backgroundColor: GLASS_OUTER_BG,
    borderWidth: 0.75,
    borderColor: GLASS_BORDER,
  },
  glassWrapIconOnly: {
    width: SIZE,
  },
  glassWrapLabel: {
    minWidth: SIZE,
  },
  glassBtn: {
    width: '100%',
    height: '100%',
    backgroundColor: GLASS_INNER_BG,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Plain variant
  plainWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: GLASS_INNER_BG,
  },
  plainLabel: {
    marginLeft: 2,
    fontSize: 15,
    fontFamily: 'Montserrat-Medium',
  },
});
