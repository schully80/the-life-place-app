import React from 'react';
import { Pressable, Text, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function BackButton() {
  const navigation = useNavigation();
  const canGoBack = navigation.canGoBack?.() ?? false;

  if (!canGoBack) return null;

  return (
    <Pressable
      onPress={() => navigation.goBack()}
      style={({ pressed }) => [styles.btn, pressed && styles.pressed]}
      android_ripple={{ color: 'rgba(0,0,0,0.06)', borderless: true }}
      hitSlop={{ top: 8, bottom: 8, left: 8, right: 12 }}
      accessibilityRole="button"
      accessibilityLabel="Go back"
    >
      <Ionicons name="chevron-back" size={22} color="#111827" />
      <Text style={styles.text}>Back</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 999,
  },
  pressed: { opacity: 0.6 },
  text: {
    fontSize: 16,
    color: '#111827',
    marginLeft: 2,
    // If you loaded Inter/Montserrat, you can swap this:
    // fontFamily: 'Inter-SemiBold',
  },
});
