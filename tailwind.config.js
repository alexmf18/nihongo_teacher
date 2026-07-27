export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: '#c70039',
          dark: '#ad0032',
          light: '#fff5f8',
          soft: '#fbedf3',
          border: '#f0d7df',
          'border-incorrect': '#f0c7d3',
        },
        app: {
          bg: '#f7f7fb',
        },
        sidebar: {
          bg: '#fbfbfd',
        },
        input: {
          border: '#1d4eff',
        },
      },
    },
  },
  plugins: [],
}
