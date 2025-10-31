import { View, Text, Image, StyleSheet, Linking, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';

export default function MeetSchulterJenny() {
  const openSubstack = () => {
    Linking.openURL('https://schulteretyang.substack.com');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Image */}
      <Image
        source={require('../assets/schulter-jenny.jpg')} // <- save your grayscale photo here
        style={styles.photo}
      />

      {/* Content */}

      <Text style={styles.paragraph}>
        Schulter and Genevieve (Jenny) Etyang are the founders of
        <Text style={styles.bold}> The Life Place</Text>, Craigavon AH, Sandton, South Africa.
      </Text>

      <Text style={styles.paragraph}>
        Fifteen years ago, they encountered the good news of who Jesus is and what He has done, which became the central mission of their lives: inviting others to
        <Text style={styles.red}> Come. See. Jesus</Text>
      </Text>

      <Text style={styles.paragraph}>
        The Etyangs enjoy conversations about Jesus, being at home, travelling, exercise, watching sports, Netflix and chill, and the simple things in life.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#FFFFFF',
  },
  photo: {
    width: '100%',
    height: 300,
    borderRadius: 16,
    resizeMode: 'cover',
    marginBottom: 24,
  },
heading: {
  fontFamily: 'Montserrat-Bold',
  fontSize: 24,
  color: '#B3282D',
  marginBottom: 12,
  textAlign: 'center',     // ⬅️ centers the text inside the Text component
  alignSelf: 'stretch',    // (optional) lets it take full row width
  // or: width: '100%',

  },
  paragraph: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 14,
    color: '#333',
    lineHeight: 24,
    marginBottom: 14,
  },
  bold: {
    fontFamily: 'Montserrat-SemiBold',
  },
  red: {
    color: '#B3282D',
    fontWeight: '600',
  },
  link: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 16,
    color: '#B3282D',
    textDecorationLine: 'underline',
    marginTop: 8,
  },
});
