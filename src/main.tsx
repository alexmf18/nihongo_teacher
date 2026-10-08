import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Fonts are bundled (not loaded from Google Fonts) so the app works offline,
// which the Android build needs. unicode-range keeps downloads to the glyphs used.
import '@fontsource/klee-one/400.css'
import '@fontsource/klee-one/600.css'
import '@fontsource/zen-kaku-gothic-new/400.css'
import '@fontsource/zen-kaku-gothic-new/500.css'
import '@fontsource/zen-kaku-gothic-new/700.css'
import { App } from './presentation/components/App'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
