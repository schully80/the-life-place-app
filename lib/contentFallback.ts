import type { BlogItem, BootstrapPayload, EventItem, MessageItem } from '~/lib/contentApi';

const SITE_URL = 'https://thelifeplace.org';
const CONTACT_EMAIL = 'hello@thelifeplace.org';
const WHATSAPP_URL = 'https://wa.me/27765639460?text=Hi%20The%20Life%20Place%2C%20I%27d%20love%20to%20get%20in%20touch.';
const MAPS_APP_URL = 'https://maps.app.goo.gl/kWtzKtuyASu3qRxo7';
const YOUTUBE_CHANNEL_ID = 'UC2f4d_FFU4HiTT_DiPhZwvw';
const YOUTUBE_CHANNEL_URL = `https://www.youtube.com/channel/${YOUTUBE_CHANNEL_ID}`;
const YOUTUBE_CHANNEL_LIVE_URL = `${YOUTUBE_CHANNEL_URL}/live`;
const YOUTUBE_EMBED_URL = `https://www.youtube.com/embed/live_stream?channel=${YOUTUBE_CHANNEL_ID}`;
const SUBSTACK_URL = 'https://schulteretyang.substack.com';

function nextSundayAt(hour: number, minute: number, weeksAhead = 0) {
  const now = new Date();
  const next = new Date(now);
  const daysUntilSunday = (7 - now.getDay()) % 7 || 7;
  next.setDate(now.getDate() + daysUntilSunday + weeksAhead * 7);
  next.setHours(hour, minute, 0, 0);
  return next;
}

function addHours(value: Date, hours: number) {
  const copy = new Date(value);
  copy.setHours(copy.getHours() + hours);
  return copy;
}

