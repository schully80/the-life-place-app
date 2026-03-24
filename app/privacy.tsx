import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Stack } from 'expo-router';
import { useBootstrap } from '~/hooks/useBootstrap';
import { getCanonicalContactEmail } from '~/lib/contentApi';
import { openExternalUrl, openMailApp } from '~/lib/externalLinks';
import AppIcon, { AppIconName } from '~/components/AppIcon';
import PageSlogan from '~/components/PageSlogan';

const BRAND = '#B3282D';
const INK = '#111827';
const MUTED = '#6B7280';
const CANONICAL_PRIVACY_URL = 'https://thelifeplace.org/privacy-policy/';
const CANONICAL_TERMS_URL = 'https://thelifeplace.org/terms/';
const OFFLINE_SUMMARY = [
  {
    title: 'Information you send',
    body:
      'If you submit a prayer request, the app sends your name, email address, prayer request, consent choice, and a source label to The Life Place prayer endpoint.',
  },
  {
    title: 'Local device storage',
    body:
      'The app stores a single flag on your device to remember whether you dismissed the privacy banner.',
  },
  {
    title: 'External services you open',
    body:
      'When you open maps, email, WhatsApp, YouTube, blog, giving, or social links, you leave the app and those services apply their own privacy terms.',
  },
  {
    title: 'Tracking',
    body:
      'This codebase does not include in-app ad tracking or analytics flows, and the iOS privacy manifest declares tracking as disabled.',
  },
] as const;

export default function Privacy() {
  const { data } = useBootstrap();
  const privacyEmail = getCanonicalContactEmail(data?.contact.email);
  const emailForHelp = () =>
    void openMailApp(privacyEmail, {
      subject: 'Legal documents request',
      body:
        'Hello The Life Place,\n\nPlease send me the latest legal documents for the app.\n',
    });

  return (
    <>
      <Stack.Screen options={{ title: 'Legal' }} />
      <View style={styles.screen}>
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.h1}>Legal</Text>
          <Text style={styles.meta}>
            Review the core legal documents for The Life Place app and website.
          </Text>

          <Section title="How this app handles data">
            <P>
              This app uses the same shared content and policies as the website. Prayer requests and
              related contact details are sent to the same canonical service.
            </P>
            <P>
              For the most up-to-date legal language, always refer to the canonical website documents below.
            </P>
          </Section>

          <Section title="Legal documents">
            <P>
              Privacy Policy explains how personal information is handled. Terms covers the rules for using the service.
            </P>
            <Row>
              <Button
                icon="globe"
                label="Privacy Policy"
                onPress={() => void openExternalUrl(CANONICAL_PRIVACY_URL)}
              />
              <Button
                icon="file-lines"
                label="Terms"
                onPress={() => void openExternalUrl(CANONICAL_TERMS_URL)}
              />
            </Row>
          </Section>

          <Section title="Offline app privacy summary">
            <P>
              This summary is available inside the app when the website documents cannot be reached. It covers app-level behavior only and is not a replacement for the full website documents.
            </P>
            <View style={styles.summaryList}>
              {OFFLINE_SUMMARY.map((item) => (
                <View key={item.title} style={styles.summaryCard}>
                  <Text style={styles.summaryTitle}>{item.title}</Text>
                  <Text style={styles.summaryBody}>{item.body}</Text>
                </View>
              ))}
            </View>
          </Section>

          <Section title="If terms are unavailable">
            <P>
              The app does not bundle a local offline copy of the full Terms yet. If the website Terms page is unavailable, email us and we will send the current copy.
            </P>
            <Row>
              <Button icon="mail" label="Email for terms" onPress={emailForHelp} />
            </Row>
          </Section>

          <Section title="Contact us">
            <P>Email: <Text style={styles.inlineLink}>{privacyEmail}</Text></P>
          </Section>

          <PageSlogan />
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
  return <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 8 }}>{children}</View>;
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
  inlineLink: { fontFamily: 'Montserrat-SemiBold', fontSize: 14, color: BRAND },
  summaryList: { marginTop: 10, gap: 10 },
  summaryCard: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 18,
    backgroundColor: '#F9FAFB',
    paddingHorizontal: 14,
    paddingVertical: 12,
    gap: 4,
  },
  summaryTitle: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
    color: INK,
  },
  summaryBody: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 13,
    lineHeight: 19,
    color: MUTED,
  },
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
