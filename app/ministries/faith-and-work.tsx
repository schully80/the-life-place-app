import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Stack } from 'expo-router';
import BackButton from '../../components/BackButton';

export default function FaithAndWork() {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Faith & Work',
          headerLeft: () => <BackButton glass fallbackTo="/ministries" />,
        }}
      />

      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.banner}>
          <Text style={styles.h1}>Faith &amp; Work</Text>
          <View style={styles.pill}><Text style={styles.pillText}>Coming Soon</Text></View>
        </View>

        <Text style={styles.body}>
          Equipping believers to integrate their faith with their daily work and calling.
          <Text style={styles.red}> Come. See. Jesus.</Text>
        </Text>

        {/* (Optional) Registration section – disabled for now */}
        <View style={styles.card}>
          <Text style={styles.h2}>Register your interest</Text>
          <Text style={styles.muted}>Sign-ups will open when dates are announced.</Text>
        </View>
      </ScrollView>
    </>
  );
}

const BRAND_RED = '#B3282D';

const styles = StyleSheet.create({
  container: { padding: 16, paddingBottom: 40, backgroundColor: '#FFFFFF', rowGap: 14 },
  banner: {
    borderRadius: 14, padding: 16, borderWidth: 1, borderColor: '#E5E7EB', backgroundColor: '#FFF',
    shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 8, shadowOffset: { width: 0, height: 3 },
  },
  h1: { fontFamily: 'Montserrat-Bold', fontSize: 26, color: '#111827', textAlign: 'center', marginBottom: 8 },
  pill: { alignSelf: 'center', backgroundColor: BRAND_RED, borderRadius: 999, paddingHorizontal: 10, paddingVertical: 4 },
  pillText: { color: '#FFF', fontFamily: 'Montserrat-SemiBold', fontSize: 13 },

  body: { fontFamily: 'Montserrat-Regular', fontSize: 16, color: '#374151', lineHeight: 24, textAlign: 'center' },
  red: { color: BRAND_RED, fontFamily: 'Montserrat-SemiBold' },

  card: {
    borderRadius: 14, padding: 16, borderWidth: 1, borderColor: '#E5E7EB', backgroundColor: '#FFF',
    shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 8, shadowOffset: { width: 0, height: 3 },
  },
  h2: { fontFamily: 'Montserrat-SemiBold', fontSize: 18, color: '#111827', marginBottom: 6, textAlign: 'center' },
  muted: { fontFamily: 'Montserrat-Medium', fontSize: 13, color: '#6B7280', textAlign: 'center' },
});
