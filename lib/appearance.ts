export type AppearancePreference = 'normal' | 'day' | 'night';
export type ResolvedAppearance = 'normal' | 'day' | 'night';

export const APPEARANCE_STORAGE_KEY = 'app_appearance_preference_v1';

export function isAppearancePreference(value: string | null | undefined): value is AppearancePreference {
  return value === 'normal' || value === 'day' || value === 'night';
}

export function resolveAppearancePreference(preference: AppearancePreference): ResolvedAppearance {
  return preference;
}
