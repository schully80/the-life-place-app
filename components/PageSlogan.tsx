import { StyleSheet, Text, View, type ViewStyle } from 'react-native';

export default function PageSlogan({
  inverse = false,
  style,
}: {
  inverse?: boolean;
  style?: ViewStyle;
}) {
  return (
    <View style={[styles.wrap, style]}>
      <Text style={[styles.text, inverse ? styles.textInverse : styles.textDefault]}>
        COME. SEE. JESUS
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    paddingTop: 26,
    paddingBottom: 10,
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 28,
    lineHeight: 32,
    letterSpacing: 2.8,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  textDefault: {
    color: '#111827',
  },
  textInverse: {
    color: '#F8FBFF',
  },
});
