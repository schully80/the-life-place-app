import type { ResolvedAppearance } from '~/lib/appearance';

export type AppLightingTheme = {
  mode: ResolvedAppearance;
  overlayColors: [string, string, string];
  start: { x: number; y: number };
  end: { x: number; y: number };
};

export function getAppLightingTheme(mode: ResolvedAppearance): AppLightingTheme {
  if (mode === 'normal') {
    return {
      mode,
      overlayColors: [
        'rgba(255,255,255,0)',
        'rgba(255,255,255,0)',
        'rgba(255,255,255,0)',
      ],
      start: { x: 0.5, y: 0 },
      end: { x: 0.5, y: 1 },
    };
  }

  if (mode === 'night') {
    return {
      mode,
      overlayColors: [
        'rgba(2,6,12,0.02)',
        'rgba(3,7,14,0.08)',
        'rgba(4,8,16,0.16)',
      ],
      start: { x: 0.5, y: 0 },
      end: { x: 0.5, y: 1 },
    };
  }

  return {
    mode,
    overlayColors: [
      'rgba(255,247,229,0.12)',
      'rgba(255,250,240,0.06)',
      'rgba(255,255,255,0.02)',
    ],
    start: { x: 0.08, y: 0 },
    end: { x: 0.92, y: 1 },
  };
}
