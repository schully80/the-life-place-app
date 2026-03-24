import { ActionSheetIOS, Alert, Linking, Platform } from 'react-native';

type OpenExternalOptions = {
  label?: string;
  failureTitle?: string;
  failureMessage?: string;
};

type OpenMailOptions = {
  subject?: string;
  body?: string;
  failureTitle?: string;
  failureMessage?: string;
};

function buildQueryParams(subject?: string, body?: string) {
  const params: string[] = [];

  if (subject) {
    params.push(`subject=${encodeURIComponent(subject)}`);
  }

  if (body) {
    params.push(`body=${encodeURIComponent(body)}`);
  }

  return params;
}

async function openGmailCompose(email: string, subject?: string, body?: string) {
  const gmailAppParams = [`to=${encodeURIComponent(email)}`];
  const gmailWebParams = [`view=cm`, `fs=1`, `tf=1`, `to=${encodeURIComponent(email)}`];

  if (subject) {
    const encoded = encodeURIComponent(subject);
    gmailAppParams.push(`subject=${encoded}`);
    gmailWebParams.push(`su=${encoded}`);
  }

  if (body) {
    const encoded = encodeURIComponent(body);
    gmailAppParams.push(`body=${encoded}`);
    gmailWebParams.push(`body=${encoded}`);
  }

  try {
    await Linking.openURL(`googlegmail://co?${gmailAppParams.join('&')}`);
    return true;
  } catch {
    return openExternalUrl(`https://mail.google.com/mail/?${gmailWebParams.join('&')}`, {
      label: 'Gmail',
      failureTitle: 'Mail app unavailable',
      failureMessage: `Email us at ${email}`,
    });
  }
}

async function openOutlookCompose(email: string, subject?: string, body?: string) {
  const outlookAppParams = [`to=${encodeURIComponent(email)}`];
  const outlookWebParams = [`to=${encodeURIComponent(email)}`];

  if (subject) {
    const encoded = encodeURIComponent(subject);
    outlookAppParams.push(`subject=${encoded}`);
    outlookWebParams.push(`subject=${encoded}`);
  }

  if (body) {
    const encoded = encodeURIComponent(body);
    outlookAppParams.push(`body=${encoded}`);
    outlookWebParams.push(`body=${encoded}`);
  }

  try {
    await Linking.openURL(`ms-outlook://compose?${outlookAppParams.join('&')}`);
    return true;
  } catch {
    return openExternalUrl(`https://outlook.office.com/mail/deeplink/compose?${outlookWebParams.join('&')}`, {
      label: 'Outlook',
      failureTitle: 'Mail app unavailable',
      failureMessage: `Email us at ${email}`,
    });
  }
}

async function copyEmailAddress(email: string) {
  try {
    const Clipboard = await import('expo-clipboard');
    await Clipboard.setStringAsync(email);
    Alert.alert('Email copied', email);
  } catch {
    Alert.alert('Copy unavailable', `Email us at ${email}`);
  }
}

function showMailFallbackSheet(email: string, options: OpenMailOptions) {
  const title = options.failureTitle ?? 'Mail app unavailable';
  const message = options.failureMessage ?? `Email us at ${email}`;

  const onGmail = () => {
    void openGmailCompose(email, options.subject, options.body);
  };
  const onOutlook = () => {
    void openOutlookCompose(email, options.subject, options.body);
  };
  const onCopy = () => {
    void copyEmailAddress(email);
  };

  if (Platform.OS === 'ios') {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        title,
        message,
        options: ['Cancel', 'Open Gmail', 'Open Outlook', 'Copy Email'],
        cancelButtonIndex: 0,
      },
      (buttonIndex) => {
        if (buttonIndex === 1) onGmail();
        if (buttonIndex === 2) onOutlook();
        if (buttonIndex === 3) onCopy();
      }
    );
    return;
  }

  Alert.alert(title, message, [
    { text: 'Cancel', style: 'cancel' },
    { text: 'Open Gmail', onPress: onGmail },
    { text: 'Open Outlook', onPress: onOutlook },
    { text: 'Copy Email', onPress: onCopy },
  ]);
}

export async function openExternalUrl(url: string, options: OpenExternalOptions = {}) {
  try {
    await Linking.openURL(url);
    return true;
  } catch {
    Alert.alert(
      options.failureTitle ?? 'Unable to open link',
      options.failureMessage ??
        `${options.label ?? 'This link'} could not be opened on this device.`
    );
    return false;
  }
}

export async function openMailApp(email: string, options: OpenMailOptions = {}) {
  const params = buildQueryParams(options.subject, options.body);

  const mailtoUrl = `mailto:${email}${params.length ? `?${params.join('&')}` : ''}`;

  try {
    await Linking.openURL(mailtoUrl);
    return true;
  } catch {
    showMailFallbackSheet(email, options);
    return false;
  }
}
