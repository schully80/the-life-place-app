import React from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView } from 'react-native';
import { Stack } from 'expo-router';
import BackButton from '../../components/BackButton';

export default function BringThemToJesus() {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Bring Them to Jesus',
          headerLeft: () => <BackButton glass fallbackTo="/ministries" />,
        }}
      />
      <ImageBackground
        source={require('../../assets/min-bring-them-to-jesus.jpg')}
        style={styles.hero}
        imageStyle={{ opacity: 0.9 }}
        resizeMode="cover"
      >
        <View style={styles.overlay} />
        <View style={styles.heroCenter}>
          <Text style={styles.h1}>Bring Them to Jesus</Text>
          <Text style={styles.sub}>Let the children come to me… (Mt 19:14; Mk 10:14)</Text>
        </View>
      </ImageBackground>

      <ScrollView contentContainerStyle={styles.body}>
        <Card title="Objective">
          The program is designed for parents who desire to have their children dedicated, young or grown.
          We invite parents into a Jesus-centred dedication journey—filled with encouragement, practical
          resources for parenting, and the joy of building friendships with other parents along the way.
        </Card>

        <Card title="Duration">
          <Text style={styles.p}><Text style={styles.strong}>Two weeks</Text>, two sessions, ninety minutes each — preparing you for a lifetime commitment.</Text>
        </Card>

        <Card title="Program Features">
          <Text style={styles.li}>• <Text style={styles.strong}>Style:</Text> Warm, engaging, short gospel presentation, Q&amp;A, prayer.</Text>
          <Text style={styles.li}>• <Text style={styles.strong}>Duration:</Text> 2 sessions, 90 minutes each.</Text>
          <Text style={styles.li}>• <Text style={styles.strong}>Materials:</Text> Bring Them to Jesus Handbook and your Bible.</Text>
        </Card>

        <Card title="Costs" center>
          <Text style={styles.p}>
            A one-time registration cost per household for the 2-week class
            (covers catering &amp; admin, non-refundable).
          </Text>
        </Card>
      </ScrollView>
    </>
  );
}

function Card({ title, children, center = false }: { title: string; children: React.ReactNode; center?: boolean }) {
  return (
    <View style={styles.card}>
      <Text style={[styles.h2, center && { textAlign: 'center' }]}>{title}</Text>
      <View style={{ marginTop: 6 }}>{children}</View>
    </View>
  );
}

const BRAND_RED = '#B3282D';

const styles = StyleSheet.create({
  hero: { height: 260, justifyContent: 'center' },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.25)' },
  heroCenter: { zIndex: 2, paddingHorizontal: 24, alignItems: 'center' },
  h1: { color: '#FFF', fontFamily: 'Montserrat-Bold', fontSize: 28, textAlign: 'center' },
  sub: { color: '#FFF', fontFamily: 'Montserrat-Medium', fontSize: 14, marginTop: 6, textAlign: 'center', opacity: 0.95 },

  body: { padding: 16, paddingBottom: 40, backgroundColor: '#FFF', rowGap: 12 },
  card: {
    backgroundColor: '#FFFFFF', borderRadius: 14, padding: 16,
    borderWidth: 1, borderColor: '#E5E7EB', shadowColor: '#000',
    shadowOpacity: 0.06, shadowRadius: 8, shadowOffset: { width: 0, height: 3 }, elevation: 3,
  },
  h2: { fontFamily: 'Montserrat-SemiBold', fontSize: 18, color: '#111827' },
  p: { fontFamily: 'Montserrat-Regular', fontSize: 15, color: '#374151', lineHeight: 22 },
  strong: { fontFamily: 'Montserrat-SemiBold', color: '#111827' },
  li: { fontFamily: 'Montserrat-Regular', fontSize: 15, color: '#374151', lineHeight: 22, marginTop: 4 },
});
