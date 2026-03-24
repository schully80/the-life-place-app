export type HomeStyleId = 'editorial' | 'glass' | 'sanctuary';

export type HomeStyle = {
  id: HomeStyleId;
  label: string;
  descriptor: string;
  description: string;
  pageGradient: [string, string, string];
  orbTop: string;
  orbMiddle: string;
  orbBottom: string;
  heroGradient: [string, string];
  heroOverlay: string;
  heroBorder: string;
  card: string;
  cardAlt: string;
  modalSurface: string;
  border: string;
  borderStrong: string;
  textPrimary: string;
  textSecondary: string;
  textInverse: string;
  accent: string;
  accentSoft: string;
  accentMuted: string;
  pill: string;
  pillActive: string;
  pillText: string;
  pillActiveText: string;
  primaryButtonText: string;
  secondaryButtonBg: string;
  secondaryButtonText: string;
  backdrop: string;
  shadow: string;
  radiusHero: number;
  radiusCard: number;
};

export const HOME_STYLES: HomeStyle[] = [
  {
    id: 'editorial',
    label: 'Editorial',
    descriptor: 'Bold and grounded',
    description: 'High-contrast hospitality with gallery-like spacing and strong framing.',
    pageGradient: ['#FCF8F2', '#F6EDE1', '#EEDFD2'],
    orbTop: 'rgba(163,49,45,0.14)',
    orbMiddle: 'rgba(204,160,104,0.14)',
    orbBottom: 'rgba(37,27,23,0.06)',
    heroGradient: ['rgba(255,251,245,0.95)', 'rgba(243,231,217,0.94)'],
    heroOverlay: 'rgba(76,42,22,0.24)',
    heroBorder: 'rgba(116,84,67,0.16)',
    card: 'rgba(255,251,246,0.92)',
    cardAlt: 'rgba(244,235,224,0.95)',
    modalSurface: '#FFF8EF',
    border: 'rgba(116,84,67,0.12)',
    borderStrong: 'rgba(163,49,45,0.24)',
    textPrimary: '#181312',
    textSecondary: '#5F534D',
    textInverse: '#FFFFFF',
    accent: '#A3312D',
    accentSoft: 'rgba(163,49,45,0.1)',
    accentMuted: 'rgba(163,49,45,0.18)',
    pill: 'rgba(255,248,239,0.9)',
    pillActive: '#181312',
    pillText: '#5F534D',
    pillActiveText: '#FFFFFF',
    primaryButtonText: '#FFFFFF',
    secondaryButtonBg: 'rgba(24,19,18,0.06)',
    secondaryButtonText: '#181312',
    backdrop: 'rgba(24,19,18,0.34)',
    shadow: '#5A372B',
    radiusHero: 34,
    radiusCard: 28,
  },
  {
    id: 'glass',
    label: 'Glass',
    descriptor: 'Cinematic and luminous',
    description: 'Layered glass surfaces, stronger atmosphere, and a sharper contemporary edge.',
    pageGradient: ['#07111F', '#0E1B30', '#162B47'],
    orbTop: 'rgba(240,91,105,0.2)',
    orbMiddle: 'rgba(78,184,170,0.16)',
    orbBottom: 'rgba(255,255,255,0.08)',
    heroGradient: ['rgba(10,19,35,0.84)', 'rgba(22,43,71,0.66)'],
    heroOverlay: 'rgba(3,8,17,0.28)',
    heroBorder: 'rgba(255,255,255,0.14)',
    card: 'rgba(13,24,42,0.64)',
    cardAlt: 'rgba(18,34,58,0.76)',
    modalSurface: '#0D1A2C',
    border: 'rgba(255,255,255,0.1)',
    borderStrong: 'rgba(255,255,255,0.18)',
    textPrimary: '#F8FBFF',
    textSecondary: '#C7D2E2',
    textInverse: '#FFFFFF',
    accent: '#F05B69',
    accentSoft: 'rgba(240,91,105,0.14)',
    accentMuted: 'rgba(78,184,170,0.16)',
    pill: 'rgba(255,255,255,0.08)',
    pillActive: 'rgba(240,91,105,0.22)',
    pillText: '#D8E1ED',
    pillActiveText: '#FFFFFF',
    primaryButtonText: '#07111F',
    secondaryButtonBg: 'rgba(255,255,255,0.08)',
    secondaryButtonText: '#F8FBFF',
    backdrop: 'rgba(2,6,14,0.48)',
    shadow: '#020913',
    radiusHero: 38,
    radiusCard: 30,
  },
  {
    id: 'sanctuary',
    label: 'Sanctuary',
    descriptor: 'Soft and welcoming',
    description: 'Warm, tactile surfaces built around calm trust and approachability.',
    pageGradient: ['#FBF5EF', '#F1E3D6', '#E7C9B6'],
    orbTop: 'rgba(141,47,35,0.14)',
    orbMiddle: 'rgba(223,169,120,0.18)',
    orbBottom: 'rgba(117,73,43,0.08)',
    heroGradient: ['rgba(255,248,242,0.96)', 'rgba(245,226,214,0.95)'],
    heroOverlay: 'rgba(97,54,29,0.18)',
    heroBorder: 'rgba(117,73,43,0.14)',
    card: 'rgba(255,248,242,0.92)',
    cardAlt: 'rgba(243,228,215,0.96)',
    modalSurface: '#FFF6EF',
    border: 'rgba(117,73,43,0.12)',
    borderStrong: 'rgba(141,47,35,0.22)',
    textPrimary: '#211916',
    textSecondary: '#6A5850',
    textInverse: '#FFFFFF',
    accent: '#8D2F23',
    accentSoft: 'rgba(141,47,35,0.1)',
    accentMuted: 'rgba(141,47,35,0.16)',
    pill: 'rgba(255,244,236,0.92)',
    pillActive: '#8D2F23',
    pillText: '#6A5850',
    pillActiveText: '#FFFFFF',
    primaryButtonText: '#FFFFFF',
    secondaryButtonBg: 'rgba(141,47,35,0.08)',
    secondaryButtonText: '#211916',
    backdrop: 'rgba(33,25,22,0.32)',
    shadow: '#724A36',
    radiusHero: 36,
    radiusCard: 30,
  },
];