export const FALLBACK_BOOTSTRAP: BootstrapPayload = {
  generatedAt: new Date().toISOString(),
  features: {
    ministriesEnabled: true,
    messagesEnabled: true,
  },
  site: {
    name: 'The Life Place',
    tagline: 'Come. See. Jesus.',
    siteUrl: SITE_URL,
  },
  contact: {
    email: CONTACT_EMAIL,
    whatsapp: WHATSAPP_URL,
  },
  socials: {
    facebook: 'https://facebook.com/thelifeplacesa',
    instagram: 'https://instagram.com/thelifeplacesa',
    youtube: 'https://youtube.com/@thelifeplacesa',
    spotify: 'https://open.spotify.com/show/31hbtgq5cvmqr4tyzs2faygvrzaa?si=61b073370e034f21',
    applePodcasts: 'https://podcasts.apple.com/us/podcast/the-life-place/id1816955719',
  },
  location: {
    venue: 'The Life Place',
    fullAddress: '1251 Villa Monte Catini, 1 Elm Avenue, Craigavon AH, Sandton, 2191',
    address: {
      line1: '1251 Villa Monte Catini',
      line2: '1 Elm Avenue',
      line3: 'Craigavon AH, Sandton',
      line4: '2191, South Africa',
    },
    mapsQueryUrl: MAPS_APP_URL,
    appleMapsUrl: 'https://maps.apple.com/?q=1251%20Villa%20Monte%20Catini%201%20Elm%20Avenue%20Craigavon%20AH%20Sandton',
    wazeUrl: 'https://waze.com/ul?ll=-26.0375,28.0168&navigate=yes',
  },
  schedule: {
    timezone: 'Africa/Johannesburg',
    services: [
      {
        id: 'sunday-service',
        day: 'Sunday',
        label: 'Sunday 9:00-11:00',
        startTime: '09:00',
        endTime: '11:00',
        description: 'Join us for worship, prayer, community, and the good news of Jesus.',
      },
    ],
  },
  live: {
    youtubeChannelId: YOUTUBE_CHANNEL_ID,
    youtubeChannelUrl: YOUTUBE_CHANNEL_URL,
    youtubeChannelLiveUrl: YOUTUBE_CHANNEL_LIVE_URL,
    youtubeEmbedUrl: YOUTUBE_EMBED_URL,
  },
  giving: {
    bank: {
      accountName: 'The Life Place',
      bankName: 'Standard Bank',
      accountNumber: '301524351',
      branchCode: '051001',
      accountType: 'Current',
      swift: 'SBZAZAJJ',
      referenceHint: 'Tithe / Offering / Your name',
    },
    snapscan: {
      url: 'https://pos.snapscan.io/qr/VISFNLkM',
      qrImagePath: '/snapscan.png',
    },
    paypal: {
      donateUrl: 'https://www.paypal.com/donate?hosted_button_id=4L3NWWAZ9PPV6',
    },
    annualReport: {
      pagePath: `mailto:${CONTACT_EMAIL}?subject=Annual%20Financial%20Report%20Request`,
      pdfPath: '',
      label: 'Request the report',
    },
  },
  links: {
    siteUrl: SITE_URL,
    blogUrl: SUBSTACK_URL,
    visitPath: '/visit/',
    givePath: '/give/',
    livePath: '/live/',
    messagesPath: '/messages',
    appPath: '/app',
    prayerPath: '/prayer/',
    eventsPath: '/events',
    devotionalsPath: '/devotionals',
    privacyPath: '/privacy-policy/',
    termsPath: '/terms/',
    beliefsPath: '/what-we-believe/',
    annualReportPath: '/give/',
  },
  app: {},
  welcome: {
    title: 'Welcome to The Life Place',
    lines: [
      'Come. See. Jesus.',
      'Jesus the Embracer of the weary and uncertain.',
      'Jesus the Defender of the vulnerable and overlooked.',
      'Jesus the Justifier of sinners by grace alone.',
      'Jesus the Friend who stays close and kind.',
    ],
    slogan: 'Come. See. Jesus.',
  },
  about: {
    title: 'What We Do',
    missionTitle: 'Come. See. Jesus.',
    missionBody: 'We gather around the beauty, gentleness, and kindness of Jesus and invite others to do the same.',
    missionSupport:
      'We are building a church where every gathering, conversation, and act of service helps people see how true, good, beautiful, and kind Jesus is.',
    values: [
      {
        id: 'scripture',
        title: 'Scripture',
        body: 'We believe the Bible opens our eyes to Jesus and shapes the way we live, worship, and love.',
      },
      {
        id: 'community',
        title: 'Community',
        body: 'We want The Life Place to feel like home: warm, honest, grace-filled, and centered on Jesus.',
      },
      {
        id: 'generosity',
        title: 'Generosity',
        body: 'We give because Jesus has given Himself for us, and His generosity reshapes our lives.',
      },
      {
        id: 'mission',
        title: 'Mission',
        body: 'We exist to help more people come, see, and know Jesus in Sandton and beyond.',
      },
    ],
  },
  ministries: [
    {
      slug: 'bring-them-to-jesus',
      title: 'Bring Them to Jesus',
      summary: 'A child dedication journey for parents who want to place their children before Jesus with faith and encouragement.',
      body: [
        'This program is designed for parents who desire to have their children dedicated, young or grown.',
        'It is a Jesus-centered dedication journey with encouragement, practical help for parenting, and friendship with other families.',
        'The course runs for two weeks across two ninety-minute sessions and points households toward a lifelong commitment to raising children in the beauty of Jesus.',
      ],
    },
    {
      slug: 'faith-and-work',
      title: 'Faith & Work',
      summary: 'Equipping believers to integrate faith with work, calling, and everyday responsibility.',
      body: [
        'Faith and Work helps believers think about vocation through the lens of Jesus.',
        'This expression is being prepared and sign-ups will open when dates are announced.',
      ],
    },
    {
      slug: 'this-gen',
      title: 'thisgen',
      summary: 'A youth expression where this generation can come, see Jesus, grow in faith, and build lasting friendships.',
      body: [
        'thisgen is our youth expression at The Life Place.',
        'It is a space for young people to grow in faith, build real friendships, and discover purpose for the glory of Jesus and the good of the world.',
      ],
    },
    {
      slug: 'institute',
      title: 'The Life Place Institute',
      summary: 'A discipleship and leadership hub focused on teaching, formation, and training.',
      body: [
        'The Life Place Institute is a developing hub for discipleship, teaching, and leadership training.',
        'It is launching soon and will help people grow in clarity, maturity, and service around Jesus.',
      ],
    },
    {
      slug: 'kids',
      title: 'Kids',
      summary: 'A warm and safe space for children to hear about Jesus, grow in joy, and be cared for well.',
      body: [
        'Our kids expression exists to help children know the kindness of Jesus in age-appropriate ways.',
        'We want families to feel supported while children are welcomed, loved, and formed in the gospel.',
      ],
    },
    {
      slug: 'new-members',
      title: 'Vision Night',
      summary: 'A special gathering for people who are new and want to understand the heart and direction of The Life Place.',
      body: [
        'Vision Night is where we share who we are, why we exist, and where Jesus is leading us.',
        'It is a simple way to understand the heart of The Life Place and how you can be part of this grace-filled journey.',
      ],
    },
    {
      slug: 'premarital-counseling',
      title: 'Premarital Counselling',
      summary: 'Christ-centered preparation for couples who want to build a marriage on grace, wisdom, and the finished work of Jesus.',
      body: [
        'We are preparing resources to help couples build Christ-centered marriages.',
        'This ministry is launching soon and sign-ups will open when dates are announced.',
      ],
    },
    {
      slug: 'relief-center',
      title: 'Relief Center',
      summary: 'Practical care for people in need through compassionate support, distribution, and community help.',
      body: [
        'The Relief Center exists to extend the love of Jesus to people in need through food distribution, care programs, and practical help in times of crisis.',
        'We want to serve our community with compassion, dignity, and tangible care.',
      ],
    },
  ],
  devotionals: [
    {
      id: 'dev-1',
      title: 'Jesus Is Gentle',
      scripture: 'Matthew 11:28',
      reference: 'Matthew 11:28-30',
      body: [
        'Jesus does not meet weary people with irritation. He meets them with rest.',
        'The invitation of Jesus is not to perform for Him, but to come to Him.',
      ],
      prayer: 'Jesus, teach me to come to You honestly and receive Your rest.',
      action: 'Pause today and hand one burden to Jesus by name.',
    },
    {
      id: 'dev-2',
      title: 'Grace Holds You',
      scripture: 'Romans 8:1',
      reference: 'Romans 8:1',
      body: [
        'The gospel does not leave us under accusation. In Christ there is no condemnation.',
        'When shame speaks loudly, Jesus answers more loudly with His finished work.',
      ],
      prayer: 'Father, anchor me in the freedom that is mine in Christ.',
      action: 'Replace one condemning thought today with the truth of the gospel.',
    },
    {
      id: 'dev-3',
      title: 'See Jesus Clearly',
      scripture: 'Hebrews 12:2',
      reference: 'Hebrews 12:2',
      body: [
        'Spiritual clarity grows when we look again at Jesus.',
        'We do not outgrow the need to behold Him. We are changed as we see Him.',
      ],
      prayer: 'Holy Spirit, turn my attention back to Jesus today.',
      action: 'Read one Gospel passage slowly and notice what it reveals about Jesus.',
    },
    {
      id: 'dev-4',
      title: 'Love In Practice',
      scripture: 'Galatians 5:6',
      reference: 'Galatians 5:6',
      body: [
        'Faith works through love. The grace of Jesus always moves toward people.',
        'Ordinary acts of kindness can become clear witnesses to the heart of Jesus.',
      ],
      prayer: 'Jesus, make my faith visible through love today.',
      action: 'Do one practical act of care for someone near you.',
    },
  ],
};

