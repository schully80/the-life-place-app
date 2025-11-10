import React from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView } from 'react-native';
import { Stack } from 'expo-router';
import BackButton from '../../components/BackButton';

const BRAND_RED = '#B3282D';

export default function PremaritalCounseling() {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Premarital Counselling',
          headerLeft: () => <BackButton glass fallbackTo="/ministries" />,
        }}
      />

      {/* Hero */}
      <ImageBackground
        source={require('../../assets/min-premarital-counseling.jpg')}
        style={styles.hero}
        imageStyle={{ opacity: 0.9 }}
        resizeMode="cover"
      >
        <View style={styles.overlay} />
        <View style={styles.heroCenter}>
          <Text style={styles.h1}>Premarital Counselling</Text>
          <View style={styles.badge}><Text style={styles.badgeText}>Launching Soon</Text></View>
        </View>
      </ImageBackground>

      {/* Body */}
      <ScrollView contentContainerStyle={styles.body}>
        <View style={styles.card}>
          <Text style={styles.p}>
            We’re preparing resources to help couples build Christ-centred marriages.
            Stay tuned as we launch soon at The Life Place.{' '}
            <Text style={styles.em}>Come. See. <Text style={styles.emRed}>Jesus</Text></Text>
          </Text>
        </View>

        {/* “Registration” placeholder to mirror site (disabled) */}
        <View style={styles.card}>
          <Text style={styles.h2}>Register your interest</Text>
          <Text style={styles.muted}>
            Sign-ups will open when dates are announced. Thank you for your interest!
          </Text>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  hero: {
    height: 280,
    justifyContent: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.18)',
  },
  heroCenter: {
    zIndex: 2,
    paddingHorizontal: 24,
    alignItems: 'center',
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
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  badgeText: {
    color: '#FFF',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 13,
    letterSpacing: 0.2,
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
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
    lineHeight: 24,
    color: '#374151',
  },
  em: { fontFamily: 'Montserrat-SemiBold', color: '#374151' },
  emRed: { color: BRAND_RED, fontFamily: 'Montserrat-Bold' },
  muted: {
    marginTop: 4,
    fontFamily: 'Montserrat-Medium',
    fontSize: 13,
    color: '#6B7280',
    textAlign: 'center',
  },
});
