import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function Community() {
  return (
    <LinearGradient
      colors={['#FFFFFF', 'rgba(179, 40, 45, 0.04)']}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Community</Text>
        <Text style={styles.subtitle}>
          Be part of The Life Place family — connect, serve, and grow together.
        </Text>

        <TouchableOpacity style={styles.card}>
          <Ionicons name="people-outline" size={26} color="#B3282D" />
          <Text style={styles.cardText}>Join a Life Group</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <Ionicons name="person-circle-outline" size={26} color="#B3282D" />
          <Text style={styles.cardText}>Meet the Team</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <Ionicons name="hand-right-outline" size={26} color="#B3282D" />
          <Text style={styles.cardText}>Serve or Volunteer</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <Ionicons name="logo-instagram" size={26} color="#B3282D" />
          <Text style={styles.cardText}>Follow Us Online</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  content: {
    paddingVertical: 40,
  },
  title: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 28,
    color: '#B3282D',
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'Inter',
    fontSize: 16,
    color: '#374151',
    marginBottom: 30,
    lineHeight: 22,
  },
  card: {
    backgroundColor: '#FFFFFFEE',
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 18,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  cardText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#111827',
  },
});
