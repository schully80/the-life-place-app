import { Header, getDefaultHeaderHeight, getHeaderTitle } from '@react-navigation/elements';
import type { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BackButton from './BackButton';

const IOS_BACK_HEADER_EXTRA_SPACE = 12;

function getFallbackRoute(routeName: string) {
  if (routeName === 'ministries/[slug]') return '/ministries';
  return '/community';
}

export default function IosStackHeader({
  back,
  navigation,
  options,
  route,
}: NativeStackHeaderProps) {
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();
  const defaultHeaderHeight = getDefaultHeaderHeight(
    { width, height },
    false,
    insets.top
  );

  return (
    <Header
      back={back}
      title={getHeaderTitle(options, route.name)}
      headerTitleAlign="center"
      headerStyle={{
        backgroundColor: '#FFFFFF',
        height: back ? defaultHeaderHeight + IOS_BACK_HEADER_EXTRA_SPACE : defaultHeaderHeight,
      }}
      headerTitleStyle={{
        color: '#111827',
        fontSize: 18,
        fontFamily: 'Montserrat-Bold',
      }}
      headerTintColor="#111827"
      headerShadowVisible={false}
      headerLeft={
        back
          ? () => (
              <BackButton
                fallbackTo={getFallbackRoute(route.name)}
                onPress={() => navigation.goBack()}
              />
            )
          : undefined
      }
    />
  );
}