export const FALLBACK_MESSAGES: MessageItem[] = [
  {
    id: 'foundations-spirit-filled-life',
    title: 'Foundations — The Spirit-Filled Life',
    preacher: 'Genevieve Etyang',
    series: 'Foundations',
    date: '2025-02-09',
    videoSource: 'youtube',
    youtubeId: '9bZkp7q19f0',
    thumbnail: 'https://img.youtube.com/vi/9bZkp7q19f0/hqdefault.jpg',
    description: 'A foundational message on the Spirit-filled life.',
  },
  {
    id: 'jesus-our-life-part-1',
    title: 'Jesus Our Life — Part 1',
    preacher: 'Schulter Etyang',
    series: 'Jesus Our Life',
    date: '2025-02-02',
    videoSource: 'youtube',
    youtubeId: 'dQw4w9WgXcQ',
    thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
    description: 'A message centered on Jesus as our life and source.',
  },
  {
    id: 'vision-sunday-2025',
    title: 'Vision Sunday 2025 — Come. See. Jesus',
    preacher: 'Schulter Etyang',
    series: 'Vision Sunday',
    date: '2025-01-12',
    videoSource: 'youtube',
    videoUrl: YOUTUBE_CHANNEL_URL,
    thumbnail: `${SITE_URL}/images/messages/default-thumb.png`,
    description: 'A vision message about the heart and direction of The Life Place.',
  },
  {
    id: 'kingdom-mindset-guest-message',
    title: 'Kingdom Mindset — Guest Message',
    preacher: 'Guest Speaker',
    series: 'Guest Messages',
    date: '2025-03-01',
    videoSource: 'youtube',
    videoUrl: YOUTUBE_CHANNEL_LIVE_URL,
    thumbnail: `${SITE_URL}/images/messages/default-thumb.png`,
    description: 'Living with a kingdom-first perspective.',
  },
];

