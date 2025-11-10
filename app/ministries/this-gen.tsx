import React from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView } from 'react-native';
import { Stack } from 'expo-router';
import BackButton from '../../components/BackButton';

export default function ThisGen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'ThisGen',
          headerLeft: () => <BackButton glass fallbackTo="/ministries" />,
        }}
      />

      {/* Hero */}
      <ImageBackground
        source={require('../../assets/min-this-gen.jpg')}
        style={styles.hero}
        imageStyle={{ opacity: 0.9 }}
        resizeMode="cover"
      >
        <View style={styles.overlay} />
        <View style={styles.heroCenter}>
          <Text style={styles.h1}>ThisGen</Text>
        </View>
      </ImageBackground>

      {/* Body */}
      <ScrollView contentContainerStyle={styles.body}>
        <View style={styles.card}>
          <Text style={styles.p}>
            <Text style={styles.redStrong}>ThisGen</Text> is our youth expression at The Life Place — a space for our
            generation to <Text style={styles.redStrong}>Come. See. Jesus</Text>, grow in faith, build lifelong
            friendships, and discover their purpose — all for the glory of Jesus and the good of the world.
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
    height: 320,                // ~ min-h-[50–60vh] feel on phones
    justifyContent: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.20)', // dark overlay like your Astro file
  },
  heroCenter: {
    zIndex: 2,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  h1: {
    color: '#FFF',
    fontFamily: 'Montserrat-Black', // bold/italic vibe; fallback to SemiBold if you don’t have this weight
    fontSize: 40,                   // ~ 5xl on phones
    fontStyle: 'italic',
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.35)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
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
    fontSize: 16, // ~ text-lg
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
