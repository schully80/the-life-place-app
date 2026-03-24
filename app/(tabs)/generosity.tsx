import { useState } from 'react';
import {
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useBootstrap } from '~/hooks/useBootstrap';
import { getCanonicalContactEmail, toAbsoluteSiteUrl } from '~/lib/contentApi';
import AppIcon from '~/components/AppIcon';
import PageSlogan from '~/components/PageSlogan';
import { HOME_STYLES, type HomeStyle } from '~/lib/homeDesignStyles';

const FAQS = [
  {
    id: 'secure',
    question: 'Is my donation secure?',
    answer:
      'Yes. All online giving platforms we use are secure and encrypted, and we do not store your card or banking details in the app.',
  },
  {
    id: 'receipt',
    question: 'Will I receive a confirmation or receipt?',
    answer:
      'Yes. Online giving providers send their own confirmation. If you need a formal receipt or extra help, contact us and we will assist.',
  },
  {
    id: 'anonymous',
    question: 'Can I give anonymously?',
    answer:
      'Yes. You are welcome to give anonymously. Our goal is not to track people, but to steward generosity faithfully.',
  },
  {
    id: 'international',
    question: 'Can I give if I live outside South Africa?',
    answer:
      'Yes. PayPal is the best option for international giving and is available directly from this screen.',
  },
  {
    id: 'stewardship',
    question: 'How are donations used?',
    answer:
      'Gifts support the ministry, mission, gatherings, pastoral care, and practical needs of The Life Place.',
  },
];

type GivingMethod = 'eft' | 'snapscan' | 'paypal';

