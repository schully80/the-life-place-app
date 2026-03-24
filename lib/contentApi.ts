import { config } from '~/lib/appConfig';
import {
  buildFallbackEvents,
  buildFallbackLive,
  FALLBACK_BLOG_FEED,
  FALLBACK_BOOTSTRAP,
  FALLBACK_MESSAGES,
} from '~/lib/contentFallback';

export type Ministry = {
  slug: string;
  title: string;
  summary: string;
  body: string[];
};

export type Devotional = {
  id: string;
  title: string;
  scripture: string;
  body: string[];
  prayer?: string;
  action?: string;
  reference?: string;
};

export type MessageItem = {
  id: string;
  title: string;
  preacher: string;
  series: string;
  date: string;
  videoSource?: 'youtube' | 'local';
  youtubeId?: string;
  videoUrl?: string;
  thumbnail: string;
  description?: string;
};

export type EventItem = {
  id: string;
  start: string;
  end?: string;
  summary: string;
  location?: string;
  description?: string;
  source: string;
};

export type BlogItem = {
  title: string;
  link: string;
  date?: string;
  excerpt?: string;
  categories?: string[];
};

export type BootstrapPayload = {
  generatedAt: string;
  features: {
    ministriesEnabled: boolean;
    messagesEnabled: boolean;
  };
  site: {
    name: string;
    tagline: string;
    siteUrl: string;
  };
  contact: {
    email: string;
    whatsapp?: string;
  };
  socials: Record<string, string>;
  location: {
    venue: string;
    fullAddress: string;
    address: {
      line1: string;
      line2: string;
      line3: string;
      line4: string;
    };
    mapsQueryUrl: string;
    appleMapsUrl: string;
    wazeUrl: string;
  };
  schedule: {
    timezone: string;
    services: Array<{
      id: string;
      day: string;
      label: string;
      startTime: string;
      endTime: string;
      description: string;
    }>;
  };
  live: {
    youtubeChannelId: string;
    youtubeChannelUrl: string;
    youtubeChannelLiveUrl: string;
    youtubeEmbedUrl: string;
  };
  giving: {
    bank: {
      accountName: string;
      bankName: string;
      accountNumber: string;
      branchCode: string;
      accountType: string;
      swift: string;
      referenceHint: string;
    };
    snapscan: {
      url: string;
      qrImagePath: string;
    };
    paypal: {
      donateUrl: string;
    };
    annualReport: {
      pagePath: string;
      pdfPath: string;
      label: string;
    };
  };
  links: {
    siteUrl: string;
    blogUrl: string;
    visitPath: string;
    givePath: string;
    livePath: string;
    messagesPath: string;
    appPath: string;
    prayerPath: string;
    eventsPath: string;
    devotionalsPath: string;
    privacyPath: string;
    termsPath: string;
    beliefsPath: string;
    annualReportPath: string;
  };
  app: {
    iosUrl?: string;
    androidUrl?: string;
  };
  welcome: {
    title: string;
    lines: string[];
    slogan: string;
  };
  about: {
    title: string;
    missionTitle: string;
    missionBody: string;
    missionSupport: string;
    values: Array<{
      id: string;
      title: string;
      body: string;
    }>;
  };
  ministries: Ministry[];
  devotionals: Devotional[];
};

function trimTrailingSlash(value: string) {
  return value.replace(/\/+$/, '');
}

export function getContentApiBaseUrl() {
  const baseUrl = config.contentApiBaseUrl || 'https://thelifeplace.org';
  return trimTrailingSlash(baseUrl);
}

export function toAbsoluteSiteUrl(pathOrUrl: string) {
  if (/^[a-z][a-z0-9+.-]*:/i.test(pathOrUrl)) return pathOrUrl;
  const normalizedPath = pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`;
  return `${getContentApiBaseUrl()}${normalizedPath}`;
}

function getFallbackForPath(path: string) {
  switch (path) {
    case '/api/content/bootstrap.json':
      return FALLBACK_BOOTSTRAP;
    case '/api/messages.json':
      return FALLBACK_MESSAGES;
    case '/api/live.json':
      return buildFallbackLive();
    case '/api/events.json':
      return buildFallbackEvents();
    case '/api/blog-feed.json':
      return FALLBACK_BLOG_FEED;
    default:
      return undefined;
  }
}

async function fetchJson<T>(path: string): Promise<T> {
  try {
    const response = await fetch(toAbsoluteSiteUrl(path));
    if (response.ok) {
      return response.json() as Promise<T>;
    }
  } catch {
    // Fall through to local seeded content.
  }

  const fallback = getFallbackForPath(path);
  if (fallback !== undefined) {
    return fallback as T;
  }

  throw new Error('Request failed');
}

export function fetchBootstrap() {
  return fetchJson<BootstrapPayload>('/api/content/bootstrap.json');
}

export function fetchMessages() {
  return fetchJson<MessageItem[]>('/api/messages.json');
}

export function fetchLive() {
  return fetchJson<{
    live: boolean;
    status: string;
    watchUrl: string;
    embedUrl: string;
    channelUrl: string;
    youtubeChannelId: string;
    checkedAt: string;
    service: BootstrapPayload['schedule']['services'][number];
  }>('/api/live.json');
}

export function fetchEvents() {
  return fetchJson<EventItem[]>('/api/events.json');
}

export function fetchBlogFeed() {
  return fetchJson<{ items: BlogItem[] }>('/api/blog-feed.json');
}

export function getMessageWatchUrl(message: MessageItem) {
  if (message.videoUrl) return message.videoUrl;
  if (message.youtubeId) return `https://www.youtube.com/watch?v=${message.youtubeId}`;
  return null;
}
