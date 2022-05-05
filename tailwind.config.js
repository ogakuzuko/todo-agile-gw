module.exports = {
  mode: 'jit',
  content: ['./src/pages/**/*.{js,jsx,ts,tsx}', './src/components/**/*.{js,jsx,ts,tsx}'],
  theme: {
    // Mantineのレスポンシブ幅と一致するように設定（https://mantine.dev/theming/responsive/）
    // NOTE: Tailwind側のレスポンシブ幅の方が若干Mantineより大きい。どちらか一方に合わせてあればどちらに合わせてもいい
    screens: {
      xs: '576px',
      sm: '768px',
      md: '992px',
      lg: '1200px',
      xl: '1400px',
    },
  },
  plugins: [],
}
