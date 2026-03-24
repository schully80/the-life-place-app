import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { AppState, type AppStateStatus } from 'react-native';
import { getAppLightingTheme, type AppLightingTheme } from '~/lib/appTheme';
import {
  APPEARANCE_STORAGE_KEY,
  isAppearancePreference,
  resolveAppearancePreference,
  type AppearancePreference,
  type ResolvedAppearance,
} from '~/lib/appearance';

type AppAppearanceContextValue = {
  ready: boolean;
  preference: AppearancePreference;
  resolvedAppearance: ResolvedAppearance;
  lightingTheme: AppLightingTheme;
  setPreference: (nextPreference: AppearancePreference) => Promise<void>;
};

const AppAppearanceContext = createContext<AppAppearanceContextValue | null>(null);

export function AppAppearanceProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [preference, setPreferenceState] = useState<AppearancePreference>('normal');
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    let active = true;

    (async () => {
      try {
        const stored = await AsyncStorage.getItem(APPEARANCE_STORAGE_KEY);
        if (active && isAppearancePreference(stored)) {
          setPreferenceState(stored);
        }
      } finally {
        if (active) {
          setNow(new Date());
          setReady(true);
        }
      }
    })();

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (state: AppStateStatus) => {
      if (state === 'active') {
        setNow(new Date());
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const resolvedAppearance = useMemo(
    () => resolveAppearancePreference(preference),
    [preference]
  );
  const lightingTheme = useMemo(
    () => getAppLightingTheme(resolvedAppearance),
    [resolvedAppearance]
  );

  const value = useMemo<AppAppearanceContextValue>(
    () => ({
      ready,
      preference,
      resolvedAppearance,
      lightingTheme,
      setPreference: async (nextPreference) => {
        setPreferenceState(nextPreference);
        setNow(new Date());

        try {
          await AsyncStorage.setItem(APPEARANCE_STORAGE_KEY, nextPreference);
        } catch {
          // Keep the in-memory preference even if persistence fails.
        }
      },
    }),
    [lightingTheme, preference, ready, resolvedAppearance]
  );

  return <AppAppearanceContext.Provider value={value}>{children}</AppAppearanceContext.Provider>;
}

export function useAppAppearance() {
  const context = useContext(AppAppearanceContext);

  if (!context) {
    throw new Error('useAppAppearance must be used within AppAppearanceProvider');
  }

  return context;
}
