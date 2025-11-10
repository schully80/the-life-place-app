// app/our-welcome.tsx
import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Dimensions } from 'react-native';

const BRAND_RED = '#B3282D';
const WARM_GRAY = '#6B7280';
const { width: W } = Dimensions.get('window');

export default function OurWelcome() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* ⬆️ Photo first (top) */}
      <View style={styles.imageWrap} accessibilityLabel="Welcome to The Life Place">
        <Image
          source={require('../assets/community-welcome.jpg')}
          style={styles.image}
          resizeMode="cover"
        />
      </View>

      {/* ⬇️ Extra breathing room pulled away from the image */}
      <Text style={styles.lead}>
        We open wide our doors with a welcome from
        <Text style={styles.emph}> Jesus</Text>,{'\n'}
        the <Text style={styles.emph}>Embracer</Text> of the outsider,{'\n'}
        the <Text style={styles.emph}>Defender</Text> of the guilty,{'\n'}
        the <Text style={styles.emph}>Justifier</Text> of the ungodly,{'\n'}
        the <Text style={styles.emph}>Friend</Text> of sinners.
      </Text>

      <Text style={styles.slogan}>
        Come. See. <Text style={styles.sloganEmph}>Jesus</Text>
      </Text>
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

  // Head image block (keep this same across screens that use this pattern)
  imageWrap: {
    width: '100%',
    maxWidth: MAX_W,
    aspectRatio: 16 / 12, // 🔁 use same ratio wherever you show header/top photos
    borderRadius: 16,
    overflow: 'hidden',
    marginTop: 8,
    marginBottom: 20, // ⬅️ creates separation from the copy below
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

  lead: {
    textAlign: 'center',
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
    lineHeight: 28,
    color: WARM_GRAY,
    maxWidth: MAX_W,
    marginTop: 2,     // small nudge in case other screens add tighter spacing
    marginBottom: 12, // keep copy tidy before slogan
  },
  emph: {
    color: BRAND_RED,
    fontFamily: 'Montserrat-SemiBold',
  },

  slogan: {
    marginTop: 6,
    textAlign: 'center',
    fontFamily: 'Montserrat-Medium',
    fontSize: 18,
    color: WARM_GRAY,
  },
  sloganEmph: {
    color: BRAND_RED,
    fontFamily: 'Montserrat-Bold',
  },
});
