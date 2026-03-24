import { FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const ICONS = {
  apple: { pack: 'ion', name: 'logo-apple' },
  'apple-podcasts': { pack: 'ion', name: 'logo-apple' },
  albums: { pack: 'ion', name: 'albums-outline' },
  back: { pack: 'ion', name: 'chevron-back' },
  'book-open': { pack: 'ion', name: 'book-outline' },
  calendar: { pack: 'ion', name: 'calendar-outline' },
  check: { pack: 'ion', name: 'checkmark' },
  'chevron-down': { pack: 'ion', name: 'chevron-down-outline' },
  'chevron-up': { pack: 'ion', name: 'chevron-up-outline' },
  close: { pack: 'ion', name: 'close' },
  cross: { pack: 'fa5', name: 'cross' },
  'facebook-f': { pack: 'ion', name: 'logo-facebook' },
  facebook: { pack: 'ion', name: 'logo-facebook' },
  'file-lines': { pack: 'ion', name: 'document-text-outline' },
  forward: { pack: 'ion', name: 'chevron-forward' },
  globe: { pack: 'ion', name: 'globe-outline' },
  google: { pack: 'ion', name: 'logo-google' },
  'hand-holding-heart': { pack: 'mci', name: 'hand-heart-outline' },
  'hands-praying': { pack: 'mci', name: 'hands-pray' },
  home: { pack: 'ion', name: 'home-outline' },
  instagram: { pack: 'ion', name: 'logo-instagram' },
  laptop: { pack: 'ion', name: 'laptop-outline' },
  link: { pack: 'ion', name: 'link-outline' },
  'location-dot': { pack: 'ion', name: 'location-outline' },
  mail: { pack: 'ion', name: 'mail-outline' },
  map: { pack: 'ion', name: 'map-outline' },
  'mobile-screen': { pack: 'ion', name: 'phone-portrait-outline' },
  'mobile-screen-button': { pack: 'ion', name: 'qr-code-outline' },
  navigate: { pack: 'ion', name: 'navigate-outline' },
  newspaper: { pack: 'ion', name: 'newspaper-outline' },
  'paper-plane': { pack: 'ion', name: 'paper-plane-outline' },
  paypal: { pack: 'ion', name: 'logo-paypal' },
  people: { pack: 'ion', name: 'people-outline' },
  'people-group': { pack: 'ion', name: 'people-outline' },
  'person-walking-arrow-right': { pack: 'fa5', name: 'walking' },
  'qr-code': { pack: 'ion', name: 'qr-code-outline' },
  radio: { pack: 'ion', name: 'radio-outline' },
  'share-nodes': { pack: 'ion', name: 'share-social-outline' },
  spotify: { pack: 'mci', name: 'spotify' },
  whatsapp: { pack: 'ion', name: 'logo-whatsapp' },
  youtube: { pack: 'ion', name: 'logo-youtube' },
} as const;

export type AppIconName = keyof typeof ICONS;

export default function AppIcon({
  name,
  size = 24,
  color = '#111827',
}: {
  name: AppIconName;
  size?: number;
  color?: string;
}) {
  const icon = ICONS[name];

  if (icon.pack === 'mci') {
    return <MaterialCommunityIcons name={icon.name as any} size={size} color={color} />;
  }

  if (icon.pack === 'fa5') {
    return <FontAwesome5 name={icon.name as any} size={size} color={color} solid />;
  }

  return <Ionicons name={icon.name as any} size={size} color={color} />;
}
