// app/privacy.tsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, Alert } from 'react-native';
import { Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const BRAND = '#B3282D';
const INK = '#111827';
const MUTED = '#6B7280';

const WEBSITE_POLICY_URL = 'https://thelifeplace.org/privacy-policy/'; // TODO: replace
const PRIVACY_EMAIL = 'hello@thelifeplace.org';               // TODO: replace
const EFFECTIVE_DATE = '2 November 2025';

export default function Privacy() {
  const openUrl = async (url: string) => {
    const ok = await Linking.canOpenURL(url);
    if (!ok) return Alert.alert('Unable to open link');
    return Linking.openURL(url);
  };

  const mail = () => openUrl(`mailto:${PRIVACY_EMAIL}`);

  return (
    <>
      <Stack.Screen options={{ title: 'Privacy Policy' }} />
      <View style={styles.screen}>
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.h1}>The Life Place — In-App Privacy Policy</Text>
          <Text style={styles.meta}>Effective date: {EFFECTIVE_DATE}</Text>

          <Section title="Who we are">
            <P>The Life Place (NPC) provides this app to help our community connect, request prayer, view messages, events and giving options.</P>
          </Section>

          <Section title="What we collect in the app">
            <P>• Prayer requests: name (optional) and request text (may include special personal information).</P>
            <P>• Contact details you choose to share.</P>
            <P>• Technical data needed for app operation (no cross-app tracking).</P>
            <P>• Giving opens our website page, which may use cookies under its own policy.</P>
          </Section>

          <Section title="How we use your information">
            <P>• To share requests with our prayer team and respond if you ask us to.</P>
            <P>• To operate and secure the app, and show content like messages and events.</P>
          </Section>

          <Section title="Our legal basis (POPIA)">
            <P>• Explicit consent for prayer requests (special personal information).</P>
            <P>• Lawful processing/legitimate interests to operate and secure the app.</P>
          </Section>

          <Section title="Where we store it & transfers">
            <P>• Data may be hosted outside South Africa (e.g., Supabase). We apply appropriate safeguards under POPIA.</P>
          </Section>

          <Section title="Sharing">
            <P>• Authorised volunteers/staff (e.g., prayer team).</P>
            <P>• Service providers (“operators”) acting under our instructions.</P>
          </Section>

          <Section title="Retention">
            <P>• Prayer requests kept 6–12 months, then deleted/anonymised unless needed longer.</P>
          </Section>

          <Section title="Your rights (POPIA)">
            <P>Access, correction, deletion, objection/restriction, withdraw consent, and complain to the Information Regulator (South Africa).</P>
          </Section>

          <Section title="Children">
            <P>We don’t knowingly collect children’s information without a responsible adult’s involvement.</P>
          </Section>

          <Section title="Security">
            <P>We use reasonable technical and organisational measures (e.g., role-based access, encryption in transit).</P>
          </Section>

          <Section title="Cookies & tracking">
            <P>Native apps don’t use web cookies. Web pages opened in the app may use cookies—see our website policy.</P>
          </Section>

          <Section title="Contact us">
            <P>Email: {PRIVACY_EMAIL}</P>
            <Row>
              <Button icon="mail-outline" label="Email privacy" onPress={mail} />
              <Button icon="globe-outline" label="Website policy" onPress={() => openUrl(WEBSITE_POLICY_URL)} />
            </Row>
          </Section>

          <Text style={styles.disclaimer}>
            This summary is provided for convenience and does not replace legal advice.
          </Text>
        </ScrollView>
      </View>
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={{ marginTop: 18 }}>
      <Text style={styles.h2}>{title}</Text>
      <View style={{ marginTop: 6 }}>{children}</View>
    </View>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return <Text style={styles.p}>{children}</Text>;
}

function Row({ children }: { children: React.ReactNode }) {
  return <View style={{ flexDirection: 'row', gap: 10, marginTop: 8 }}>{children}</View>;
}

function Button({ icon, label, onPress }: { icon: keyof typeof Ionicons.glyphMap; label: string; onPress: () => void }) {
  return (
    <TouchableOpacity style={styles.btn} onPress={onPress}>
      <Ionicons name={icon} size={16} color="#fff" />
      <Text style={styles.btnText}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#FFFFFF' },
  content: { paddingHorizontal: 22, paddingVertical: 18, paddingBottom: 40 },
  h1: { fontFamily: 'Montserrat-SemiBold', fontSize: 22, color: INK },
  meta: { marginTop: 4, color: MUTED, fontFamily: 'Montserrat-Regular', fontSize: 12 },
  h2: { fontFamily: 'Montserrat-SemiBold', fontSize: 16, color: INK },
  p: { fontFamily: 'Montserrat-Regular', fontSize: 14, color: INK, lineHeight: 21 },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: BRAND,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
  },
  btnText: { color: '#fff', fontFamily: 'Montserrat-SemiBold', fontSize: 13 },
  disclaimer: {
    marginTop: 22,
    color: MUTED,
    fontFamily: 'Montserrat-Regular',
    fontSize: 12,
  },
});
