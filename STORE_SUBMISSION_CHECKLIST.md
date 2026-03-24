# Store Submission Checklist

This checklist is specific to the current state of `the-life-place-app` as of 2026-03-24.

## 1. Current Configuration Snapshot

Configured in repo:

- App name: `The Life Place`
- Expo slug: `the-life-place-app`
- URL scheme: `tlp`
- iOS bundle identifier: `org.thelifeplace.app`
- Android application ID: `org.thelifeplace.app`
- Version: `0.1.0`
- iOS build number: `2`
- Android version code: `2`
- iOS supports tablet: `true`
- Orientation: portrait
- UI style: Light on iOS

Primary config files:

- `app.json`
- `android/app/src/main/AndroidManifest.xml`
- `android/app/src/main/res/values/strings.xml`
- `android/app/build.gradle`
- `ios/TheLifePlace/Info.plist`
- `eas.json`

## 2. What Is Ready

- App display name is consistent across Expo, Android, and iOS.
- Main icon assets exist.
- Splash assets exist for both iOS and Android.
- There is a dedicated `store-assets/` folder for screenshots and branding.
- Native identifiers are aligned between platforms.
- EAS production profile is present and auto-increments builds.
- Production Android manifest is trimmed to the network permission the app currently needs.

## 3. Blockers Before Store Submission

These are the main issues that would make the store listing look unfinished or incomplete.

- Replace the current raw store screenshots in `store-assets/raw-screens/`.
  - The checked screenshots are blank placeholder frames, not actual app captures.
- Export a final Google Play feature graphic.
  - Only the Affinity source file exists right now.
- Supply store listing metadata manually or automate it elsewhere.
  - No short description, full description, subtitle, keywords, support URL, or marketing URL were found in repo config.
- Review whether any new production Android permission is introduced later.

## 4. Asset Inventory

### App Icons

- iOS app icon source: `ios/TheLifePlace/Images.xcassets/AppIcon.appiconset/App-Icon-1024x1024@1x.png`
- Expo icon: `assets/icon.png`
- Android adaptive foreground: `assets/adaptive-icon.png`

Notes:

- `assets/icon.png` is valid at `1024x1024`.
- `assets/adaptive-icon.png` is valid at `512x512`.
- The current icon is on-brand, but includes fine text and detail that may be hard to read at small storefront sizes.

### Splash Assets

- iOS splash: `assets/splash-ios.png`
- Android splash: `assets/splash-android.png`
- Shared splash background tone: `#F7F6F4`

### Store Screenshots

Current raw screenshot files:

- Android: `store-assets/raw-screens/android-01-home-1080x1920.png` through `android-07-generosity-1080x1920.png`
- iOS: `store-assets/raw-screens/ios-home-1290x2796.png` through the other `1290x2796` files

Current state:

- Filenames and dimensions are structured well.
- Duplicate malformed screenshot filename has been removed.
- Content is not ready for upload because the screenshots checked are placeholders.

### Branding Files

- `store-assets/brand/TLP-logo-white.svg`
- `store-assets/brand/TLP-monogram-white.svg`

### Google Play Feature Graphic

- Source exists: `store-assets/feature-graphic/TLP_FeatureGraphic.afpub`
- Final export image is missing from repo

## 5. Store Listing Metadata Still Needed

The following storefront fields were not found in this repo and likely still need to be entered in App Store Connect and Google Play Console.

### Apple App Store

- App subtitle
- Promotional text
- Description
- Keywords
- Support URL
- Marketing URL
- Privacy policy URL
- App category and secondary category
- Age rating answers

### Google Play Store

- App name
- Short description
- Full description
- App category
- Contact email
- Contact website
- Privacy policy URL
- Feature graphic
- Data safety form
- Content rating questionnaire

## 6. Repo-Derived Candidate Values

These values are inferred from the app config and content fallbacks. Verify them before submission.

- Website: `https://thelifeplace.org`
- Giving URL: `https://thelifeplace.org/give`
- Blog URL: `https://schulteretyang.substack.com`
- YouTube channel ID: `UC2f4d_FFU4HiTT_DiPhZwvw`
- Support / contact email fallback: `hello@thelifeplace.org`
- Privacy policy URL candidate: `https://thelifeplace.org/privacy-policy/`
- Likely location context: Sandton, South Africa

## 7. Recommended Screenshot Set

Use real in-app captures, not mock empty frames. Prefer the strongest visual surfaces in the app.

Recommended order:

1. Home
2. Community
3. Visit Us
4. About Us
5. Prayer
6. Generosity
7. Devotionals or Ministries

Suggested reason for each:

- Home: strongest first impression and main brand entry point
- Community: shows app navigation breadth
- Visit Us: makes the app feel useful to new visitors
- About Us: gives a strong mission-led brand statement
- Prayer: shows a meaningful action flow
- Generosity: shows giving pathways and trust cues
- Devotionals or Ministries: shows recurring engagement content

Relevant routes from the app:

- `app/(tabs)/index.tsx`
- `app/(tabs)/community.tsx`
- `app/visit.tsx`
- `app/about.tsx`
- `app/(tabs)/prayer.tsx`
- `app/(tabs)/generosity.tsx`
- `app/devotionals.tsx`
- `app/ministries/index.tsx`

## 8. Visual Notes For Store Readiness

- The app uses a consistent white and soft-neutral base with red accents and Montserrat typography.
- The tab bar is darker and more premium-looking than the screenshot placeholder frames suggest.
- The Home and Community surfaces are stronger candidates for storefront use than the current exported screenshots.
- If the current icon is kept, test legibility at very small sizes before final submission.

## 9. Permissions Review For Google Play

Current production manifest state:

- `android.permission.INTERNET`

Notes:

- The previously flagged storage, alert-window, and vibrate permissions were removed from `android/app/src/main/AndroidManifest.xml`.
- Debug manifests still carry dev-client related permissions for local development.

## 10. Submission Readiness Checklist

### Required Before Upload

- Confirm final app name and branding lockup
- Replace placeholder screenshots with real app captures
- Export final Play feature graphic
- Confirm privacy policy URL
- Confirm support email and support website
- Write App Store description fields
- Write Play Store short and full descriptions
- Review categories, age rating, and content rating
- Sanity-check final Android permission set before release build

### Nice To Tighten Before Release

- Simplify the icon if small-size legibility is weak
- Add a store listing copy draft into the repo for version control
- Add a release checklist for screenshots and metadata updates
- Add submission notes for App Store Connect and Play Console owners

## 11. Overall Verdict

The app configuration itself is mostly ready for storefront branding, but the store listing package is not yet submission-ready.

The biggest visual issue is the screenshot set. The biggest process issue is missing store metadata outside the native config.
