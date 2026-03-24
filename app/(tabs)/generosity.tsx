import { useState } from 'react';
import {
  Image,
  ImageBackground,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useBootstrap } from '~/hooks/useBootstrap';
import { toAbsoluteSiteUrl } from '~/lib/contentApi';
import AppIcon from '~/components/AppIcon';

const BRAND_RED = '#B3282D';
const INK = '#1F2937';
const MUTED = '#6B7280';
const SURFACE = '#F9FAFB';

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
  const { data, loading, error } = useBootstrap();
  const [activeMethod, setActiveMethod] = useState<GivingMethod>('eft');
  const [openFaqId, setOpenFaqId] = useState<string | null>(FAQS[0].id);

  if (loading) {
    return (
      <View style={styles.stateWrap}>
        <Text style={styles.stateText}>Loading generosity details…</Text>
      </View>
    );
  }

  if (error || !data) {
    return (
      <View style={styles.stateWrap}>
        <Text style={styles.stateTitle}>Generosity unavailable</Text>
        <Text style={styles.stateText}>{error || 'Unable to load giving details.'}</Text>
      </View>
    );
  }

  const { bank, snapscan, paypal, annualReport } = data.giving;
  const supportEmail = data.contact.email;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ImageBackground
        source={require('../../assets/community-give-2.jpg')}
        resizeMode="cover"
        style={styles.hero}
        imageStyle={styles.heroImage}
      >
        <View style={styles.heroOverlay} />
      </ImageBackground>

      <View style={styles.headerBlock}>
        <Text style={styles.heroTitle}>EXTRAVAGANT{'\n'}GENEROSITY</Text>
        <Text style={styles.heroCopy}>
          Generosity is our expression of who <Text style={styles.heroAccent}>Jesus</Text> is and
          what He does.
        </Text>
      </View>

      <View style={styles.impactBlock}>
        <Text style={styles.impactTitle}>
          Your generosity creates more opportunities and resources so others can
        </Text>
        <Text style={styles.impactAccent}>Come. See. Jesus</Text>
      </View>

      <View style={styles.methodsShell}>
        <Text style={styles.methodsIntro}>
          Below is a simple, guided way to give generously, step by step.
        </Text>

        <View style={styles.methodsCard}>
          <Text style={styles.stepLabel}>Step 3 · CHOOSE PAYMENT METHOD</Text>

          <View style={styles.methodTabs}>
            <MethodTab
              label="EFT"
              active={activeMethod === 'eft'}
              onPress={() => setActiveMethod('eft')}
            />
            <MethodTab
              label="SnapScan"
              active={activeMethod === 'snapscan'}
              onPress={() => setActiveMethod('snapscan')}
            />
            <MethodTab
              label="PayPal"
              active={activeMethod === 'paypal'}
              onPress={() => setActiveMethod('paypal')}
            />
          </View>

          {activeMethod === 'eft' ? (
            <View style={styles.methodPanel}>
              <View style={styles.methodIconWrap}>
                <AppIcon name="laptop" size={30} color={BRAND_RED} />
              </View>
              <Text style={styles.methodTitle}>EFT (Bank Transfer)</Text>
              <View style={styles.detailList}>
                <DetailRow label="Bank" value={bank.bankName} />
                <DetailRow label="Account" value={bank.accountName} />
                <DetailRow label="Number" value={bank.accountNumber} />
                <DetailRow label="Branch" value={bank.branchCode} />
                <DetailRow label="Type" value={bank.accountType} />
                <DetailRow label="SWIFT" value={bank.swift} />
              </View>
              <Text style={styles.referenceText}>Reference: {bank.referenceHint}</Text>
            </View>
          ) : null}

          {activeMethod === 'snapscan' ? (
            <TouchableOpacity
              style={styles.methodPanel}
              activeOpacity={0.9}
              onPress={() => Linking.openURL(snapscan.url)}
            >
              <View style={styles.methodIconWrap}>
                <AppIcon name="mobile-screen-button" size={30} color={BRAND_RED} />
              </View>
              <Text style={styles.methodTitle}>SnapScan</Text>
              <Text style={styles.methodCopy}>Scan the QR code or tap below to give instantly.</Text>
              <Image
                source={require('../../assets/giving/SnapCode.png')}
                style={styles.qrCode}
                resizeMode="contain"
              />
              <View style={styles.primaryAction}>
                <Text style={styles.primaryActionText}>Give via SnapScan</Text>
              </View>
            </TouchableOpacity>
          ) : null}

          {activeMethod === 'paypal' ? (
            <TouchableOpacity
              style={styles.methodPanel}
              activeOpacity={0.9}
              onPress={() => Linking.openURL(paypal.donateUrl)}
            >
              <View style={styles.methodIconWrap}>
                <AppIcon name="paypal" size={30} color={BRAND_RED} />
              </View>
              <Text style={styles.methodTitle}>PayPal</Text>
              <Text style={styles.methodSubtitle}>International Giving</Text>
              <Text style={styles.methodCopy}>
                If you are giving from outside South Africa, PayPal is the simplest option.
              </Text>
              <View style={styles.primaryAction}>
                <Text style={styles.primaryActionText}>Give via PayPal</Text>
              </View>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>

      <View style={styles.reassuranceBlock}>
        <Image
          source={require('../../assets/giving/hand-heart.png')}
          style={styles.reassuranceIcon}
          resizeMode="contain"
        />
        <Text style={styles.reassuranceCopy}>
          While we encourage online giving for security and simplicity, we gladly receive in-person
          gifts during our weekend gatherings.
        </Text>
      </View>

      <View style={styles.annualReportCard}>
        <View style={styles.reportIconWrap}>
          <AppIcon name="file-lines" size={28} color={BRAND_RED} />
        </View>
        <Text style={styles.annualReportTitle}>Annual Financial Report</Text>
        <Text style={styles.annualReportCopy}>
          We value transparency and faithful stewardship. This report reflects how generosity is
          handled with care to serve the mission of The Life Place.
        </Text>
        <Text style={styles.annualReportContact}>
          To receive this report, contact us at{' '}
          <Text style={styles.inlineLink} onPress={() => Linking.openURL(`mailto:${supportEmail}`)}>
            {supportEmail}
          </Text>
          .
        </Text>
        <TouchableOpacity
          style={styles.secondaryAction}
          activeOpacity={0.88}
          onPress={() => Linking.openURL(toAbsoluteSiteUrl(annualReport.pagePath))}
        >
          <Text style={styles.secondaryActionText}>{annualReport.label}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.faqSection}>
        <Text style={styles.faqHeading}>GIVING{'\n'}FAQS</Text>
        <Text style={styles.faqIntro}>Common questions about giving at The Life Place.</Text>

        <View style={styles.faqList}>
          {FAQS.map((faq) => {
            const isOpen = openFaqId === faq.id;
            return (
              <View key={faq.id} style={styles.faqCard}>
                <TouchableOpacity
                  style={styles.faqButton}
                  activeOpacity={0.85}
                  onPress={() => setOpenFaqId(isOpen ? null : faq.id)}
                >
                  <Text style={styles.faqQuestion}>{faq.question}</Text>
                  <AppIcon name={isOpen ? 'chevron-up' : 'chevron-down'} size={20} color="#9CA3AF" />
                </TouchableOpacity>
                {isOpen ? (
                  <Text style={styles.faqAnswer}>
                    {faq.answer}
                    {faq.id === 'receipt' ? (
                      <>
                        {' '}
                        Email{' '}
                        <Text
                          style={styles.inlineLink}
                          onPress={() => Linking.openURL(`mailto:${supportEmail}`)}
                        >
                          {supportEmail}
                        </Text>
                        .
                      </>
                    ) : null}
                  </Text>
                ) : null}
              </View>
            );
          })}
        </View>

        <Text style={styles.faqFooter}>
          Still have questions?{' '}
          <Text style={styles.inlineLink} onPress={() => Linking.openURL(`mailto:${supportEmail}`)}>
            We&apos;re happy to help.
          </Text>
        </Text>
      </View>

      <View style={styles.finalInvite}>
        <Text style={styles.finalInviteTitle}>
          Come. See. <Text style={styles.finalInviteAccent}>Jesus</Text>
        </Text>
        <Text style={styles.finalInviteCopy}>Join us this Sunday.</Text>
      </View>
    </ScrollView>
  );
}

