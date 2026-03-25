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
  scripture?: string;
  body: string[];
  prayer?: string;
  action?: string;
  reference?: string;
  sourceType?: 'manual' | 'blog';
  sourceUrl?: string;
  publishedAt?: string;
  categories?: string[];
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

const DEFAULT_WHATSAPP_NUMBER = '27765639460';
const DEFAULT_WHATSAPP_MESSAGE = "Hi The Life Place, I'd love to get in touch.";
const DEFAULT_WHATSAPP_URL = `https://wa.me/${DEFAULT_WHATSAPP_NUMBER}?text=${encodeQueryValue(
  DEFAULT_WHATSAPP_MESSAGE
)}`;
const DEFAULT_WHATSAPP_APP_URL = `whatsapp://send?phone=${DEFAULT_WHATSAPP_NUMBER}&text=${encodeQueryValue(
  DEFAULT_WHATSAPP_MESSAGE
)}`;
const DEFAULT_CONTACT_EMAIL = 'hello@thelifeplace.org';
const DEFAULT_PRIMARY_SERVICE = {
  id: 'sunday-service',
  day: 'Sunday',
  label: 'Sunday 9:00-11:00 AM SAST',
  startTime: '09:00',
  endTime: '11:00',
  timezone: 'Africa/Johannesburg',
  description: 'Join us for worship, prayer, and community every Sunday morning.',
} as const;
const DEFAULT_LOCATION_ADDRESS = {
  line1: '51 Villa Monte Catini, 1 Elm Avenue',
  line2: 'Craigavon AH, 2191',
  line3: 'Sandton',
  line4: 'South Africa',
} as const;
const DEFAULT_LOCATION_VENUE = 'The Life Place';
const DEFAULT_LOCATION_FULL_ADDRESS = Object.values(DEFAULT_LOCATION_ADDRESS).join(', ');
const DEFAULT_GOOGLE_MAPS_URL = `https://www.google.com/maps?q=${encodeURIComponent(
  DEFAULT_LOCATION_FULL_ADDRESS
)}`;
const DEFAULT_APPLE_MAPS_URL = `https://maps.apple.com/?q=${encodeURIComponent(
  DEFAULT_LOCATION_FULL_ADDRESS
)}`;
const DEFAULT_WAZE_URL = `https://www.waze.com/ul?q=${encodeURIComponent(
  DEFAULT_LOCATION_FULL_ADDRESS
)}&navigate=yes`;
const DEFAULT_SOCIALS = {
  youtube: 'https://youtube.com/@thelifeplacesa',
  instagram: 'https://instagram.com/thelifeplacesa',
  facebook: 'https://facebook.com/thelifeplacesa',
  spotify: 'https://open.spotify.com/show/31hbtgq5cvmqr4tyzs2faygvrzaa?si=61b073370e034f21',
  applePodcasts: 'https://podcasts.apple.com/us/podcast/the-life-place/id1816955719',
} as const;

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

function decodeHtmlEntities(value: string) {
  return value
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}

function stripHtml(value: string) {
  return decodeHtmlEntities(value)
    .replace(/<br\s*\/?>/gi, '\n\n')
    .replace(/<\/p>\s*<p[^>]*>/gi, '\n\n')
    .replace(/<[^>]+>/g, ' ')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/[ \t]{2,}/g, ' ')
    .trim();
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .trim();
}

function trimSentence(value: string, maxLength: number) {
  if (value.length <= maxLength) return value;
  const sliced = value.slice(0, maxLength);
  const lastSpace = sliced.lastIndexOf(' ');
  const safe = lastSpace > 40 ? sliced.slice(0, lastSpace) : sliced;
  return `${safe.trimEnd()}…`;
}

function buildDevotionalBody(excerpt?: string) {
  const plainText = stripHtml(excerpt || '');
  if (!plainText) return [];

  const paragraphSource = plainText
    .split(/\n{2,}/)
    .map((part) => part.trim())
    .filter(Boolean);

  if (paragraphSource.length > 1) {
    return paragraphSource.slice(0, 2).map((part) => trimSentence(part, 240));
  }

  const sentences = plainText
    .match(/[^.!?]+[.!?]?/g)
    ?.map((sentence) => sentence.trim())
    .filter(Boolean) || [plainText];

  const firstParagraph = trimSentence(sentences.slice(0, 2).join(' '), 240);
  const secondParagraphSource = sentences.slice(2).join(' ');

  if (!secondParagraphSource) {
    return [firstParagraph];
  }

  return [firstParagraph, trimSentence(secondParagraphSource, 220)];
}

export function deriveDevotionalsFromBlogFeed(items: BlogItem[]): Devotional[] {
  return items.flatMap((item, index) => {
      const body = buildDevotionalBody(item.excerpt);
      if (!item.title || !item.link || body.length === 0) return [];

      return [{
        id: slugify(item.title) || `blog-devotional-${index + 1}`,
        title: item.title,
        body,
        sourceType: 'blog' as const,
        sourceUrl: item.link,
        publishedAt: item.date,
        categories: item.categories || [],
      }];
    });
}

