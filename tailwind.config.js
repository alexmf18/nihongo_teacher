// "Practice notebook and red pen": content is written in ink (sumi) on paper,
// and red (aka, the teacher's pen) is reserved for marks, corrections and the
// current selection.
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        sumi: {
          DEFAULT: '#1C1B1F',
          soft: '#5B5A60',
          // Decorative only (≈3:1 on paper): never for text people must read.
          faint: '#8A8890',
        },
        papel: {
          DEFAULT: '#F5F5F2',
          deep: '#ECEBE6',
        },
        keisen: {
          DEFAULT: '#E2E0DB',
          strong: '#C9C6BF',
        },
        accent: {
          DEFAULT: '#C70039',
          dark: '#A3002F',
          light: '#FCF1F4',
          soft: '#F7E1E8',
          border: '#EBC3CF',
        },
      },
      fontFamily: {
        sans: ['"Zen Kaku Gothic New"', 'system-ui', '-apple-system', '"Segoe UI"', 'sans-serif'],
        // Textbook script (教科書体): shows strokes the way they are handwritten.
        kyokasho: ['"Klee One"', '"Zen Kaku Gothic New"', 'serif'],
      },
      boxShadow: {
        sheet: '0 1px 2px rgba(28, 27, 31, 0.04), 0 12px 32px -16px rgba(28, 27, 31, 0.16)',
      },
    },
  },
  plugins: [],
}
