// app/about.tsx
import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Dimensions } from 'react-native';

const { height: H } = Dimensions.get('window');

export default function About() {
  return (
    <View style={styles.screen}>
      <ImageBackground
        source={require('../assets/sandton-skyline.jpg')}
        style={styles.hero}
        resizeMode="cover"
        imageStyle={{ opacity: 0.95 }}
      >
        {/* Soft dark overlay */}
        <View style={styles.overlay} />

        {/* Centered content */}
        <View style={styles.centerWrap}>
          <Text style={styles.h1}>Our Mission</Text>

          {/* Vision line split into inline chunks with the red badge for "Jesus" */}
          <View style={styles.inlineRow}>
            <Text style={styles.vision}>
              Every time we meet, we see how true, good, beautiful and kind
            </Text>

            {/* Retro badge */}
            <View style={styles.badgeWrap}>
              <View style={styles.badge}>
                {/* Nail dots */}
                <View style={[styles.nail, styles.nailLeft]} />
                <View style={[styles.nail, styles.nailRight]} />

                <Text style={styles.badgeText}>Jesus</Text>
              </View>
            </View>

            <Text style={styles.vision}>is</Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#000' },
  hero: {
    height: H,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.30)',
  },
  centerWrap: {
    zIndex: 2,
    paddingHorizontal: 24,
    width: '100%',
    alignItems: 'center',
    gap: 16,
  },
  h1: {
    color: '#FFF',
    fontFamily: 'Montserrat-Bold',
    fontSize: 36,
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.35)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
    marginBottom: 8,
  },

  // Row that allows "inline" layout and wraps on small screens
  inlineRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    columnGap: 10,
    rowGap: 10,
    maxWidth: 900,
  },
  vision: {
    color: '#FFF',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 24,
    lineHeight: 34,
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.35)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },

  // Wrap the badge so it behaves like a word in the line
  badgeWrap: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Red sign (rounded, white border, slight rotate, drop shadow)
  badge: {
    backgroundColor: '#B3282D',
    borderColor: '#FFFFFF',
    borderWidth: 4,            // border-4
    borderRadius: 9,           // rounded-[9px]
    paddingHorizontal: 12,     // px-3
    paddingVertical: 2,        // py-0 (a little vertical space for RN)
    transform: [{ rotate: '-2deg' }],
    position: 'relative',
    shadowColor: '#000',
    shadowOpacity: 0.35,       // drop-shadow-xl vibe
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  badgeText: {
    color: '#FFFFFF',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 24,
    letterSpacing: 0.3,
    textShadowColor: 'rgba(0,0,0,0.25)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },

  // Nail dots (approximate the radial gradient with a light disc + border + shadow)
  nail: {
    position: 'absolute',
    top: 6,                    // ~ top-1 relative to badge paddings
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E5E7EB',      // light face
    borderWidth: 1,
    borderColor: '#374151',           // border-gray-700
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },
  nailLeft:  { left: 8 },
  nailRight: { right: 8 },
});

