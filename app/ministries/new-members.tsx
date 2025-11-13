// app/ministries/new-members.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Linking,
} from 'react-native';
import { Stack } from 'expo-router';
import QRCode from 'react-native-qrcode-svg';

const BRAND_RED = '#B3282D';
const WARM = '#4B5563';

// 🔗 Deep-link straight to the registration block on your website page
const REG_URL = 'https://thelifeplace.org/ministries/new-members#register';

export default function NewMembers() {
  return (
    <>
      <Stack.Screen options={{ title: 'New @The Life Place' }} />

      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.container}>
          {/* Hero */}
          <ImageBackground
            source={require('../../assets/min-new-members.jpg')}
            style={styles.hero}
            imageStyle={{ opacity: 0.92 }}
            resizeMode="cover"
          >
            <View style={styles.heroOverlay} />
            <View style={styles.heroCenter}>
              <Text style={styles.h1}>Vision Night</Text>
              <Text style={styles.heroSub}>
                Come. See. <Text style={{ fontFamily: 'Montserrat-SemiBold' }}>Jesus</Text>
              </Text>
            </View>
          </ImageBackground>

          {/* Copy */}
          <Card title="What is Vision Night?" center>
            <Text style={styles.p}>
              Vision Night is a special gathering where we share who we are, why we exist,
              and where Jesus is leading us — a moment to see the heart of The Life Place
              and how you can be part of this grace-filled journey.
            </Text>
          </Card>

          {/* Web Registration + QR (no visible raw URL) */}
          <WebsiteRegistration />
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}

function WebsiteRegistration() {
  const openSite = async () => {
    try {
      const supported = await Linking.canOpenURL(REG_URL);
      if (!supported) {
        Alert.alert('Unable to open link', 'This device cannot open the registration page.');
        return;
      }
      await Linking.openURL(REG_URL);
    } catch {
      Alert.alert('Something went wrong', 'Please try again.');
    }
  };

  return (
    <View style={styles.formCard}>
      <Text style={[styles.h2, { textAlign: 'center' }]}>Register on our website</Text>
      <Text style={[styles.p, { textAlign: 'center', marginTop: 6 }]}>
        Tap the button below, or scan the QR code with your camera to open the Vision Night form.
      </Text>

      <View style={{ alignItems: 'center', marginTop: 14 }}>
        <QRCode value={REG_URL} size={144} color="#111827" backgroundColor="#FFFFFF" />
        {/* Intentionally no visible URL text */}
      </View>

      <TouchableOpacity onPress={openSite} style={styles.cta}>
        <Text style={styles.ctaText}>Open Registration</Text>
      </TouchableOpacity>
    </View>
  );
}

/* ---------- Small helpers ---------- */
function Card({
  title,
  children,
  center = false,
}: {
  title: string;
  children: React.ReactNode;
  center?: boolean;
}) {
  const normalizedChildren = React.Children.map(children, (child) => {
    if (typeof child === 'string' || typeof child === 'number') {
      return <Text style={styles.p}>{child}</Text>;
    }
    return child;
  });

  return (
    <View style={styles.card}>
      <Text style={[styles.h2, center && { textAlign: 'center' }]}>{title}</Text>
      <View style={{ marginTop: 6 }}>{normalizedChildren}</View>
    </View>
  );
}

/* ---------- Styles ---------- */
const styles = StyleSheet.create({
  container: { backgroundColor: '#FFFFFF', paddingBottom: 32 },
  hero: { height: 280, justifyContent: 'center', alignItems: 'center' },
  heroOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.20)' },
  heroCenter: { paddingHorizontal: 20, alignItems: 'center' },
  h1: {
    color: '#FFF',
    fontFamily: 'Montserrat-Bold',
    fontSize: 28,
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.35)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  heroSub: {
    marginTop: 6,
    color: '#FFF',
    fontFamily: 'Montserrat-Medium',
    fontSize: 13,
    textAlign: 'center',
    opacity: 0.95,
  },

  card: {
    marginHorizontal: 20,
    marginTop: 14,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EEF2F7',
    padding: 14,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  h2: { fontFamily: 'Montserrat-SemiBold', fontSize: 18, color: '#111827' },
  p: { fontFamily: 'Montserrat-Regular', fontSize: 15, lineHeight: 22, color: WARM },

  /* Website registration card */
  formCard: {
    marginHorizontal: 20,
    marginTop: 18,
    marginBottom: 26,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: 14,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
  },

  cta: {
    marginTop: 14,
    alignSelf: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: BRAND_RED,
  },
  ctaText: { color: '#FFF', fontFamily: 'Montserrat-SemiBold', fontSize: 15 },
});
