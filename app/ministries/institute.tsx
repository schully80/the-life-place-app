import React from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView } from 'react-native';
import { Stack } from 'expo-router';
import BackButton from '../../components/BackButton';

export default function Institute() {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Institute',
          headerLeft: () => <BackButton glass fallbackTo="/ministries" />,
        }}
      />

      {/* Hero */}
      <ImageBackground
        // Ensure this file exists at: app/assets/min-institute.jpg
        source={require('../../assets/min-institute.jpg')}
        style={styles.hero}
        imageStyle={{ opacity: 0.9 }}
        resizeMode="cover"
      >
        <View style={styles.overlay} />

        <View style={styles.heroCenter}>
          <Text style={styles.h1}>The Life Place Institute</Text>

          {/* Launching Soon badge */}
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Launching Soon</Text>
          </View>
        </View>
      </ImageBackground>

      {/* Body */}
      <ScrollView contentContainerStyle={styles.body}>
        <View style={styles.card}>
          <Text style={styles.p}>
            A hub for discipleship, teaching, and leadership training is on the way.{' '}
            <Text style={styles.redStrong}>Come. See. Jesus</Text>
          </Text>
        </View>

        {/* (Optional) Registration placeholder, disabled for now */}
        <View style={styles.card}>
          <Text style={styles.h2}>Register your interest</Text>
          <Text style={styles.muted}>
            Sign-ups will open when dates are announced.
          </Text>
        </View>
      </ScrollView>
    </>
  );
}

const BRAND_RED = '#B3282D';

const styles = StyleSheet.create({
  hero: {
    height: 320,
    justifyContent: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.20)',
  },
  heroCenter: {
    zIndex: 2,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  h1: {
    color: '#FFF',
    fontFamily: 'Montserrat-Bold',
    fontSize: 32,
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.35)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  badge: {
    backgroundColor: BRAND_RED,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  badgeText: {
    color: '#FFF',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 13,
    letterSpacing: 0.3,
  },

  body: {
    padding: 16,
    paddingBottom: 40,
    backgroundColor: '#FFFFFF',
    rowGap: 14,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  h2: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 18,
    color: '#111827',
    textAlign: 'center',
    marginBottom: 6,
  },
  p: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 16,
    color: '#374151',
    lineHeight: 24,
  },
  redStrong: {
    color: BRAND_RED,
    fontFamily: 'Montserrat-SemiBold',
  },
  muted: {
    marginTop: 4,
    fontFamily: 'Montserrat-Medium',
    fontSize: 13,
    color: '#6B7280',
    textAlign: 'center',
  },
});
