
# the-life-place-app

A clean starting point for The Life Place mobile app using **Expo**, **React Native**, and **Expo Router**.

## Quick start
```bash
nvm use  # optional (Node 20)
npm install
npm run start
```
Press `i` (iOS), `a` (Android), or scan the QR with Expo Go.

## Dev Client Workflow
For this project, prefer Expo Dev Client over Expo Go.

Local simulator/emulator workflow:
```bash
npm run dev-client:ios
npm run dev-client:android
```

After the native app is installed once, use:
```bash
npm run start:dev-client
```

Cloud development builds for physical devices:
```bash
npm run eas:dev-client:ios
npm run eas:dev-client:android
```

## Structure
- `app/` routes & screens (Expo Router)
- `components/` shared UI
- `lib/` styling and utilities
- `assets/` icons/splash

## Next steps
- Replace icons/splash in `assets/`
- Update giving links and EFT details
- Add fonts (Montserrat/Inter) with `expo-font`
- Wire prayer form to a backend (Supabase/Firebase)
- Integrate Google Calendar or ICS feed for events
