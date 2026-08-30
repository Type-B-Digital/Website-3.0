export default {
  plugins: {
    // Tailwind config lives with the rest of the style layer, next to the tokens
    // it consumes (src/styles/tailwind.config.ts).
    tailwindcss: { config: './src/styles/tailwind.config.ts' },
    autoprefixer: {},
  },
}
