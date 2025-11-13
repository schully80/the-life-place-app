// app/ministries/bring-them-to-jesus.tsx
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
} from 'react-native';
import { Stack, Link } from 'expo-router';
import QRCode from 'react-native-qrcode-svg';
import { Linking } from 'react-native';


const BRAND_RED = '#B3282D';
const WARM = '#4B5563';

// Where the website form lives:
const REG_URL = 'https://thelifeplace.org/ministries/bring-them-to-jesus#register';

export default function BringThemToJesus() {
  return (
    <>
      <Stack.Screen options={{ title: 'Bring Them to Jesus' }} />

      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.container}>
          {/* Hero */}
          <ImageBackground
            source={require('../../assets/min-bring-them-to-jesus.jpg')}
            style={styles.hero}
            imageStyle={{ opacity: 0.92 }}
            resizeMode="cover"
          >
            <View style={styles.heroOverlay} />
            <View style={styles.heroCenter}>
              <Text style={styles.h1}>Bring Them to Jesus</Text>
              <Text style={styles.heroSub}>
                Let the children come to me… {'\n'}Matthew 19:14 • Mark 10:14
              </Text>
            </View>
          </ImageBackground>

          {/* Cards */}
          <Card title="Objective" center>
            <Text style={styles.p}>
              The program is designed for parents who desire to have their children dedicated, young or grown.
            </Text>
            <Text style={[styles.p, { marginTop: 6 }]}>
              We invite parents into a Jesus-centred dedication journey—filled with encouragement, practical resources for
              parenting, and the joy of building friendships with other parents along the way.
            </Text>
          </Card>

          <Card title="Duration" center>
            <Text style={styles.p}>
              <Text style={styles.strong}>Two weeks</Text>, two sessions, ninety minutes each — preparing you for a lifetime
              commitment.
            </Text>
          </Card>

          <Card title="Program Features">
            <Bullet>Style: Warm, engaging, short gospel presentation, Q&amp;A session, and prayer.</Bullet>
            <Bullet>Duration: 2 sessions, 90 minutes each.</Bullet>
            <Bullet>
              Materials: <Text style={styles.italic}>Bring Them to Jesus Handbook</Text> and your Bible.
            </Bullet>
          </Card>

          <Card title="Costs" center>
            <Text style={styles.p}>
              A one-time registration cost per household for the 2-week class (covers catering &amp; admin, non-refundable).
            </Text>
          </Card>

          {/* Website Registration + QR */}
          <WebsiteRegistration />
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}

/* -------------------- Website Registration (opens site + QR) -------------------- */

function WebsiteRegistration() {
  const openSite = async () => {
    try {
      // Some iOS versions return false for https: even though it will open.
      // So we try canOpenURL, but fall back to openURL anyway.
      const ok = await Linking.canOpenURL(REG_URL).catch(() => true);
      if (!ok) {
        Alert.alert('Unable to open link', 'This device cannot open the registration page.');
        return;
      }
      await Linking.openURL(REG_URL);
    } catch (e) {
      Alert.alert('Something went wrong', 'Please try again.');
    }
  };

  // Lazy require so the screen still renders even if the lib isn’t installed yet
  let QR: any = null;
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    QR = require('react-native-qrcode-svg').default;
  } catch {
    QR = null;
  }

  return (
    <View style={styles.formCard}>
      <Text style={[styles.h2, { textAlign: 'center' }]}>Register on our website</Text>

      <Text style={[styles.p, { textAlign: 'center', marginTop: 6 }]}>
        Tap the button below, or scan the QR code with your camera to open the form.
      </Text>

      <View style={{ alignItems: 'center', marginTop: 14 }}>
        {QR ? (
          <View
            style={{
              padding: 14,
              backgroundColor: '#FFFFFF',
              borderRadius: 12,
              borderWidth: 1,
              borderColor: '#E5E7EB',
            }}
          >
            <QR value={REG_URL} size={160} color="#111827" backgroundColor="#FFFFFF" />
          </View>
        ) : (
          <Text style={[styles.p, { textAlign: 'center', color: '#991B1B' }]}>
            QR module not installed. Run: npx expo install react-native-qrcode-svg
          </Text>
        )}
      </View>

      <TouchableOpacity onPress={openSite} style={styles.cta}>
        <Text style={styles.ctaText}>Open Registration</Text>
      </TouchableOpacity>
    </View>
  );
}

/* -------------------- Small helpers -------------------- */

function Card({
  title,
  children,
  center = false,
}: {
  title: string;
  children: React.ReactNode;
  center?: boolean;
}) {
  // Ensure any raw strings/numbers inside a Card become <Text>
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

function Bullet({ children }: { children: React.ReactNode }) {
  // Always render bullet text *inside* a <Text> to avoid "Text strings must be rendered…" errors.
  return (
    <View style={styles.bulletRow}>
      <Text style={styles.bulletDot}>•</Text>
      <Text style={[styles.p, { flex: 1 }]}>
        {typeof children === 'string' || typeof children === 'number' ? children : children}
      </Text>
    </View>
  );
}

/* -------------------- Styles -------------------- */

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
  strong: { fontFamily: 'Montserrat-SemiBold', color: '#111827' },
  italic: { fontStyle: 'italic' },

  bulletRow: { flexDirection: 'row', gap: 8, alignItems: 'flex-start', marginTop: 6 },
  bulletDot: { color: BRAND_RED, fontSize: 18, lineHeight: 22, marginTop: -1 },

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

  secondaryBtn: {
    marginTop: 10,
    alignSelf: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: '#F3F4F6',
  },
  secondaryText: { fontFamily: 'Montserrat-Medium', color: '#111827' },
});
