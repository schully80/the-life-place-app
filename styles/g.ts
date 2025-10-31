import { StyleSheet } from 'react-native';

export const g = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFFFFF', // charcoal base
    padding: 24,
  },
  h1: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 26,
    color: '#FFFFFF',
  },
  h2: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 18,
    color: '#FFFFFF',
  },
  p: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 15,
    color: '#CCCCCC',
    lineHeight: 22,
  },
  brandRed: {
    color: '#B3282D',
  },
  card: {
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 3,
  },
 grid: {
  flexDirection: 'row',
  justifyContent: 'space-evenly',
  alignItems: 'flex-start',
  marginTop: 10,
  flexWrap: 'wrap',
},

card: {
  backgroundColor: '#B3282D',
  width: '45%',         // two columns
  height: 120,          // fixed height for uniform look
  borderRadius: 16,
  alignItems: 'center',
  justifyContent: 'center',
  marginVertical: 8,
  shadowColor: '#000',
  shadowOpacity: 0.1,
  shadowOffset: { width: 0, height: 4 },
  shadowRadius: 6,
  elevation: 3,
},

cardText: {
  fontFamily: 'Inter-SemiBold',
  fontSize: 14,
  color: '#FFFFFF',
  marginTop: 6,
  textAlign: 'center',
  lineHeight: 18,
},

});
