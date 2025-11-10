// components/HeroHeader.tsx
import React, { ReactNode } from 'react';
import { View, ImageBackground, StyleSheet, ImageSourcePropType, Platform } from 'react-native';

export const HERO_HEIGHT = 260;      // ← one place to change global hero height
export const HERO_RADIUS = 16;

type Props = {
  source: ImageSourcePropType;
  height?: number;                   // override if needed
  radius?: number;                   // 0 for full-bleed square corners
  overlayOpacity?: number;           // 0..1
  bottomGap?: number;                // space below hero (pushes body down evenly)
  children?: ReactNode;              // optional overlay content
};

export default function HeroHeader({
  source,
  height = HERO_HEIGHT,
  radius = HERO_RADIUS,
  overlayOpacity = 0.25,
  bottomGap = 16,
  children,
}: Props) {
  return (
    <View style={[styles.wrap, { height, marginBottom: bottomGap, borderRadius: radius }]}>
      <ImageBackground
        source={source}
        style={styles.img}
        imageStyle={{ opacity: 0.95, borderRadius: radius }}
        resizeMode="cover"
      >
        {/* Overlay for legibility (set overlayOpacity=0 to remove) */}
        {overlayOpacity > 0 && (
          <View style={[StyleSheet.absoluteFill, { backgroundColor: `rgba(0,0,0,${overlayOpacity})` }]} />
        )}

        {/* Slot for any centred overlay content; omit children for “image only” */}
        {children ? <View style={styles.center}>{children}</View> : null}
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginHorizontal: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    ...Platform.select({ android: { elevation: 4 } }),
  },
  img: { flex: 1 },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
});