export default function Generosity() {
  const theme = HOME_STYLES.find((style) => style.id === 'glass') ?? HOME_STYLES[0];
  const { data, loading, error } = useBootstrap();
  const [activeMethod, setActiveMethod] = useState<GivingMethod>('eft');
  const [openFaqId, setOpenFaqId] = useState<string | null>(FAQS[0].id);

  if (loading) {
    return (
      <ScreenShell theme={theme}>
        <StateCard
          theme={theme}
          title="Loading generosity details"
          body="Pulling in the giving methods and support information."
        />
      </ScreenShell>
    );
  }

  if (error || !data) {
    return (
      <ScreenShell theme={theme}>
        <StateCard
          theme={theme}
          title="Generosity unavailable"
          body={error || 'Unable to load giving details.'}
        />
      </ScreenShell>
    );
  }

  const { bank, snapscan, paypal, annualReport } = data.giving;
  const supportEmail = getCanonicalContactEmail(data.contact.email);

  return (
    <ScreenShell theme={theme}>
      <View
        style={[
          styles.hero,
          {
            borderColor: theme.heroBorder,
            shadowColor: theme.shadow,
          },
        ]}
      >
        <LinearGradient colors={theme.heroGradient} style={StyleSheet.absoluteFill} />
        <View style={[styles.heroGlowLeft, { backgroundColor: theme.orbTop }]} />
        <View style={[styles.heroGlowRight, { backgroundColor: theme.orbMiddle }]} />
        <View style={styles.heroInner}>
          <Text style={styles.heroTitle}>
            YOUR GENEROSITY CREATES MORE OPPORTUNITIES AND RESOURCES SO OTHERS CAN{' '}
            <Text style={[styles.heroAccent, { color: theme.accent }]}>COME. SEE. JESUS.</Text>
          </Text>
        </View>
      </View>

      <View style={styles.content}>
        <GlassCard theme={theme} style={styles.methodsCard}>
          <Text style={[styles.methodsIntro, { color: theme.textSecondary }]}>
            Below is a simple, guided way to give generously, step by step.
          </Text>

          <View style={styles.methodTabs}>
            <MethodTab
              label="EFT"
              active={activeMethod === 'eft'}
              theme={theme}
              onPress={() => setActiveMethod('eft')}
            />
            <MethodTab
              label="SnapScan"
              active={activeMethod === 'snapscan'}
              theme={theme}
              onPress={() => setActiveMethod('snapscan')}
            />
            <MethodTab
              label="PayPal"
              active={activeMethod === 'paypal'}
              theme={theme}
              onPress={() => setActiveMethod('paypal')}
            />
          </View>

          {activeMethod === 'eft' ? (
            <View
              style={[
                styles.methodPanel,
                {
                  backgroundColor: theme.cardAlt,
                  borderColor: theme.borderStrong,
                },
              ]}
            >
              <View
                style={[
                  styles.methodIconWrap,
                  {
                    backgroundColor: theme.accentSoft,
                    borderColor: theme.borderStrong,
                  },
                ]}
              >
                <AppIcon name="laptop" size={28} color={theme.accent} />
              </View>
              <Text style={[styles.methodTitle, { color: theme.textPrimary }]}>EFT (Bank Transfer)</Text>
              <View style={[styles.detailList, styles.detailListCentered]}>
                <DetailRow theme={theme} label="Bank" value={bank.bankName} centered />
                <DetailRow theme={theme} label="Account" value={bank.accountName} centered />
                <DetailRow theme={theme} label="Number" value={bank.accountNumber} centered />
                <DetailRow theme={theme} label="Branch" value={bank.branchCode} centered />
                <DetailRow theme={theme} label="Type" value={bank.accountType} centered />
                <DetailRow theme={theme} label="SWIFT" value={bank.swift} centered />
              </View>
              <Text style={[styles.referenceText, { color: theme.textSecondary }]}>
                Reference: {bank.referenceHint}
              </Text>
            </View>
          ) : null}

          {activeMethod === 'snapscan' ? (
            <TouchableOpacity
              style={[
                styles.methodPanel,
                {
                  backgroundColor: theme.cardAlt,
                  borderColor: theme.borderStrong,
                },
              ]}
              activeOpacity={0.9}
              onPress={() => Linking.openURL(snapscan.url)}
            >
              <View
                style={[
                  styles.methodIconWrap,
                  {
                    backgroundColor: theme.accentSoft,
                    borderColor: theme.borderStrong,
                  },
                ]}
              >
                <AppIcon name="mobile-screen" size={28} color={theme.accent} />
              </View>
              <Text style={[styles.methodTitle, { color: theme.textPrimary }]}>SnapScan</Text>
              <Text style={[styles.methodCopy, { color: theme.textSecondary }]}>
                Scan the QR code or tap below to give instantly.
              </Text>
              <Image
                source={require('../../assets/giving/snapscan.png')}
                style={styles.qrCode}
                resizeMode="contain"
              />
              <View
                style={[
                  styles.primaryAction,
                  {
                    backgroundColor: theme.accentSoft,
                    borderColor: theme.borderStrong,
                  },
                ]}
              >
                <Text style={[styles.primaryActionText, { color: theme.textPrimary }]}>
                  Give via SnapScan
                </Text>
              </View>
            </TouchableOpacity>
          ) : null}

          {activeMethod === 'paypal' ? (
            <TouchableOpacity
              style={[
                styles.methodPanel,
                {
                  backgroundColor: theme.cardAlt,
                  borderColor: theme.borderStrong,
                },
              ]}
              activeOpacity={0.9}
              onPress={() => Linking.openURL(paypal.donateUrl)}
            >
              <View
                style={[
                  styles.methodIconWrap,
                  {
                    backgroundColor: theme.accentSoft,
                    borderColor: theme.borderStrong,
                  },
                ]}
              >
                <AppIcon name="paypal" size={28} color={theme.accent} />
              </View>
              <Text style={[styles.methodTitle, { color: theme.textPrimary }]}>PayPal</Text>
              <Text style={[styles.methodSubtitle, { color: theme.accent }]}>
                International Giving
              </Text>
              <Text style={[styles.methodCopy, { color: theme.textSecondary }]}>
                If you are giving from outside South Africa, PayPal is the simplest option.
              </Text>
              <View
                style={[
                  styles.primaryAction,
                  {
                    backgroundColor: theme.accentSoft,
                    borderColor: theme.borderStrong,
                  },
                ]}
              >
                <Text style={[styles.primaryActionText, { color: theme.textPrimary }]}>
                  Give via PayPal
                </Text>
              </View>
            </TouchableOpacity>
          ) : null}
        </GlassCard>

        <GlassCard theme={theme} style={styles.reassuranceCard}>
          <View
            style={[
              styles.reassuranceIconWrap,
              {
                backgroundColor: theme.accentSoft,
                borderColor: theme.borderStrong,
              },
            ]}
          >
            <AppIcon name="hand-holding-heart" size={28} color={theme.accent} />
          </View>
          <Text style={[styles.reassuranceCopy, { color: theme.textPrimary }]}>
            While we encourage online giving for security and simplicity, we gladly receive in-person
            gifts during our weekend gatherings.
          </Text>
        </GlassCard>

        <GlassCard theme={theme} style={styles.reportCard}>
          <View
            style={[
              styles.reportIconWrap,
              {
                backgroundColor: theme.accentSoft,
                borderColor: theme.borderStrong,
              },
            ]}
          >
            <AppIcon name="file-lines" size={24} color={theme.accent} />
          </View>
          <Text style={[styles.reportTitle, { color: theme.textPrimary }]}>Annual Financial Report</Text>
          <Text style={[styles.reportCopy, { color: theme.textSecondary }]}>
            We value transparency and faithful stewardship. This report reflects how generosity is
            handled with care to serve the mission of The Life Place.
          </Text>
          <Text style={[styles.reportContact, { color: theme.textSecondary }]}>
            To receive this report, contact us at
          </Text>
          <View
            style={[
              styles.emailLinkButton,
              {
                backgroundColor: theme.cardAlt,
                borderColor: theme.borderStrong,
              },
            ]}
          >
            <Text style={[styles.inlineLink, { color: theme.accent }]}>{supportEmail}</Text>
          </View>
        </GlassCard>

        <GlassCard theme={theme} style={styles.faqSection}>
          <Text style={[styles.faqHeading, { color: theme.textPrimary }]}>GIVING FAQS</Text>
          <Text style={[styles.faqIntro, { color: theme.textSecondary }]}>
            Common questions about giving at The Life Place.
          </Text>

          <View style={styles.faqList}>
            {FAQS.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <View
                  key={faq.id}
                  style={[
                    styles.faqCard,
                    {
                      backgroundColor: theme.cardAlt,
                      borderColor: theme.borderStrong,
                    },
                  ]}
                >
                  <TouchableOpacity
                    style={styles.faqButton}
                    activeOpacity={0.85}
                    onPress={() => setOpenFaqId(isOpen ? null : faq.id)}
                  >
                    <Text style={[styles.faqQuestion, { color: theme.textPrimary }]}>
                      {faq.question}
                    </Text>
                    <AppIcon
                      name={isOpen ? 'chevron-up' : 'chevron-down'}
                      size={20}
                      color={theme.textSecondary}
                    />
                  </TouchableOpacity>
                  {isOpen ? (
                    <Text style={[styles.faqAnswer, { color: theme.textSecondary }]}>
                      {faq.answer}
                      {faq.id === 'receipt' ? (
                        <>
                          {' '}
                          Email{' '}
                          <Text style={[styles.inlineLink, { color: theme.accent }]}>{supportEmail}</Text>
                          .
                        </>
                      ) : null}
                    </Text>
                  ) : null}
                </View>
              );
            })}
          </View>

          <Text style={[styles.faqFooter, { color: theme.textSecondary }]}>
            Still have questions? We&apos;re happy to help at{' '}
            <Text style={[styles.inlineLink, { color: theme.accent }]}>{supportEmail}</Text>.
          </Text>
        </GlassCard>
      </View>
    </ScreenShell>
  );
}

