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
  Linking,
} from 'react-native';
import { Stack } from 'expo-router';
import { BlurView } from 'expo-blur';
import { getCanonicalContactEmail, toAbsoluteSiteUrl } from '~/lib/contentApi';
import { openMailApp } from '~/lib/externalLinks';
import AppIcon from '~/components/AppIcon';
import { useBootstrap } from '~/hooks/useBootstrap';
import { config } from '~/lib/appConfig';

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
const VERIFICATION_REASONS = new Set([
  'missing_turnstile',
  'missing_token',
  'missing_input_response',
  'invalid_input_response',
  'timeout_or_duplicate',
  'turnstile_failed',
]);

const SITE_COPY = {
  successTitle: 'Thank you. Your prayer request has been received.',
  successDescription: 'Our prayer team will pray with care and discretion.',
  duplicateTitle: 'A prayer request from this email is already active.',
  duplicateDescription:
    'Please wait 7 days before submitting another request, or contact us directly if it is urgent.',
  missingTurnstileTitle: 'Please complete the verification challenge.',
  missingTurnstileDescription: 'Then send your prayer request again.',
  defaultErrorTitle: "We couldn't submit your prayer request.",
  defaultErrorDescription: 'Please review your details and try again.',
};

type PrayerApiResponse = {
  detail?: string;
  email_error?: boolean;
  error?: string;
  fieldErrors?: Partial<Record<'name' | 'email' | 'request' | 'consent', string>>;
  reason?: string;
  success?: boolean;
};

function errorForReason(reason?: string | null) {
  if (!reason) {
    return {
      title: SITE_COPY.defaultErrorTitle,
      description: SITE_COPY.defaultErrorDescription,
    };
  }

  const known: Record<string, { title: string; description: string }> = {
    incomplete: {
      title: 'Please complete all required fields.',
      description: 'Review the form and try again.',
    },
    invalid_email: {
      title: 'Your email address looks invalid.',
      description: 'Update it and submit again.',
    },
    missing_turnstile: {
      title: SITE_COPY.missingTurnstileTitle,
      description: SITE_COPY.missingTurnstileDescription,
    },
    missing_token: {
      title: SITE_COPY.missingTurnstileTitle,
      description: SITE_COPY.missingTurnstileDescription,
    },
    missing_input_response: {
      title: SITE_COPY.missingTurnstileTitle,
      description: SITE_COPY.missingTurnstileDescription,
    },
    invalid_input_response: {
      title: 'Your verification challenge expired.',
      description: 'Complete it again and resubmit.',
    },
    timeout_or_duplicate: {
      title: 'Your verification challenge expired.',
      description: 'Complete it again and resubmit.',
    },
    turnstile_failed: {
      title: "We couldn't verify your submission.",
      description: 'Please complete the challenge again.',
    },
    email_not_configured: {
      title: 'Email delivery is not configured.',
      description: 'Please try again later.',
    },
  };

  return (
    known[reason] || {
      title: SITE_COPY.defaultErrorTitle,
      description: `Error: ${reason}`,
    }
  );
}

function formatFieldErrors(
  fieldErrors?: Partial<Record<'name' | 'email' | 'request' | 'consent', string>>
) {
  if (!fieldErrors) return null;

  const messages = ['name', 'email', 'request', 'consent']
    .map((key) => fieldErrors[key as keyof typeof fieldErrors]?.trim())
    .filter(Boolean);

  if (!messages.length) return null;
  return messages.join('\n');
}

