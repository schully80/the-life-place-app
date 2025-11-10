import React from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView, TouchableOpacity } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import BackButton from '../../components/BackButton';

const BRAND_RED = '#B3282D';

export default function ReliefCenter() {
  const router = useRouter();

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Relief Center',
          // Glass back, and if there’s no history, go back to the ministries list
          headerLeft: () => <BackButton glass fallbackTo="/ministries" />,
        }}
      />

      {/* Hero */}
      <ImageBackground
        source={require('../../assets/min-relief-center.jpg')}
        style={styles.hero}
        imageStyle={{ opacity: 0.9 }}
        resizeMode="cover"
      >
        <View style={styles.overlay} />
        <View style={styles.heroCenter}>
          <Text style={styles.h1}>Relief Center</Text>
        </View>
      </ImageBackground>

      {/* Body */}
      <ScrollView contentContainerStyle={styles.body}>
        <View style={styles.card}>
          <Text style={styles.p}>
            The Relief Center exists to extend the love of Jesus to those in need — through food
            distribution, care programs, and practical help in times of crisis.
          </Text>
          <Text style={[styles.p, { marginTop: 10 }]}>
            We believe in being the hands and feet of Jesus by caring for the vulnerable and serving
            our community with compassion and dignity.
          </Text>

          {/* Donate CTA → your Generosity tab */}
          <TouchableOpacity
            onPress={() => router.push('/generosity')}
            style={styles.cta}
            accessibilityRole="button"
          >
            <Text style={styles.ctaText}>Donate</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  hero: {
    height: 260,
    justifyContent: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  heroCenter: {
    zIndex: 2,
    paddingHorizontal: 24,
    alignItems: 'center',
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

  body: {
    padding: 16,
    paddingBottom: 40,
    backgroundColor: '#FFFFFF',
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
  p: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
    lineHeight: 24,
    color: '#374151',
  },

  cta: {
    alignSelf: 'flex-end',
    marginTop: 16,
    backgroundColor: BRAND_RED,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 999,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  ctaText: {
    color: '#FFF',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 15,
  },
});
