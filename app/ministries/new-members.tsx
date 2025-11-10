import React from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView } from 'react-native';
import { Stack } from 'expo-router';
import BackButton from '../../components/BackButton';

const BRAND_RED = '#B3282D';

export default function NewMembers() {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'New @The Life Place',
          headerLeft: () => <BackButton glass fallbackTo="/ministries" />,
        }}
      />

      {/* Hero */}
      <ImageBackground
        // Ensure this exists: app/assets/min-new-members.jpg
        source={require('../../assets/min-new-members.jpg')}
        style={styles.hero}
        imageStyle={{ opacity: 0.9 }}
        resizeMode="cover"
      >
        <View style={styles.overlay} />
        <View style={styles.heroCenter}>
          <Text style={styles.h1}>Vision Night</Text>
          <Text style={styles.hSub}>
            <Text style={styles.em}>Come. See. </Text>
            <Text style={styles.emRed}>Jesus</Text>
          </Text>
        </View>
      </ImageBackground>

      {/* Body */}
      <ScrollView contentContainerStyle={styles.body}>
        {/* What is Vision Night? */}
        <View style={styles.card}>
          <Text style={styles.h2}>What is Vision Night?</Text>
          <Text style={styles.p}>
            Vision Night is a special gathering where we share{' '}
            <Text style={styles.strong}>who we are, why we exist, and where Jesus is leading us</Text>.
            It’s a night of story, worship, and community — a moment to see the heart of The Life
            Place and how you can be part of this grace-filled journey.
          </Text>
        </View>

        {/* Why Attend */}
        <View style={styles.card}>
          <Text style={styles.h2}>Why Attend?</Text>
          <View style={styles.list}>
            <Text style={styles.li}>• Hear our story and vision for The Life Place</Text>
            <Text style={styles.li}>• Meet our leadership team and community</Text>
            <Text style={styles.li}>• Discover our mission, values, and future plans</Text>
            <Text style={styles.li}>• Find ways to connect, belong, and serve</Text>
          </View>
        </View>

        {/* Vision Night Is For */}
        <View style={styles.card}>
          <Text style={styles.h2}>Vision Night Is For</Text>
          <View style={styles.list}>
            <Text style={styles.li}>• Anyone exploring the heartbeat of The Life Place</Text>
            <Text style={styles.li}>• Those ready to take a next step in belonging</Text>
            <Text style={styles.li}>• Those searching for a Jesus-centred community</Text>
            <Text style={styles.li}>• All who want to be part of Jesus’ unfolding future</Text>
          </View>
        </View>

        {/* Registration placeholder (disabled, like web) */}
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
    height: 320,
    justifyContent: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.10)',
  },
  heroCenter: {
    zIndex: 2,
    paddingHorizontal: 24,
    alignItems: 'center',
    gap: 6,
  },
  h1: {
    color: '#FFF',
    fontFamily: 'Montserrat-Bold',
    fontSize: 34,
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.35)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  hSub: {
    marginTop: 4,
    color: '#FFF',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 18,
  },
  em: { fontFamily: 'Montserrat-Medium' },
  emRed: { color: BRAND_RED, fontFamily: 'Montserrat-Bold' },

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
    marginBottom: 8,
  },
  p: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
    lineHeight: 24,
    color: '#374151',
  },
  strong: { fontFamily: 'Montserrat-SemiBold', color: '#374151' },
  list: { rowGap: 6 },
  li: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
    color: '#374151',
    lineHeight: 24,
  },
  muted: {
    marginTop: 4,
    fontFamily: 'Montserrat-Medium',
    fontSize: 13,
    color: '#6B7280',
    textAlign: 'center',
  },
});
