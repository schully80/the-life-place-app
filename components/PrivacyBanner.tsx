import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

const KEY = 'privacy_banner_dismissed_v1';

export default function PrivacyBanner() {
  const [visible, setVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const v = await AsyncStorage.getItem(KEY);
      if (!v) setVisible(true);
    })();
  }, []);

  if (!visible) return null;

  return (
    <View style={s.bar}>
      <Text style={s.text}>
        We protect your data under POPIA. Read our Privacy Policy.
      </Text>
      <View style={s.row}>
        <TouchableOpacity onPress={() => router.push('/privacy')} style={s.linkBtn}>
          <Text style={s.link}>View policy</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={async () => { setVisible(false); await AsyncStorage.setItem(KEY, '1'); }}
          style={s.dismissBtn}
        >
          <Text style={s.dismiss}>Got it</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  bar: {
    position: 'absolute', left: 16, right: 16, bottom: 20,
    backgroundColor: '#111827', borderRadius: 14, padding: 12,
  },
  text: { color: '#fff', fontSize: 12, marginBottom: 8, fontFamily: 'Montserrat-Regular' },
  row: { flexDirection: 'row', gap: 12, justifyContent: 'flex-end' },
  linkBtn: { paddingVertical: 6, paddingHorizontal: 10, backgroundColor: '#B3282D', borderRadius: 999 },
  link: { color: '#fff', fontFamily: 'Montserrat-SemiBold', fontSize: 12 },
  dismissBtn: { paddingVertical: 6, paddingHorizontal: 10 },
  dismiss: { color: '#fff', fontFamily: 'Montserrat-Medium', fontSize: 12, opacity: 0.9 },
});
