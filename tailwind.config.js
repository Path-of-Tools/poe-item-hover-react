module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}', // Ensure your components are scanned for Tailwind classes
  ],
  safelist: [
    'rare-header__double',
    'custom-text-augment',
    'custom-text-fracture',
    'custom-text-enchant',
  ], // Safelist any custom classes Tailwind might purge
  theme: {
    extend: {},
  },
  plugins: [],
};