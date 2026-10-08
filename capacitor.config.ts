import type { CapacitorConfig } from '@capacitor/cli'

// Android app built from the same Vite output (dist/) as the web version.
const config: CapacitorConfig = {
  appId: 'com.alexmf18.nihongoteacher',
  appName: 'Nihongo Teacher',
  webDir: 'dist',
  android: {
    backgroundColor: '#F5F5F2',
  },
  plugins: {
    // The app draws edge to edge; safe areas reach the CSS as --safe-area-inset-*.
    SystemBars: {
      insetsHandling: 'css',
      // Dark icons on the light paper background (the app has no dark theme).
      style: 'LIGHT',
    },
  },
}

export default config
