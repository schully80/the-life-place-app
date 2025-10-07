import { useState } from 'react';
import { View, Text, TextInput, Alert } from 'react-native';
import { g } from '~/lib/styles';
import Button from '~/components/Button';
import { supabase } from '~/lib/supabase';
import { config } from '~/lib/appConfig';

export default function Prayer() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);

  async function submit() {
    if (!message.trim()) {
      Alert.alert('Missing info', 'Please share your prayer request.');
      return;
    }
    try {
      setBusy(true);
      const { error } = await supabase.from('prayer_requests').insert({ name, email, message });
      if (error) throw error;

      if (config.prayerEmailWebhook) {
        await fetch(config.prayerEmailWebhook, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, message, source: 'tlp-app' })
        });
      }

      Alert.alert('Submitted', 'Thank you. We will be praying with you.');
      setName(''); setEmail(''); setMessage('');
    } catch (e: any) {
      Alert.alert('Error', e.message || 'Could not submit your request.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <View style={g.screen}>
      <Text style={g.h1}>Prayer Request</Text>
      <TextInput placeholder="Your name" value={name} onChangeText={setName}
        style={{ backgroundColor:'#fff', padding:12, borderRadius:12, marginBottom:8 }} />
      <TextInput placeholder="Your email" value={email} onChangeText={setEmail} keyboardType="email-address"
        style={{ backgroundColor:'#fff', padding:12, borderRadius:12, marginBottom:8 }} />
      <TextInput placeholder="How can we pray for you?" value={message} onChangeText={setMessage}
        multiline numberOfLines={5}
        style={{ backgroundColor:'#fff', padding:12, borderRadius:12, marginBottom:8, textAlignVertical: 'top' }} />
      <Button title={busy ? 'Submitting…' : 'Submit'} onPress={busy ? undefined : submit} />
    </View>
  );
}
