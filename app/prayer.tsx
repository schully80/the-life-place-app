
import { View, Text, TextInput, Alert } from 'react-native';
import { g } from '~/lib/styles';
import Button from '~/components/Button';
export default function Prayer() {
  return (
    <View style={g.screen}>
      <Text style={g.h1}>Prayer Request</Text>
      <TextInput placeholder="Your name" style={{ backgroundColor:'#fff', padding:12, borderRadius:12, marginBottom:8 }} />
      <TextInput placeholder="Your email" keyboardType="email-address" style={{ backgroundColor:'#fff', padding:12, borderRadius:12, marginBottom:8 }} />
      <TextInput placeholder="How can we pray for you?" multiline numberOfLines={5} style={{ backgroundColor:'#fff', padding:12, borderRadius:12, marginBottom:8, textAlignVertical: 'top' }} />
      <Button title="Submit" onPress={() => Alert.alert('Submitted', 'We will be praying with you.')} />
    </View>
  );
}
