// app/prayer.tsx
import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ImageBackground,
} from 'react-native';
import { Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import Constants from 'expo-constants';

const COLORS = {
  brand: '#B3282D',
  ink: '#111827',
  inkMuted: '#4B5563',
  border: 'rgba(255,255,255,0.22)',
  surface: 'rgba(255,255,255,0.48)',
  warn: '#DC2626',
  ok: 'rgba(17,24,39,0.7)',
};

const WORD_LIMIT = 75;

export default function Prayer() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState(''); // ✉️ new
  const [request, setRequest] = useState('');
  const [consent, setConsent] = useState(false); // ✅ POPIA consent

  const wordsUsed = useMemo(
    () => request.trim().split(/\s+/).filter(Boolean).length,
    [request]
  );

  const wordsRemaining = Math.max(WORD_LIMIT - wordsUsed, 0);
  const overBy = Math.max(wordsUsed - WORD_LIMIT, 0);
  const overLimit = wordsUsed > WORD_LIMIT;

  const emailValid = useMemo(() => {
    if (!email) return false;
    // lightweight email check
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  }, [email]);

  const canSubmit =
    name.trim().length > 1 &&
    emailValid &&
    wordsUsed > 0 &&
    !overLimit &&
    consent;

  const onSubmit = async () => {
    if (!canSubmit) return;

    const payload = {
      name: name.trim(),
      email: email.trim(),
      request: request.trim(),
      wordsUsed,
      createdAt: new Date().toISOString(),
      source: 'tlp-app/prayer',
    };

    const webhook =
      (Constants.expoConfig?.extra as any)?.PRAYER_EMAIL_WEBHOOK ||
      (Constants.manifest2?.extra as any)?.PRAYER_EMAIL_WEBHOOK;

    try {
      if (webhook) {
        const res = await fetch(webhook, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (!res.ok) {
          throw new Error(`Webhook failed (${res.status})`);
        }
      }
      Alert.alert(
        'Request sent',
        'Thank you—we’ll pray with you. A confirmation has been sent to your email.'
      );
      setName('');
      setEmail('');
      setRequest('');
      setConsent(false);
    } catch (e: any) {
      Alert.alert(
        'Request submitted',
        'We received your request, but the email confirmation could not be sent right now.'
      );
    }
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: true, title: 'Prayer' }} />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* Full-screen background image */}
        <ImageBackground
          source={require('../../assets/prayer-bg.png')}
          style={styles.bg}
          resizeMode="cover"
          imageStyle={{ opacity: 1.0 }}
        >
          {/* subtle dark overlay to help contrast */}
          <View style={styles.overlay} />

          <ScrollView
            contentContainerStyle={{ padding: 22, paddingBottom: 40 }}
            keyboardShouldPersistTaps="handled"
          >
            {/* Frosted card (blur + translucency) */}
            <View style={styles.glassCard}>
              <BlurView tint="light" intensity={6} style={StyleSheet.absoluteFillObject} />

              <View style={styles.cardInner}>
                {/* Intro */}
                <View style={styles.intro}>
                  <Text style={styles.sub}>
                    Share a prayer request (up to {WORD_LIMIT} words).
                  </Text>
                </View>

                {/* Name */}
                <Text style={styles.label}>Your name</Text>
                <TextInput
                  value={name}
                  onChangeText={setName}
                  placeholder="e.g., Thandi"
                  placeholderTextColor="rgba(17,24,39,0.55)"
                  style={styles.input}
                  returnKeyType="next"
                  autoCapitalize="words"
                />

                {/* Email (required for confirmation) */}
                <View style={{ marginTop: 12 }}>
                  <View style={styles.labelRow}>
                    <Text style={styles.label}>Email</Text>
                    {!emailValid && email.length > 0 ? (
                      <Text style={styles.helperWarn}>Enter a valid email</Text>
                    ) : null}
                  </View>
                  <TextInput
                    value={email}
                    onChangeText={setEmail}
                    placeholder="you@example.com"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholderTextColor="rgba(17,24,39,0.55)"
                    style={styles.input}
                    returnKeyType="next"
                  />
                  <Text style={styles.helperOk}>
                    We’ll send a confirmation to this address.
                  </Text>
                </View>

                {/* Prayer request */}
                <View style={{ marginTop: 16 }}>
                  <View style={styles.labelRow}>
                    <Text style={styles.label}>Prayer request</Text>
                    <Text
                      style={[
                        styles.counter,
                        {
                          marginLeft: 'auto',
                          textAlign: 'right',
                          color: overLimit ? COLORS.warn : COLORS.ok,
                        },
                      ]}
                    >
                      {!overLimit
                        ? `${wordsUsed} used • ${wordsRemaining} left`
                        : `${wordsUsed} used • ${overBy} over`}
                    </Text>
                  </View>

                  <TextInput
                    value={request}
                    onChangeText={setRequest}
                    placeholder="Write a short request we can pray over…"
                    placeholderTextColor="rgba(17,24,39,0.55)"
                    multiline
                    style={[styles.textarea, overLimit && styles.textareaWarn]}
                    textAlignVertical="top"
                    maxLength={800}
                  />

                  {overLimit ? (
                    <Text style={styles.helperWarn}>
                      You’re over the {WORD_LIMIT}-word limit by {overBy} word{overBy === 1 ? '' : 's'}.
                      Please trim it a little.
                    </Text>
                  ) : (
                    <Text style={styles.helperOk}>
                      {wordsRemaining} word{wordsRemaining === 1 ? '' : 's'} remaining.
                    </Text>
                  )}
                </View>

                {/* Consent */}
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12 }}>
                  <TouchableOpacity
                    onPress={() => setConsent(!consent)}
                    style={[
                      styles.checkbox,
                      { backgroundColor: consent ? COLORS.brand : '#FFF' },
                    ]}
                    accessibilityRole="checkbox"
                    accessibilityState={{ checked: consent }}
                  >
                    {consent ? <Ionicons name="checkmark" size={16} color="#FFF" /> : null}
                  </TouchableOpacity>
                  <Text style={styles.consentText}>
                    I consent to The Life Place using this information solely to respond to my request.
                  </Text>
                </View>

                {/* Compact CTA */}
                <TouchableOpacity
                  onPress={onSubmit}
                  disabled={!canSubmit}
                  style={[styles.cta, !canSubmit && styles.ctaDisabled]}
                  accessibilityRole="button"
                >
                  <Ionicons name="paper-plane-outline" size={18} color="#fff" />
                  <Text style={styles.ctaText}>Send</Text>
                </TouchableOpacity>

                <Text style={styles.footnote}>
                  We’ll keep your details private and only share with our prayer team.
                </Text>
              </View>
            </View>
          </ScrollView>
        </ImageBackground>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1, backgroundColor: '#000' },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.10)',
  },

  // Frosted glass card container
  glassCard: {
    borderRadius: 18,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  cardInner: {
    padding: 16,
    backgroundColor: COLORS.surface,
  },

  intro: { marginBottom: 10 },
  sub: {
    marginTop: 6,
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    color: 'rgba(17,24,39,0.8)',
    lineHeight: 20,
  },

  labelRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    width: '100%',
  },
  label: {
    fontFamily: 'Montserrat-Medium',
    color: '#111827',
    fontSize: 14,
    marginBottom: 8,
  },
  counter: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 12,
  },

  input: {
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.28)',
    backgroundColor: 'rgba(255,255,255,0.72)',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: Platform.OS === 'ios' ? 12 : 10,
    fontFamily: 'Montserrat-Regular',
    color: '#111827',
    fontSize: 16,
  },

  textarea: {
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.28)',
    backgroundColor: 'rgba(255,255,255,0.72)',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    minHeight: 120,
    fontFamily: 'Montserrat-Regular',
    color: '#111827',
    fontSize: 16,
    lineHeight: 22,
  },
  textareaWarn: { borderColor: COLORS.warn },

  helperWarn: {
    marginTop: 6,
    color: COLORS.warn,
    fontFamily: 'Montserrat-Medium',
    fontSize: 12,
    alignSelf: 'flex-end',
    textAlign: 'right',
  },
  helperOk: {
    marginTop: 6,
    color: COLORS.ok,
    fontFamily: 'Montserrat-Medium',
    fontSize: 12,
    alignSelf: 'flex-end',
    textAlign: 'right',
  },

  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  consentText: {
    flex: 1,
    color: '#374151',
    fontFamily: 'Montserrat-Regular',
    fontSize: 12,
  },

  cta: {
    marginTop: 16,
    alignSelf: 'center',
    minWidth: 140,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: COLORS.brand,
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaDisabled: { opacity: 0.5 },
  ctaText: {
    color: '#FFF',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 15,
  },

  footnote: {
    marginTop: 12,
    textAlign: 'center',
    fontFamily: 'Montserrat-Regular',
    fontSize: 12,
    color: COLORS.ok,
  },
});
