import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { g } from '../styles/g';

export default function About() {
  return (
    <ScrollView contentContainerStyle={[g.screen, { paddingBottom: 60 }]}>
      <View style={styles.container}>
        <Text style={[g.h1, { marginBottom: 16 }]}>About The Life Place</Text>

        <Text style={[g.p, { marginBottom: 14 }]}>
          <Text style={g.brandRed}>The Life Place</Text> is a Jesus-centered community in Craigavon AH, Sandton,
          South Africa. We exist to invite people to discover the beauty of the gospel — to{' '}
          <Text style={g.brandRed}>Come. See. Jesus.</Text>
        </Text>

        <Text style={[g.p, { marginBottom: 14 }]}>
          We are passionate about the message of grace and helping people live out their faith through
          practical love, community, and service.
        </Text>

        <Text style={[g.p, { marginBottom: 14 }]}>
          Our gatherings include worship, teaching, and fellowship. We believe in creating a safe, welcoming
          space for people to encounter Jesus, find healing, and grow in grace.
        </Text>

        <View style={[g.card, { marginTop: 24 }]}>
          <Text style={[g.h2, { marginBottom: 10 }]}>Our Mission</Text>
          <Text style={g.p}>
            To make Jesus known and to help people live from His finished work — in freedom, purpose, and joy.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
