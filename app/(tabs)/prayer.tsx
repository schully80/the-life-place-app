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

const COLORS = {
  brand: '#B3282D',
  ink: '#111827',
  inkMuted: '#4B5563',
  border: 'rgba(255,255,255,0.22)',
  surface: 'rgba(255,255,255,0.48)',
  warn: '#DC2626',
};

const WORD_LIMIT = 75;

export default function Prayer() {
  const [name, setName] = useState('');
  const [request, setRequest] = useState('');

  const wordsUsed = useMemo(
    () => request.trim().split(/\s+/).filter(Boolean).length,
    [request]
  );

  const wordsRemaining = Math.max(WORD_LIMIT - wordsUsed, 0);
  const overBy = Math.max(wordsUsed - WORD_LIMIT, 0);
  const overLimit = wordsUsed > WORD_LIMIT;
  const canSubmit = name.trim().length > 1 && wordsUsed > 0 && !overLimit;

  const onSubmit = () => {
    if (!canSubmit) return;
    Alert.alert('Request sent', 'Thank you—we will pray with you.');
    setName('');
    setRequest('');
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
          imageStyle={{ opacity: 1.00}}
        >
          {/* subtle dark overlay to help contrast */}
          <View style={styles.overlay} />

          <ScrollView
            contentContainerStyle={{ padding: 22, paddingBottom: 40 }}
            keyboardShouldPersistTaps="handled"
          >
            {/* Frosted card (blur + translucency) */}
            <View style={styles.glassCard}>
              <BlurView tint="light" intensity={6} style={StyleSheet.absoluteFill} />

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

                {/* Prayer request */}
                <View style={{ marginTop: 14 }}>
                  <View style={styles.labelRow}>
                    <Text
                      style={[
                        styles.counter,
                        {
                          marginLeft: 'auto',
                          textAlign: 'right',
                          color: overLimit ? COLORS.warn : 'rgba(17,24,39,0.7)',
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
  h1: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 22,
    color: '#111827',
  },
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
    width: '100%', // ensure full width so counter can shift right
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
    borderColor:'rgba(255,255,255,0.28)',
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
    color: 'rgba(17,24,39,0.7)',
    fontFamily: 'Montserrat-Medium',
    fontSize: 12,
    alignSelf: 'flex-end',
    textAlign: 'right',
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
    color: 'rgba(17,24,39,0.7)',
  },
});
