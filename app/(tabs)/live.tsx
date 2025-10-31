import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';

export default function LiveScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLive, setIsLive] = useState(true); // set false to simulate offline

  // 🔴 Replace this with your actual YouTube Live URL
  const YOUTUBE_LIVE_URL = 'https://www.youtube.com/embed/live_stream?channel=UCxxxxxxxxxxxxxx&autoplay=1';

  useEffect(() => {
    // You could later check if live dynamically from your backend or YouTube API
  }, []);

  return (
    <View style={styles.container}>
      {isLive ? (
        <>
          {isLoading && (
            <ActivityIndicator size="large" color="#B3282D" style={{ marginTop: 30 }} />
          )}
          <View style={styles.banner}>
            <Text style={styles.bannerText}>🔴 We’re Live!</Text>
          </View>
          <WebView
            source={{ uri: YOUTUBE_LIVE_URL }}
            onLoadEnd={() => setIsLoading(false)}
            style={styles.video}
            allowsFullscreenVideo
          />
        </>
      ) : (
        <View style={styles.offlineContainer}>
          <Text style={styles.offlineTitle}>We’re not live right now</Text>
          <Text style={styles.offlineText}>
            Please check back during our next Sunday service or catch up in Messages.
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  banner: {
    marginTop: 10,
    backgroundColor: '#B3282D',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  bannerText: {
    color: '#fff',
    fontWeight: '600',
  },
  video: {
    marginTop: 20,
    width: '100%',
    height: 300,
  },
  offlineContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  offlineTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#B3282D',
    marginBottom: 8,
  },
  offlineText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#555',
    lineHeight: 22,
  },
});
