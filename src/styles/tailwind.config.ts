/**
 * Tailwind configuration — derived from src/tokens/index.ts.
 *
 * Lives beside globals.css rather than at the project root so the whole style
 * layer sits in one folder. postcss.config.js points at this path explicitly.
 *
 * Nothing here is a literal value: every entry reads from the token module, so
 * a change in Figma propagates through tokens/index.ts to both the utility
 * classes and the CSS variables without a second edit.
 */
import type { Config } from 'tailwindcss'
import {
  breakpoints,
  colors,
  fontFamily,
  gradients,
  fontWeight,
  layout,
  motion,
  opacity,
  palette,
  radius,
  spacing,
  typography,
  unmapped,
} from '../tokens'

/** `subHeaderLarge` -> `sub-header-large`, so classes read `text-sub-header-large`. */
const kebab = (s: string) => s.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()

/** Tailwind wants `[size, { lineHeight, fontWeight, letterSpacing }]` tuples. */
const fontSize: Record<string, [string, Record<string, string>]> = Object.fromEntries(
  Object.entries(typography).map(([name, style]) => [
    kebab(name),
    [
      style.fontSize,
      {
        lineHeight: String(style.lineHeight),
        fontWeight: String(style.fontWeight),
        ...('letterSpacing' in style ? { letterSpacing: style.letterSpacing } : {}),
      },
    ],
  ]),
)

/** Motion durations are authored in seconds; Tailwind wants CSS time strings. */
const transitionDuration = Object.fromEntries(
  Object.entries(motion.duration).map(([name, seconds]) => [name, `${seconds * 1000}ms`]),
)

const transitionTimingFunction = Object.fromEntries(
  Object.entries(motion.easing).map(([name, [a, b, c, d]]) => [
    name,
    `cubic-bezier(${a}, ${b}, ${c}, ${d})`,
  ]),
)

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    // Replaces Tailwind's default breakpoints rather than extending them, so
    // no off-token screen can be referenced by accident.
    screens: breakpoints,
    extend: {
      colors: {
        neutral: palette.neutral,
        turquoise: palette.turquoise,
        orange: palette.orange,
        amber: palette.amber,
        // Mood-aware accent — resolves through the CSS variable set by
        // [data-mood] in globals.css.
        accent: {
          100: 'var(--color-accent-100)',
          200: 'var(--color-accent-200)',
          300: 'var(--color-accent-300)',
          400: 'var(--color-accent-400)',
          500: 'var(--color-accent-500)',
          600: 'var(--color-accent-600)',
          700: 'var(--color-accent-700)',
          800: 'var(--color-accent-800)',
          900: 'var(--color-accent-900)',
        },
        paper: unmapped.paper,
        'footer-ground': unmapped.footerGround,
        'ink-soft': unmapped.inkSoft,
        canvas: colors.background.canvas,
        surface: colors.background.surface,
        scrim: colors.background.scrim,
        'scrim-strong': colors.background.scrimStrong,
        'tag-bg': colors.background.tag,
      },
      textColor: {
        'on-dark': colors.text.onDark,
        'on-dark-muted': colors.text.onDarkMuted,
        'on-light': colors.text.onLight,
      },
      borderColor: {
        'on-dark': colors.border.onDark,
        'on-dark-subtle': colors.border.onDarkSubtle,
        'on-light': colors.border.onLight,
        divider: colors.border.divider,
      },
      fontFamily: {
        sans: fontFamily.sans.split(', '),
      },
      fontWeight: Object.fromEntries(
        Object.entries(fontWeight).map(([k, v]) => [k, String(v)]),
      ),
      fontSize,
      spacing,
      borderRadius: radius,
      opacity: Object.fromEntries(
        Object.entries(opacity).map(([k, v]) => [k, String(v)]),
      ),
      maxWidth: {
        content: layout.maxWidth,
        frame: layout.frameWidth,
      },
      // `bg-gradient-b1` … `bg-gradient-b8`. Distinct from Tailwind's built-in
      // `bg-gradient-to-*` direction utilities, which stay available.
      backgroundImage: Object.fromEntries(
        Object.entries(gradients).map(([name, value]) => [`gradient-${name}`, value]),
      ),
      transitionDuration,
      transitionTimingFunction,
    },
  },
  plugins: [],
} satisfies Config
