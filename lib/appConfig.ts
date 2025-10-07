import Constants from 'expo-constants';

type AppConfig = {
  supabaseUrl: string;
  supabaseAnonKey: string;
  prayerEmailWebhook?: string;
  icsCalendarUrl?: string;
  givingUrl?: string;
  youtubeApiKey?: string;
  youtubeChannelId?: string;
};

const extra = (Constants?.expoConfig?.extra || {}) as Record<string, any>;

export const config: AppConfig = {
  supabaseUrl: process.env.SUPABASE_URL || (extra.SUPABASE_URL as string) || '',
  supabaseAnonKey: process.env.SUPABASE_ANON_KEY || (extra.SUPABASE_ANON_KEY as string) || '',
  prayerEmailWebhook: process.env.PRAYER_EMAIL_WEBHOOK || (extra.PRAYER_EMAIL_WEBHOOK as string) || undefined,
  icsCalendarUrl: process.env.ICS_CALENDAR_URL || (extra.ICS_CALENDAR_URL as string) || undefined,
  givingUrl: process.env.GIVING_URL || (extra.GIVING_URL as string) || undefined,
  youtubeApiKey: process.env.YOUTUBE_API_KEY || (extra.YOUTUBE_API_KEY as string) || undefined,
  youtubeChannelId: process.env.YOUTUBE_CHANNEL_ID || (extra.YOUTUBE_CHANNEL_ID as string) || undefined,
};
