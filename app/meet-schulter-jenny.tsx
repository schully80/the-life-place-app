// app/meet-schulter-jenny.tsx
import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { Stack } from 'expo-router';

export default function MeetSchulterJenny() {
  return (
    <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <Stack.Screen options={{ title: 'Schulter & Jenny' }} />

      {/* Header photo with rounded corners and NO text */}
      <View style={styles.heroWrap}>
        <Image
          source={require('../assets/schulter-jenny.jpg')}
          style={styles.heroImage}
          resizeMode="cover"
        />
      </View>

      {/* Content */}
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.paragraph}>
          Schulter and Genevieve (Jenny) Etyang are the founders of
          <Text style={styles.bold}> The Life Place</Text>, Craigavon AH, Sandton, South Africa.
        </Text>

        <Text style={styles.paragraph}>
          Fifteen years ago, they encountered the good news of who Jesus is and what He has done, which
          became the central mission of their lives: inviting others to
          <Text style={styles.red}> Come. See. Jesus</Text>
        </Text>

        <Text style={styles.paragraph}>
          The Etyangs enjoy conversations about Jesus, being at home, travelling, exercise, watching sports,
          Netflix and chill, and the simple things in life.
        </Text>
      </ScrollView>
    </View>
  );
}

const HERO_H = 260;

const styles = StyleSheet.create({
  heroWrap: {
    height: HERO_H,
    margin: 16,
    borderRadius: 16,          // ← rounded corners
    overflow: 'hidden',        // ensure the image clips to the radius
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },

  container: {
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 40,
  },
  paragraph: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 14,
    color: '#333',
    lineHeight: 24,
    marginBottom: 14,
  },
  bold: { fontFamily: 'Montserrat-SemiBold' },
  red: { color: '#B3282D', fontWeight: '600' },
});
