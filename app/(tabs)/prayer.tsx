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
} from 'react-native';
import { Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const COLORS = {
  brand: '#B3282D',
  ink: '#111827',
  inkMuted: '#6B7280',
  border: '#E5E7EB',
  surface: '#FFFFFF',
  bg: '#FAFAFB',
  ok: '#16A34A',
  warn: '#DC2626',
};

const WORD_LIMIT = 75;

export default function Prayer() {
  const [name, setName] = useState('');
  const [request, setRequest] = useState('');

  const wordsUsed = useMemo(() => {
    return request
      .trim()
      .split(/\s+/)
      .filter(Boolean).length;
  }, [request]);

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
        style={{ flex: 1, backgroundColor: COLORS.bg }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={{ padding: 22, paddingBottom: 40 }}
          keyboardShouldPersistTaps="handled"
        >
          {/* Intro */}
          <View style={styles.intro}>
            <Text style={styles.h1}>We’ll pray with you</Text>
            <Text style={styles.sub}>
              Share a short request (up to {WORD_LIMIT} words). Keep it simple and clear.
            </Text>
          </View>

          {/* Card */}
          <View style={styles.card}>
            {/* Name */}
            <Text style={styles.label}>Your name</Text>
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="e.g., Thandi"
              placeholderTextColor={COLORS.inkMuted}
              style={styles.input}
              returnKeyType="next"
              autoCapitalize="words"
            />

            {/* Prayer request */}
            <View style={{ marginTop: 14 }}>
              <View style={styles.labelRow}>
                <Text style={styles.label}>Prayer request</Text>
                <Text
                  style={[
                    styles.counter,
                    { color: overLimit ? COLORS.warn : COLORS.inkMuted },
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
                placeholderTextColor={COLORS.inkMuted}
                multiline
                style={[styles.textarea, overLimit && styles.textareaWarn]}
                textAlignVertical="top"
                maxLength={800}
              />

              {overLimit ? (
                <Text style={styles.helperWarn}>
                  You’re over the {WORD_LIMIT}-word limit by {overBy} word{overBy === 1 ? '' : 's'}. Please trim it a little.
                </Text>
              ) : (
                <Text style={styles.helperOk}>
                  {wordsRemaining} word{wordsRemaining === 1 ? '' : 's'} remaining.
                </Text>
              )}
            </View>

            {/* CTA — compact */}
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
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  intro: { marginBottom: 10 },
  h1: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 22,
    color: COLORS.ink,
  },
  sub: {
    marginTop: 6,
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    color: COLORS.inkMuted,
    lineHeight: 20,
  },

  card: {
    marginTop: 8,
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },

  labelRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
  },
  label: {
    fontFamily: 'Montserrat-Medium',
    color: COLORS.ink,
    fontSize: 14,
    marginBottom: 8,
  },
  counter: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 12,
  },

  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: '#FFF',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: Platform.OS === 'ios' ? 12 : 10,
    fontFamily: 'Montserrat-Regular',
    color: COLORS.ink,
    fontSize: 16,
  },

  textarea: {
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: '#FFF',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    minHeight: 120,
    fontFamily: 'Montserrat-Regular',
    color: COLORS.ink,
    fontSize: 16,
    lineHeight: 22,
  },
  textareaWarn: {
    borderColor: COLORS.warn,
  },
  helperWarn: {
    marginTop: 6,
    color: COLORS.warn,
    fontFamily: 'Montserrat-Medium',
    fontSize: 12,
  },
  helperOk: {
    marginTop: 6,
    color: COLORS.inkMuted,
    fontFamily: 'Montserrat-Medium',
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
  ctaDisabled: {
    opacity: 0.5,
  },
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
    color: COLORS.inkMuted,
  },
});