function ScreenShell({
  theme,
  children,
}: {
  theme: HomeStyle;
  children: React.ReactNode;
}) {
  return (
    <View style={styles.screen}>
      <LinearGradient colors={theme.pageGradient} style={StyleSheet.absoluteFill} />
      <BackgroundDecor theme={theme} />
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {children}
        <PageSlogan inverse />
      </ScrollView>
    </View>
  );
}

function BackgroundDecor({ theme }: { theme: HomeStyle }) {
  return (
    <>
      <View style={[styles.orbTop, { backgroundColor: theme.orbTop }]} />
      <View style={[styles.orbMiddle, { backgroundColor: theme.orbMiddle }]} />
      <View style={[styles.orbBottom, { backgroundColor: theme.orbBottom }]} />
    </>
  );
}

function GlassCard({
  theme,
  style,
  children,
}: {
  theme: HomeStyle;
  style?: object;
  children: React.ReactNode;
}) {
  return (
    <View
      style={[
        styles.glassCard,
        style,
        {
          backgroundColor: theme.card,
          borderColor: theme.borderStrong,
          shadowColor: theme.shadow,
        },
      ]}
    >
      {children}
    </View>
  );
}

function MethodTab({
  label,
  active,
  theme,
  onPress,
}: {
  label: string;
  active: boolean;
  theme: HomeStyle;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      style={[
        styles.methodTab,
        {
          backgroundColor: active ? theme.pillActive : theme.cardAlt,
          borderColor: active ? theme.accent : theme.borderStrong,
        },
      ]}
      onPress={onPress}
      activeOpacity={0.88}
    >
      <Text
        style={[
          styles.methodTabText,
          {
            color: active ? theme.textPrimary : theme.textSecondary,
          },
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

function DetailRow({
  theme,
  label,
  value,
  centered = false,
}: {
  theme: HomeStyle;
  label: string;
  value: string;
  centered?: boolean;
}) {
  return (
    <View style={[styles.detailRow, centered ? styles.detailRowCentered : null]}>
      <Text style={[styles.detailLabel, centered ? styles.detailTextCentered : null, { color: theme.textPrimary }]}>
        {label}
      </Text>
      <Text style={[styles.detailValue, centered ? styles.detailTextCentered : null, { color: theme.textSecondary }]}>
        {value}
      </Text>
    </View>
  );
}

function StateCard({
  theme,
  title,
  body,
}: {
  theme: HomeStyle;
  title: string;
  body: string;
}) {
  return (
    <GlassCard theme={theme} style={styles.stateCard}>
      <Text style={[styles.stateTitle, { color: theme.textPrimary }]}>{title}</Text>
      <Text style={[styles.stateText, { color: theme.textSecondary }]}>{body}</Text>
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#07111F',
  },
  container: {
    paddingBottom: 48,
  },
  hero: {
    overflow: 'hidden',
    minHeight: 248,
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 38,
    borderWidth: 1,
    justifyContent: 'center',
    shadowOpacity: 0.18,
    shadowRadius: 22,
    shadowOffset: { width: 0, height: 12 },
    elevation: 8,
  },
  heroInner: {
    paddingHorizontal: 24,
    paddingVertical: 34,
    alignItems: 'center',
  },
  heroGlowLeft: {
    position: 'absolute',
    top: -70,
    left: -74,
    width: 220,
    height: 220,
    borderRadius: 110,
  },
  heroGlowRight: {
    position: 'absolute',
    right: -62,
    bottom: -82,
    width: 228,
    height: 228,
    borderRadius: 114,
  },
  heroTitle: {
    maxWidth: 340,
    fontFamily: 'Montserrat-Bold',
    fontSize: 28,
    lineHeight: 36,
    color: '#F8FBFF',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  heroAccent: {
    textShadowRadius: 0,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 22,
    gap: 18,
  },
  glassCard: {
    borderRadius: 30,
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 22,
    shadowOpacity: 0.16,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 12 },
    elevation: 6,
  },
  methodsCard: {
    gap: 18,
  },
  methodsIntro: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 17,
    lineHeight: 27,
    textAlign: 'center',
  },
  methodTabs: {
    gap: 10,
  },
  methodTab: {
    borderRadius: 18,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  methodTabText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
    textAlign: 'center',
  },
  methodPanel: {
    borderRadius: 26,
    borderWidth: 1,
    paddingHorizontal: 18,
    paddingVertical: 20,
    alignItems: 'center',
  },
  methodIconWrap: {
    width: 58,
    height: 58,
    borderRadius: 18,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  methodTitle: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 24,
    lineHeight: 30,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  methodSubtitle: {
    marginTop: 10,
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  methodCopy: {
    marginTop: 12,
    fontFamily: 'Montserrat-Regular',
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
  },
  detailList: {
    width: '100%',
    marginTop: 18,
    gap: 10,
  },
  detailListCentered: {
    alignItems: 'center',
  },
  detailRow: {
    gap: 4,
  },
  detailRowCentered: {
    alignItems: 'center',
  },
  detailLabel: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 14,
  },
  detailValue: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 15,
    lineHeight: 22,
  },
  detailTextCentered: {
    textAlign: 'center',
  },
  referenceText: {
    marginTop: 16,
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
  },
  qrCode: {
    width: 180,
    height: 180,
    marginTop: 18,
  },
  primaryAction: {
    marginTop: 18,
    borderRadius: 18,
    borderWidth: 1,
    paddingHorizontal: 18,
    paddingVertical: 12,
  },
  primaryActionText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 15,
  },
  reassuranceCard: {
    alignItems: 'center',
  },
  reassuranceIconWrap: {
    width: 58,
    height: 58,
    borderRadius: 18,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  reassuranceCopy: {
    maxWidth: 330,
    fontFamily: 'Montserrat-Regular',
    fontSize: 20,
    lineHeight: 30,
    textAlign: 'center',
  },
  reportCard: {
    alignItems: 'center',
  },
  reportIconWrap: {
    width: 56,
    height: 56,
    borderRadius: 18,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  reportTitle: {
    marginTop: 12,
    fontFamily: 'Montserrat-Bold',
    fontSize: 28,
    lineHeight: 34,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  reportCopy: {
    marginTop: 14,
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
    lineHeight: 25,
    textAlign: 'center',
  },
  reportContact: {
    marginTop: 14,
    fontFamily: 'Montserrat-Regular',
    fontSize: 15,
    lineHeight: 24,
    textAlign: 'center',
  },
  emailLinkButton: {
    marginTop: 10,
    borderRadius: 18,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  faqSection: {
    gap: 12,
  },
  faqHeading: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 30,
    lineHeight: 36,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  faqIntro: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
  },
  faqList: {
    marginTop: 6,
    gap: 12,
  },
  faqCard: {
    borderRadius: 24,
    borderWidth: 1,
    paddingHorizontal: 18,
    paddingVertical: 16,
  },
  faqButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
  },
  faqQuestion: {
    flex: 1,
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
    lineHeight: 22,
  },
  faqAnswer: {
    marginTop: 12,
    fontFamily: 'Montserrat-Regular',
    fontSize: 15,
    lineHeight: 24,
  },
  faqFooter: {
    marginTop: 6,
    fontFamily: 'Montserrat-Regular',
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
  },
  inlineLink: {
    fontFamily: 'Montserrat-SemiBold',
  },
  stateCard: {
    marginHorizontal: 20,
    marginTop: 24,
    alignItems: 'center',
  },
  stateTitle: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 18,
    textAlign: 'center',
  },
  stateText: {
    marginTop: 8,
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    lineHeight: 21,
    textAlign: 'center',
  },
  orbTop: {
    position: 'absolute',
    top: 72,
    left: -58,
    width: 220,
    height: 220,
    borderRadius: 110,
  },
  orbMiddle: {
    position: 'absolute',
    top: 360,
    right: -70,
    width: 228,
    height: 228,
    borderRadius: 114,
  },
  orbBottom: {
    position: 'absolute',
    bottom: 110,
    left: 36,
    width: 196,
    height: 196,
    borderRadius: 98,
  },
});
