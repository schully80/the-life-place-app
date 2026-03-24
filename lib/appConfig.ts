import Constants from 'expo-constants';

type AppConfig = {
  supabaseUrl: string;
  supabaseAnonKey: string;
  contentApiBaseUrl?: string;
  prayerEmailWebhook?: string;
  icsCalendarUrl?: string;
  givingUrl?: string;
  youtubeApiKey?: string;
  youtubeChannelId?: string;
};

const extra = (Constants?.expoConfig?.extra || {}) as Record<string, any>;

function extractHost(value: string) {
  if (!value) return '';

  const trimmed = value.trim();
  const withoutScheme = trimmed.replace(/^[a-z]+:\/\//i, '');
  const hostPort = withoutScheme.split('/')[0];
  const host = hostPort.split(':')[0];
  return host;
}

function resolveDevSiteBaseUrl() {
  const constantsAny = Constants as any;
  const candidates = [
    constantsAny?.expoGoConfig?.debuggerHost,
    constantsAny?.expoConfig?.hostUri,
    constantsAny?.manifest2?.extra?.expoClient?.hostUri,
    constantsAny?.linkingUri,
    constantsAny?.experienceUrl,
  ].filter(Boolean) as string[];

  for (const candidate of candidates) {
    const host = extractHost(candidate);
    if (host) {
      return `http://${host}:4322`;
    }
  }

  return undefined;
}

const explicitContentApiBaseUrl =
  process.env.CONTENT_API_BASE_URL || (extra.CONTENT_API_BASE_URL as string) || undefined;
const devContentApiBaseUrl = __DEV__ ? resolveDevSiteBaseUrl() : undefined;

export const config: AppConfig = {
  supabaseUrl: process.env.SUPABASE_URL || (extra.SUPABASE_URL as string) || '',
  supabaseAnonKey: process.env.SUPABASE_ANON_KEY || (extra.SUPABASE_ANON_KEY as string) || '',
  contentApiBaseUrl:
    process.env.CONTENT_API_BASE_URL ||
    devContentApiBaseUrl ||
    (extra.CONTENT_API_BASE_URL as string) ||
    'https://thelifeplace.org',
  prayerEmailWebhook: process.env.PRAYER_EMAIL_WEBHOOK || (extra.PRAYER_EMAIL_WEBHOOK as string) || undefined,
  icsCalendarUrl: process.env.ICS_CALENDAR_URL || (extra.ICS_CALENDAR_URL as string) || undefined,
  givingUrl: process.env.GIVING_URL || (extra.GIVING_URL as string) || undefined,
  youtubeApiKey: process.env.YOUTUBE_API_KEY || (extra.YOUTUBE_API_KEY as string) || undefined,
  youtubeChannelId: process.env.YOUTUBE_CHANNEL_ID || (extra.YOUTUBE_CHANNEL_ID as string) || undefined,
};
