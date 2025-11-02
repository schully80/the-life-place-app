// app/our-welcome.tsx
import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Dimensions } from 'react-native';

const BRAND_RED = '#B3282D';
const WARM_GRAY = '#6B7280';
const { width: W } = Dimensions.get('window');

export default function OurWelcome() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Title */}
      <Text style={styles.title}>Our Welcome</Text>

      {/* Welcome paragraph with red emphasis words */}
      <Text style={styles.lead}>
        We open wide our doors with a welcome from
        <Text style={styles.emph}> Jesus</Text>,{'\n'}
        the <Text style={styles.emph}>Embracer</Text> of the outsider,{'\n'}
        the <Text style={styles.emph}>Defender</Text> of the guilty,{'\n'}
        the <Text style={styles.emph}>Justifier</Text> of the ungodly,{'\n'}
        the <Text style={styles.emph}>Friend</Text> of sinners.
      </Text>

      {/* Slogan */}
      <Text style={styles.slogan}>
        Come. See. <Text style={styles.sloganEmph}>Jesus</Text>
      </Text>

      {/* Image (16:12 like your Astro block) */}
      <View style={styles.imageWrap} accessibilityLabel="Welcome to The Life Place">
        <Image
          source={require('../assets/community-welcome.jpg')}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
    </ScrollView>
  );
}

const MAX_W = 820; // keeps text measure comfortable on tablets

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 40,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },

  title: {
    textAlign: 'center',
    fontFamily: 'Montserrat-SemiBold', // or -Bold if you prefer
    fontSize: 34, // ~ text-4xl mobile, scales well
    color: '#111827',
    lineHeight: 40,
    marginBottom: 16,
  },

  lead: {
    textAlign: 'center',
    fontFamily: 'Montserrat-Regular',
    fontSize: 18,      // ~ text-xl
    lineHeight: 28,    // comfortable reading
    color: WARM_GRAY,
    maxWidth: MAX_W,
  },
  emph: {
    color: BRAND_RED,
    fontFamily: 'Montserrat-SemiBold',
  },

  slogan: {
    marginTop: 18,
    textAlign: 'center',
    fontFamily: 'Montserrat-Medium',
    fontSize: 20,     // ~ sm:text-2xl
    color: WARM_GRAY,
  },
  sloganEmph: {
    color: BRAND_RED,
    fontFamily: 'Montserrat-Bold',
  },

  imageWrap: {
    width: '100%',
    maxWidth: MAX_W,
    aspectRatio: 16 / 12,
    borderRadius: 16,
    overflow: 'hidden',
    marginTop: 24,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
  image: {
    width: '100%',
    height: '100%',
    opacity: 0.95,
  },
});
