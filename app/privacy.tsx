import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, Alert } from 'react-native';
import { Stack } from 'expo-router';
import { useBootstrap } from '~/hooks/useBootstrap';
import { toAbsoluteSiteUrl } from '~/lib/contentApi';
import AppIcon, { AppIconName } from '~/components/AppIcon';

const BRAND = '#B3282D';
const INK = '#111827';
const MUTED = '#6B7280';

export default function Privacy() {
  const { data } = useBootstrap();
  const privacyUrl = toAbsoluteSiteUrl(data?.links.privacyPath || '/privacy-policy/');
  const privacyEmail = data?.contact.email || 'hello@thelifeplace.org';

  const openUrl = async (url: string) => {
    const ok = await Linking.canOpenURL(url);
    if (!ok) return Alert.alert('Unable to open link');
    return Linking.openURL(url);
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Privacy Policy' }} />
      <View style={styles.screen}>
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.h1}>Privacy</Text>
          <Text style={styles.meta}>
            The canonical privacy policy lives on the main The Life Place website.
          </Text>

          <Section title="How this app handles privacy">
            <P>
              This app uses the same shared content and policies as the website. Prayer requests and
              related contact details are sent to the same canonical service.
            </P>
            <P>
              For the most up-to-date policy language, always refer to the website policy below.
            </P>
          </Section>

          <Section title="Contact us">
            <P>Email: {privacyEmail}</P>
            <Row>
              <Button icon="mail" label="Email privacy" onPress={() => openUrl(`mailto:${privacyEmail}`)} />
              <Button icon="globe" label="Website policy" onPress={() => openUrl(privacyUrl)} />
            </Row>
          </Section>
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

function Button({ icon, label, onPress }: { icon: AppIconName; label: string; onPress: () => void }) {
  return (
    <TouchableOpacity style={styles.btn} onPress={onPress}>
      <AppIcon name={icon} size={16} color="#fff" />
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
});