export default function Prayer() {
  const { data } = useBootstrap();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [request, setRequest] = useState('');
  const [consent, setConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const supportEmail = getCanonicalContactEmail(data?.contact.email);

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
    consent &&
    !submitting;

  const webhook = config.prayerEmailWebhook;
  const hasConfiguredWebhook =
    !!webhook &&
    !/your-domain\.example/i.test(webhook) &&
    !/example\.com/i.test(webhook);
  const submitUrl = hasConfiguredWebhook ? webhook! : toAbsoluteSiteUrl('/api/prayer');

  const resetForm = () => {
    setName('');
    setEmail('');
    setRequest('');
    setConsent(false);
  };

  const openEmailFallback = () => {
    const subject = `Prayer Request from ${name.trim()}`;
    const body =
      [
        `Name: ${name.trim()}`,
        `Email: ${email.trim()}`,
        '',
        'Prayer request:',
        request.trim(),
      ].join('\n');

    void openMailApp(supportEmail, { subject, body });
  };

  const openPrayerPage = () => {
    void Linking.openURL(toAbsoluteSiteUrl('/prayer'));
  };

  const onSubmit = async () => {
    if (!canSubmit || submitting) return;

    const payload = {
      name: name.trim(),
      email: email.trim(),
      request: request.trim(),
      consent,
      source: 'tlp-app/prayer',
    };

    try {
      setSubmitting(true);
      const res = await fetch(submitUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = (await res.json().catch(() => null)) as PrayerApiResponse | null;
      const reason = data?.reason || data?.error || null;

      if (res.status === 429 && reason === 'limit_reached') {
        Alert.alert(
          SITE_COPY.duplicateTitle,
          SITE_COPY.duplicateDescription
        );
        return;
      }

      if (!res.ok || data?.success === false) {
        if (reason === 'validation_error') {
          Alert.alert(
            'Please review your details.',
            formatFieldErrors(data?.fieldErrors) || SITE_COPY.defaultErrorDescription
          );
          return;
        }

        if (reason && VERIFICATION_REASONS.has(reason)) {
          Alert.alert(
            'Verification required',
            'This prayer request now needs website verification before it can be sent. Open the prayer page in your browser, or email us instead.',
            [
              { text: 'Cancel', style: 'cancel' },
              { text: 'Open website', onPress: openPrayerPage },
              { text: 'Email instead', onPress: openEmailFallback },
            ]
          );
          return;
        }

        const resolved = errorForReason(reason);
        Alert.alert(resolved.title, data?.detail || resolved.description);
        return;
      }

      if (data?.email_error) {
        Alert.alert(
          SITE_COPY.successTitle,
          `${SITE_COPY.successDescription}\n\nWe could not confirm delivery by email right now.`
        );
        resetForm();
        return;
      }

      Alert.alert(SITE_COPY.successTitle, SITE_COPY.successDescription);
      resetForm();
    } catch (e: any) {
      Alert.alert(
        'Request not sent',
        'We could not send your prayer request right now. You can email it to us instead.',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Email instead',
            onPress: openEmailFallback,
          },
        ]
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: true, title: 'PRAYER' }} />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* Full-screen background image */}
        <ImageBackground
          source={require('../../assets/prayer-bg-web.jpg')}
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
                  <View style={styles.kickerWrap}>
                    <Text style={styles.kicker}>Prayer Request</Text>
                  </View>
                  <Text style={styles.sub}>
                    Share your request and our prayer team will stand with you in prayer.
                  </Text>
                  <Text style={styles.requiredNote}>* Required fields</Text>
                </View>

                <View style={styles.formSection}>
                  {/* Name */}
                  <Text style={styles.label}>Your name *</Text>
                  <View style={styles.inputWrap}>
                    <TextInput
                      value={name}
                      onChangeText={setName}
                      placeholder="e.g., Thandi"
                      placeholderTextColor="rgba(17,24,39,0.55)"
                      style={styles.input}
                      returnKeyType="next"
                      autoCapitalize="words"
                    />
                  </View>
                </View>

                {/* Email (required for confirmation) */}
                <View style={styles.formSection}>
                  <View style={styles.labelRow}>
                    <Text style={styles.label}>Email *</Text>
                    {!emailValid && email.length > 0 ? (
                      <Text style={styles.helperWarn}>Enter a valid email</Text>
                    ) : null}
                  </View>
                  <View style={styles.inputWrap}>
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
                  </View>
                  <Text style={styles.helperOk}>
                    We’ll send a confirmation to this address.
                  </Text>
                </View>

                {/* Prayer request */}
                <View style={styles.formSection}>
                  <View style={styles.labelRow}>
                    <Text style={styles.label}>Prayer request ({WORD_LIMIT} words max) *</Text>
                  </View>

                  <View style={[styles.textareaWrap, overLimit && styles.textareaWrapWarn]}>
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
                  </View>

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
                <TouchableOpacity
                  onPress={() => setConsent(!consent)}
                  activeOpacity={0.86}
                  style={styles.consentCard}
                  accessibilityRole="checkbox"
                  accessibilityState={{ checked: consent }}
                >
                  <View
                    style={[
                      styles.checkbox,
                      { backgroundColor: consent ? COLORS.brand : '#FFF' },
                    ]}
                  >
                    {consent ? <AppIcon name="check" size={16} color="#FFF" /> : null}
                  </View>
                  <Text style={styles.consentText}>
                    I consent to The Life Place using this information solely to respond to my request.
                  </Text>
                </TouchableOpacity>

                {/* Compact CTA */}
                <View style={styles.ctaWrap}>
                  <TouchableOpacity
                    onPress={onSubmit}
                    disabled={!canSubmit}
                    style={[styles.cta, !canSubmit && styles.ctaDisabled]}
                    accessibilityRole="button"
                  >
                    <AppIcon name="paper-plane" size={18} color="#fff" />
                    <Text style={styles.ctaText}>{submitting ? 'Sending...' : 'Send'}</Text>
                  </TouchableOpacity>
                </View>

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
    padding: 20,
    backgroundColor: 'rgba(255,255,255,0.44)',
    gap: 16,
  },

  intro: { gap: 12 },
  kickerWrap: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.4)',
    backgroundColor: 'rgba(255,255,255,0.48)',
  },
  kicker: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 11,
    color: COLORS.brand,
    letterSpacing: 1.8,
    textTransform: 'uppercase',
  },
  sub: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 16,
    color: 'rgba(15,23,42,0.92)',
    lineHeight: 25,
  },
  requiredNote: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 12,
    lineHeight: 16,
    color: 'rgba(15,23,42,0.68)',
  },
  formSection: {
    padding: 16,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.36)',
    backgroundColor: 'rgba(255,255,255,0.18)',
    gap: 8,
  },

  labelRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    width: '100%',
  },
  label: {
    fontFamily: 'Montserrat-SemiBold',
    color: '#0F172A',
    fontSize: 15,
    marginBottom: 2,
  },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    backgroundColor: 'rgba(255,255,255,0.72)',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 4,
  },
  input: {
    flex: 1,
    paddingVertical: Platform.OS === 'ios' ? 12 : 10,
    fontFamily: 'Montserrat-Medium',
    color: '#0F172A',
    fontSize: 16,
  },

  textareaWrap: {
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    backgroundColor: 'rgba(255,255,255,0.72)',
    borderRadius: 16,
    padding: 12,
    gap: 8,
  },
  textareaWrapWarn: {
    borderColor: COLORS.warn,
  },
  textarea: {
    minHeight: 120,
    fontFamily: 'Montserrat-Medium',
    color: '#0F172A',
    fontSize: 16,
    lineHeight: 24,
  },
  textareaWarn: { borderColor: COLORS.warn },

  helperWarn: {
    marginTop: 6,
    color: COLORS.warn,
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 12,
  },
  helperOk: {
    marginTop: 6,
    color: 'rgba(15,23,42,0.72)',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 12,
  },
  consentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -2,
    gap: 10,
    padding: 14,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.36)',
    backgroundColor: 'rgba(255,255,255,0.18)',
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
    color: 'rgba(15,23,42,0.84)',
    fontFamily: 'Montserrat-Medium',
    fontSize: 13,
    lineHeight: 20,
  },
  ctaWrap: {
    alignItems: 'center',
    paddingTop: 2,
  },
  cta: {
    alignSelf: 'center',
    minWidth: 164,
    paddingHorizontal: 18,
    paddingVertical: 12,
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
    marginTop: -2,
    textAlign: 'center',
    fontFamily: 'Montserrat-Medium',
    fontSize: 12,
    color: 'rgba(15,23,42,0.72)',
    lineHeight: 18,
  },
});