export function buildFallbackEvents(): EventItem[] {
  const first = nextSundayAt(9, 0, 0);
  const second = nextSundayAt(9, 0, 1);
  const third = nextSundayAt(9, 0, 2);

  return [first, second, third].map((start, index) => ({
    id: `sunday-service-${index + 1}`,
    start: start.toISOString(),
    end: addHours(start, 2).toISOString(),
    summary: 'Sunday Worship Service',
    location: FALLBACK_BOOTSTRAP.location.fullAddress,
    description: 'Join us for worship, prayer, community, and the good news of Jesus.',
    source: 'fallback',
  }));
}

export function buildFallbackLive() {
  return {
    live: false,
    status: 'offline',
    watchUrl: YOUTUBE_CHANNEL_LIVE_URL,
    embedUrl: YOUTUBE_EMBED_URL,
    channelUrl: YOUTUBE_CHANNEL_URL,
    youtubeChannelId: YOUTUBE_CHANNEL_ID,
    checkedAt: new Date().toISOString(),
    service: FALLBACK_BOOTSTRAP.schedule.services[0],
  };
}

export const FALLBACK_BLOG_FEED: { items: BlogItem[] } = {
  items: [
    {
      title: 'Two Kinds of Shepherds: Those Who Drive You From the Well, and the Shepherd Who Defends and Waters.',
      link: 'https://schulteretyang.substack.com/p/two-kinds-of-shepherds-those-who',
      date: '2026-03-12',
      excerpt: 'A reflection on false shepherding and the tenderness of Jesus.',
    },
    {
      title: 'On why I struggle to sing surrender and desperate songs.',
      link: 'https://schulteretyang.substack.com/p/on-why-i-struggle-to-sing-surrender',
      date: '2026-03-04',
      excerpt: 'A reflection on surrender, honesty, and the language we use in worship.',
    },
    {
      title: 'Wrestling with Worship on Camera: A Personal Reflection',
      link: 'https://schulteretyang.substack.com/p/wrestling-with-worship-on-camera',
      date: '2026-02-24',
      excerpt: 'A personal reflection on cameras, worship, and what public presence does to the heart.',
    },
    {
      title: 'On Abraham, Isaac, and Jacob’s sinful lives and the grace that covered them.',
      link: 'https://schulteretyang.substack.com/p/on-abraham-isaac-and-jacobs-sinful',
      date: '2026-02-12',
      excerpt: 'A meditation on grace, weakness, and the strange mercy of God.',
    },
    {
      title: 'Why preaching on sin and against sinning is the easy road preachers take.',
      link: 'https://schulteretyang.substack.com/p/why-preaching-on-sin-and-against',
      date: '2026-02-07',
      excerpt: 'A challenge to preach Jesus more clearly than moralism.',
    },
  ],
};
