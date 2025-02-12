import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.42dd3c437ff34b6f9a489c1679c1f82e',
  appName: 'green-shelf-navigator',
  webDir: 'dist',
  server: {
    url: 'https://42dd3c43-7ff3-4b6f-9a48-9c1679c1f82e.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    BarcodeScanner: {
      cameraFacing: 'back',
    },
  },
};

export default config;
