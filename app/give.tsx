import { View, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import { g } from '~/lib/styles';
import { config } from '~/lib/appConfig';

export default function Give() {
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={{ padding: 20 }}>
        <Text style={g.h1}>Give</Text>
        <Text style={g.p}>Secure giving via our web portal below.</Text>
      </View>
      <WebView source={{ uri: config.givingUrl || 'https://example.com/give' }} />
    </View>
  );
}
