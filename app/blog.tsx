// app/blog.tsx
import React, { useRef, useState } from 'react';
import { View, ActivityIndicator, StyleSheet, Platform } from 'react-native';
import { WebView } from 'react-native-webview';
import Constants from 'expo-constants';

export default function Blog() {
  const BLOG_URL = (Constants.expoConfig?.extra as any)?.BLOG_URL || 'https://example.com';
  const [loading, setLoading] = useState(true);
  const webRef = useRef<WebView>(null);

  return (
    <View style={styles.container}>
      {loading && (
        <View style={styles.loader}>
          <ActivityIndicator size="large" />
        </View>
      )}
      <WebView
        ref={webRef}
        source={{ uri: BLOG_URL }}
        onLoadEnd={() => setLoading(false)}
        startInLoadingState
        allowsBackForwardNavigationGestures
        pullToRefreshEnabled={Platform.OS === 'ios'}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  loader: { position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, alignItems: 'center', justifyContent: 'center', zIndex: 1 },
});