function MethodTab({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      style={[styles.methodTab, active ? styles.methodTabActive : null]}
      onPress={onPress}
      activeOpacity={0.88}
    >
      <Text style={[styles.methodTabText, active ? styles.methodTabTextActive : null]}>{label}</Text>
    </TouchableOpacity>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.detailRow}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 48,
    backgroundColor: '#FFFFFF',
  },
  hero: {
    minHeight: 240,
  },
  heroImage: {
    opacity: 0.96,
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.28)',
  },
  headerBlock: {
    paddingHorizontal: 24,
    paddingTop: 28,
    paddingBottom: 8,
    alignItems: 'center',
  },
  heroTitle: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 38,
    lineHeight: 44,
    color: INK,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  heroCopy: {
    marginTop: 18,
    maxWidth: 320,
    fontFamily: 'Montserrat-Medium',
    fontSize: 20,
    lineHeight: 30,
    color: MUTED,
    textAlign: 'center',
  },
  heroAccent: {
    color: BRAND_RED,
  },
  impactBlock: {
    paddingHorizontal: 24,
    paddingTop: 18,
    alignItems: 'center',
  },
  impactTitle: {
    maxWidth: 340,
    fontFamily: 'Montserrat-Bold',
    fontSize: 26,
    lineHeight: 34,
    color: INK,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  impactAccent: {
    marginTop: 8,
    fontFamily: 'Montserrat-Bold',
    fontSize: 28,
    lineHeight: 34,
    color: BRAND_RED,
    textAlign: 'center',
  },
  methodsShell: {
    paddingHorizontal: 20,
    paddingTop: 28,
  },
  methodsIntro: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 18,
    lineHeight: 28,
    color: MUTED,
    textAlign: 'center',
    marginBottom: 18,
  },
  methodsCard: {
    borderRadius: 30,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: 18,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2,
  },
  stepLabel: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 16,
    lineHeight: 22,
    color: INK,
    marginBottom: 18,
  },
  methodTabs: {
    gap: 10,
    marginBottom: 16,
  },
  methodTab: {
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#F3F4F6',
  },
  methodTabActive: {
    backgroundColor: BRAND_RED,
  },
  methodTabText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
    color: INK,
    textAlign: 'center',
  },
  methodTabTextActive: {
    color: '#FFFFFF',
  },
  methodPanel: {
    borderRadius: 26,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: 'rgba(249,250,251,0.9)',
    paddingHorizontal: 18,
    paddingVertical: 20,
    alignItems: 'center',
  },
  methodIconWrap: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: 'rgba(179,40,45,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  methodTitle: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 24,
    lineHeight: 30,
    color: INK,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  methodSubtitle: {
    marginTop: 10,
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    color: BRAND_RED,
    textAlign: 'center',
  },
  methodCopy: {
    marginTop: 12,
    fontFamily: 'Montserrat-Regular',
    fontSize: 15,
    lineHeight: 22,
    color: MUTED,
    textAlign: 'center',
  },
  detailList: {
    width: '100%',
    marginTop: 18,
    gap: 10,
  },
  detailRow: {
    gap: 4,
  },
  detailLabel: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 14,
    color: INK,
  },
  detailValue: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 15,
    lineHeight: 22,
    color: MUTED,
  },
  referenceText: {
    marginTop: 16,
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
    lineHeight: 20,
    color: MUTED,
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
    borderColor: BRAND_RED,
    paddingHorizontal: 18,
    paddingVertical: 12,
  },
  primaryActionText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 15,
    color: BRAND_RED,
  },
  reassuranceBlock: {
    paddingHorizontal: 24,
    paddingTop: 34,
    alignItems: 'center',
  },
  reassuranceIcon: {
    width: 46,
    height: 46,
    marginBottom: 16,
  },
  reassuranceCopy: {
    maxWidth: 330,
    fontFamily: 'Montserrat-Regular',
    fontSize: 22,
    lineHeight: 32,
    color: MUTED,
    textAlign: 'center',
  },
  annualReportCard: {
    marginTop: 34,
    marginHorizontal: 20,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 22,
    paddingVertical: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2,
  },
  reportIconWrap: {
    width: 56,
    height: 56,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  annualReportTitle: {
    marginTop: 10,
    fontFamily: 'Montserrat-Bold',
    fontSize: 28,
    lineHeight: 34,
    color: INK,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  annualReportCopy: {
    marginTop: 14,
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
    lineHeight: 25,
    color: MUTED,
    textAlign: 'center',
  },
  annualReportContact: {
    marginTop: 14,
    fontFamily: 'Montserrat-Regular',
    fontSize: 15,
    lineHeight: 24,
    color: MUTED,
    textAlign: 'center',
  },
  secondaryAction: {
    marginTop: 18,
    borderRadius: 18,
    backgroundColor: SURFACE,
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  secondaryActionText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 15,
    color: INK,
  },
  faqSection: {
    paddingHorizontal: 20,
    paddingTop: 34,
  },
  faqHeading: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 30,
    lineHeight: 36,
    color: INK,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  faqIntro: {
    marginTop: 10,
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
    lineHeight: 24,
    color: MUTED,
    textAlign: 'center',
  },
  faqList: {
    marginTop: 18,
    gap: 12,
  },
  faqCard: {
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
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
    color: INK,
  },
  faqAnswer: {
    marginTop: 12,
    fontFamily: 'Montserrat-Regular',
    fontSize: 15,
    lineHeight: 24,
    color: MUTED,
  },
  faqFooter: {
    marginTop: 18,
    fontFamily: 'Montserrat-Regular',
    fontSize: 15,
    lineHeight: 22,
    color: MUTED,
    textAlign: 'center',
  },
  inlineLink: {
    color: BRAND_RED,
    fontFamily: 'Montserrat-SemiBold',
  },
  finalInvite: {
    paddingTop: 40,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  finalInviteTitle: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 34,
    lineHeight: 40,
    color: INK,
    textAlign: 'center',
  },
  finalInviteAccent: {
    color: BRAND_RED,
  },
  finalInviteCopy: {
    marginTop: 10,
    fontFamily: 'Montserrat-Regular',
    fontSize: 18,
    color: MUTED,
    textAlign: 'center',
  },
  stateWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#FFFFFF',
    gap: 8,
  },
  stateTitle: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 18,
    color: INK,
  },
  stateText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    color: MUTED,
    textAlign: 'center',
  },
});
