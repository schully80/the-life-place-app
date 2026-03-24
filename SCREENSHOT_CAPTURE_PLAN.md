# Screenshot Capture Plan

This plan is for the current launch direction of the app as of 2026-03-24.

It assumes the final store submission will use 5 screenshots only and will exclude:

- Live
- Community
- About Us
- Our Welcome
- Blog
- Ministries
- Messages

These excluded screens are either hidden, feature-gated, removed from the launch path, or intentionally not part of the 5-screen submission story.

## Final 5-Screenshot Set

### 1. Home

- Route: `app/(tabs)/index.tsx`
- Purpose: strongest first impression and main brand entry point
- Show:
  - the redesigned hero or top brand section
  - the first meaningful content block below the hero
  - enough visible UI to prove the app is active and useful
- Avoid:
  - API errors
  - loading states
  - empty cards
  - old design screenshots

### 2. Visit Us

- Route: `app/visit.tsx`
- Purpose: show immediate practical value for first-time visitors
- Show:
  - hero section
  - service time
  - location block
  - at least one map action visible
- Aim:
  - make it obvious that a visitor can find the church quickly

### 3. Prayer

- Route: `app/(tabs)/prayer.tsx`
- Purpose: show a clear spiritual action flow
- Show:
  - intro copy
  - name, email, and request fields
  - submit button
- Avoid:
  - keyboard open
  - alert dialogs
  - validation errors
  - fallback-only states

### 4. Generosity

- Route: `app/(tabs)/generosity.tsx`
- Purpose: show trust, clarity, and giving pathways
- Preferred capture:
  - whichever single giving method view looks strongest in the redesigned app
- Recommended order of preference:
  1. EFT
  2. SnapScan
  3. PayPal
- Show:
  - the strongest giving panel
  - enough surrounding UI to make the page feel complete

### 5. Devotionals

- Route: `app/devotionals.tsx`
- Purpose: show recurring engagement and spiritual depth
- Show:
  - devotional title
  - date
  - visible body content
  - one supporting element such as prayer, action panel, or read button
- Avoid:
  - loading state
  - unavailable state
  - blank or sparse content

## File Naming Plan

### iOS

- Folder: `store-assets/screenshots-ios/exports`
- Size: `1290x2796`

Final files:

1. `ios-6.7in-01-home-en-GB.png`
2. `ios-6.7in-02-visit-en-GB.png`
3. `ios-6.7in-03-prayer-en-GB.png`
4. `ios-6.7in-04-generosity-en-GB.png`
5. `ios-6.7in-05-devotionals-en-GB.png`

### Android

- Folder: `store-assets/screenshots-android/exports`
- Size: `1080x1920`

Final files:

1. `android-phone-1080x1920-01-home-en-GB.png`
2. `android-phone-1080x1920-02-visit-en-GB.png`
3. `android-phone-1080x1920-03-prayer-en-GB.png`
4. `android-phone-1080x1920-04-generosity-en-GB.png`
5. `android-phone-1080x1920-05-devotionals-en-GB.png`

## Composition Rules

- Use the final launch design only.
- Use real, populated content.
- Keep the iOS and Android sets in the same order.
- Prefer strong first-fold compositions.
- Keep the status bar clean and consistent.
- Avoid popups, alerts, permission prompts, and keyboards.
- Do not use hidden, silenced, or feature-gated pages in the submission set.

## Retake Priority

These should be considered mandatory retakes:

- Home
- Visit Us
- Prayer
- Generosity
- Devotionals

Older exported assets from the previous design should not be reused unless they are visually identical to the final launch UI.

## Launch Narrative

The 5 screenshots should tell this story:

1. Brand and first impression
2. Practical visit information
3. Prayer and care
4. Trustworthy giving
5. Ongoing engagement through devotionals
