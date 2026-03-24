// components/BackButton.tsx
import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
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
    const SIZE = 36;
    return (
      <View style={styles.glassWrap} accessibilityRole="button" accessibilityLabel={label ? `Back, ${label}` : 'Back'}>
        <BlurView intensity={28} tint="light" style={StyleSheet.absoluteFillObject} />
        <TouchableOpacity
          onPress={handlePress}
          style={styles.glassBtn}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <AppIcon name="back" size={18} color="#111827" />
        </TouchableOpacity>
      </View>
    );
  }

  // Plain variant
  return (
    <TouchableOpacity
      onPress={handlePress}
      style={styles.plainWrap}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      accessibilityRole="button"
      accessibilityLabel={label ? `Back, ${label}` : 'Back'}
    >
      <AppIcon name="back" size={22} color={color} />
      {label ? <Text style={[styles.plainLabel, { color }]}>{label}</Text> : null}
    </TouchableOpacity>
  );
}

const SIZE = 36;

const styles = StyleSheet.create({
  // Glass variant container (round, blurred, subtle border)
  glassWrap: {
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    overflow: 'hidden',
    borderWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.06)',
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  glassBtn: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Plain variant
  plainWrap: { flexDirection: 'row', alignItems: 'center' },
  plainLabel: { marginLeft: 2, fontSize: 15, fontFamily: 'Montserrat-Medium' },
});
