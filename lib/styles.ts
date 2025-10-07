
import { StyleSheet } from 'react-native';
export const brand = { primary: '#B3282D', bg: '#F8F7F6', text: '#1F2937' } as const;
export const g = StyleSheet.create({
  screen: { flex: 1, backgroundColor: brand.bg, padding: 20 },
  h1: { fontSize: 28, fontWeight: '600', color: brand.text, marginBottom: 8 },
  p: { fontSize: 16, color: '#374151', lineHeight: 22 },
  card: { backgroundColor: '#fff', borderRadius: 16, padding: 16, shadowColor: '#000', shadowOpacity: 0.06, shadowOffset: { width: 0, height: 4 }, shadowRadius: 8, elevation: 2, marginBottom: 12 },
  button: { backgroundColor: brand.primary, borderRadius: 12, paddingVertical: 14, alignItems: 'center', marginTop: 12 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' }
});
