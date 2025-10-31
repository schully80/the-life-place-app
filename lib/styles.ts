// lib/styles.ts
import { StyleSheet } from 'react-native';

export const colors = {
  brand: {
    red: '#B3282D',
    gray: '#374151',
    surface: '#FFFFFF',
    surfaceMuted: '#FFFFFFEE',
    border: '#F1F5F9',
    backdrop: '#121212',
  },
  text: {
    primary: '#111827',
    secondary: '#6B7280',
    inverse: '#FFFFFF',
  },
};

export const g = StyleSheet.create({
  // Buttons
  button: {
    backgroundColor: colors.brand.red,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  buttonText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
    color: colors.text.inverse,
    textAlign: 'center',
  },

  // Headings / text
  h1: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 24,
    color: colors.text.primary,
  },
  p: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 15,
    color: colors.text.secondary,
  },

  // Cards / surfaces
  card: {
    backgroundColor: colors.brand.surfaceMuted,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.brand.border,
  },
});