export function getMessageWatchUrl(message: MessageItem) {
  if (message.videoUrl) return message.videoUrl;
  if (message.youtubeId) return `https://www.youtube.com/watch?v=${message.youtubeId}`;
  return null;
}

export function getCanonicalWhatsAppUrl(url?: string) {
  const target = getWhatsAppTarget(url);
  return `https://wa.me/${target.phone}?text=${encodeQueryValue(target.text)}`;
}

export function getWhatsAppClickToChatUrl(
  url?: string,
  platform: 'ios' | 'android' | 'web' = 'web'
) {
  const target = getWhatsAppTarget(url);

  if (platform === 'ios') {
    // Keep iOS web fallback minimal; some Safari builds reject additional params when handing off.
    return `https://wa.me/${target.phone}`;
  }

  return `https://wa.me/${target.phone}?text=${encodeQueryValue(target.text)}`;
}

export function getWhatsAppAppUrls(url?: string) {
  const target = getWhatsAppTarget(url);
  const query = `phone=${target.phone}&text=${encodeQueryValue(target.text)}`;

  return [
    `whatsapp://send?${query}`,
    `whatsapp-business://send?${query}`,
  ];
}

export function getCanonicalContactEmail(email?: string) {
  if (!email) return DEFAULT_CONTACT_EMAIL;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return DEFAULT_CONTACT_EMAIL;
  return email;
}

export function getCanonicalSocials(socials?: Record<string, string>) {
  return {
    ...DEFAULT_SOCIALS,
    ...(socials || {}),
  };
}

export function getCanonicalVisitLocation(location?: BootstrapPayload['location']) {
  return {
    venue: location?.venue || DEFAULT_LOCATION_VENUE,
    fullAddress: location?.fullAddress || DEFAULT_LOCATION_FULL_ADDRESS,
    address: {
      line1: location?.address?.line1 || DEFAULT_LOCATION_ADDRESS.line1,
      line2: location?.address?.line2 || DEFAULT_LOCATION_ADDRESS.line2,
      line3: location?.address?.line3 || DEFAULT_LOCATION_ADDRESS.line3,
      line4: location?.address?.line4 || DEFAULT_LOCATION_ADDRESS.line4,
    },
    mapsQueryUrl: location?.mapsQueryUrl || DEFAULT_GOOGLE_MAPS_URL,
    appleMapsUrl: location?.appleMapsUrl || DEFAULT_APPLE_MAPS_URL,
    wazeUrl: location?.wazeUrl || DEFAULT_WAZE_URL,
  };
}

export function getCanonicalPrimaryService(
  service?: BootstrapPayload['schedule']['services'][number]
) {
  return {
    ...DEFAULT_PRIMARY_SERVICE,
    ...(service || {}),
  };
}

export function getWhatsAppAppUrl(url?: string) {
  const target = getWhatsAppTarget(url);
  return `whatsapp://send?phone=${target.phone}&text=${encodeQueryValue(target.text)}`;
}

function encodeQueryValue(value: string) {
  return encodeURIComponent(value).replace(
    /[!'()*]/g,
    (character) => `%${character.charCodeAt(0).toString(16).toUpperCase()}`
  );
}

function sanitizeWhatsAppPhone(phone?: string | null) {
  const sanitized = (phone || '').replace(/[^\d]/g, '');
  return sanitized || DEFAULT_WHATSAPP_NUMBER;
}

function getWhatsAppTarget(url?: string) {
  if (!url || /X{3,}/i.test(url)) {
    return {
      phone: DEFAULT_WHATSAPP_NUMBER,
      text: DEFAULT_WHATSAPP_MESSAGE,
    };
  }

  const trimmedUrl = url.trim();

  if (/^\+?[\d\s()-]+$/.test(trimmedUrl)) {
    return {
      phone: sanitizeWhatsAppPhone(trimmedUrl),
      text: DEFAULT_WHATSAPP_MESSAGE,
    };
  }

  try {
    const parsedUrl = new URL(trimmedUrl);
    const protocol = parsedUrl.protocol.toLowerCase();
    const hostname = parsedUrl.hostname.replace(/^www\./i, '').toLowerCase();

    if (protocol === 'whatsapp:') {
      return {
        phone: sanitizeWhatsAppPhone(parsedUrl.searchParams.get('phone')),
        text: parsedUrl.searchParams.get('text') || DEFAULT_WHATSAPP_MESSAGE,
      };
    }

    if (hostname === 'wa.me') {
      return {
        phone: sanitizeWhatsAppPhone(parsedUrl.pathname.replace(/^\/+/, '')),
        text: parsedUrl.searchParams.get('text') || DEFAULT_WHATSAPP_MESSAGE,
      };
    }

    if (hostname === 'api.whatsapp.com') {
      return {
        phone: sanitizeWhatsAppPhone(parsedUrl.searchParams.get('phone')),
        text: parsedUrl.searchParams.get('text') || DEFAULT_WHATSAPP_MESSAGE,
      };
    }
  } catch {
    return {
      phone: DEFAULT_WHATSAPP_NUMBER,
      text: DEFAULT_WHATSAPP_MESSAGE,
    };
  }

  return {
    phone: DEFAULT_WHATSAPP_NUMBER,
    text: DEFAULT_WHATSAPP_MESSAGE,
  };
}
