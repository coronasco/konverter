interface TokenInput {
  brand: string
  accent: string
  surface: string
  text: string
  spacingBase: number
  radiusBase: number
  shadowStrength: number
  fontFamily: string
  fontSizeBase: number
  lineHeightBase: number
  includeDarkMode: boolean
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function normalizeHex(hex: string) {
  const cleaned = hex.replace('#', '').trim()
  if (cleaned.length === 3) {
    return `#${cleaned
      .split('')
      .map((char) => `${char}${char}`)
      .join('')}`.toLowerCase()
  }
  return `#${cleaned.padEnd(6, '0').slice(0, 6)}`.toLowerCase()
}

function hexToRgb(hex: string) {
  const normalized = normalizeHex(hex).slice(1)
  return {
    r: parseInt(normalized.slice(0, 2), 16),
    g: parseInt(normalized.slice(2, 4), 16),
    b: parseInt(normalized.slice(4, 6), 16),
  }
}

function rgbToHex(r: number, g: number, b: number) {
  return `#${[r, g, b]
    .map((value) => clamp(Math.round(value), 0, 255).toString(16).padStart(2, '0'))
    .join('')}`
}

function mix(hexA: string, hexB: string, amount: number) {
  const a = hexToRgb(hexA)
  const b = hexToRgb(hexB)
  return rgbToHex(
    a.r + (b.r - a.r) * amount,
    a.g + (b.g - a.g) * amount,
    a.b + (b.b - a.b) * amount
  )
}

function rgba(hex: string, alpha: number) {
  const color = hexToRgb(hex)
  return `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha})`
}

function buildScale(base: string) {
  return {
    50: mix(base, '#ffffff', 0.9),
    100: mix(base, '#ffffff', 0.78),
    200: mix(base, '#ffffff', 0.64),
    300: mix(base, '#ffffff', 0.48),
    400: mix(base, '#ffffff', 0.24),
    500: normalizeHex(base),
    600: mix(base, '#000000', 0.14),
    700: mix(base, '#000000', 0.28),
    800: mix(base, '#000000', 0.42),
    900: mix(base, '#000000', 0.58),
  }
}

export function generateTokenBundle(input: TokenInput) {
  const brandScale = buildScale(input.brand)
  const accentScale = buildScale(input.accent)

  const spacing = {
    xs: `${(input.spacingBase * 0.5).toFixed(2)}rem`,
    sm: `${(input.spacingBase * 0.75).toFixed(2)}rem`,
    md: `${input.spacingBase.toFixed(2)}rem`,
    lg: `${(input.spacingBase * 1.5).toFixed(2)}rem`,
    xl: `${(input.spacingBase * 2).toFixed(2)}rem`,
    '2xl': `${(input.spacingBase * 3).toFixed(2)}rem`,
  }

  const radius = {
    sm: `${(input.radiusBase * 0.5).toFixed(2)}rem`,
    md: `${input.radiusBase.toFixed(2)}rem`,
    lg: `${(input.radiusBase * 1.5).toFixed(2)}rem`,
    xl: `${(input.radiusBase * 2).toFixed(2)}rem`,
    pill: '999px',
  }

  const shadows = {
    sm: `0 6px 16px ${rgba(input.text, input.shadowStrength * 0.08)}`,
    md: `0 12px 28px ${rgba(input.text, input.shadowStrength * 0.14)}`,
    lg: `0 18px 40px ${rgba(input.text, input.shadowStrength * 0.18)}`,
  }

  const typography = {
    family: input.fontFamily,
    size: {
      sm: `${(input.fontSizeBase * 0.875).toFixed(3)}rem`,
      base: `${input.fontSizeBase.toFixed(3)}rem`,
      lg: `${(input.fontSizeBase * 1.125).toFixed(3)}rem`,
      xl: `${(input.fontSizeBase * 1.375).toFixed(3)}rem`,
      '2xl': `${(input.fontSizeBase * 1.875).toFixed(3)}rem`,
    },
    lineHeight: {
      tight: clamp(input.lineHeightBase - 0.2, 1, 2).toFixed(2),
      base: input.lineHeightBase.toFixed(2),
      relaxed: clamp(input.lineHeightBase + 0.2, 1, 2.4).toFixed(2),
    },
  }

  const colors = {
    brand: brandScale,
    accent: accentScale,
    surface: normalizeHex(input.surface),
    surfaceAlt: mix(input.surface, '#000000', 0.04),
    text: normalizeHex(input.text),
    textMuted: mix(input.text, '#ffffff', 0.45),
    border: mix(input.surface, input.text, 0.12),
  }

  const darkColors = input.includeDarkMode
    ? {
        surface: mix(input.surface, '#000000', 0.82),
        surfaceAlt: mix(input.surface, '#000000', 0.74),
        text: mix(input.text, '#ffffff', 0.84),
        textMuted: mix(input.text, '#ffffff', 0.6),
        border: mix(input.surface, '#ffffff', 0.16),
      }
    : null

  const tokens = {
    color: colors,
    spacing,
    radius,
    shadow: shadows,
    typography,
    ...(darkColors ? { dark: { color: darkColors } } : {}),
  }

  const cssLines = [
    ':root {',
    ...Object.entries(colors.brand).map(([key, value]) => `  --color-brand-${key}: ${value};`),
    ...Object.entries(colors.accent).map(([key, value]) => `  --color-accent-${key}: ${value};`),
    `  --color-surface: ${colors.surface};`,
    `  --color-surface-alt: ${colors.surfaceAlt};`,
    `  --color-text: ${colors.text};`,
    `  --color-text-muted: ${colors.textMuted};`,
    `  --color-border: ${colors.border};`,
    ...Object.entries(spacing).map(([key, value]) => `  --space-${key}: ${value};`),
    ...Object.entries(radius).map(([key, value]) => `  --radius-${key}: ${value};`),
    ...Object.entries(shadows).map(([key, value]) => `  --shadow-${key}: ${value};`),
    `  --font-sans: ${input.fontFamily};`,
    `  --font-size-base: ${typography.size.base};`,
    `  --line-height-base: ${typography.lineHeight.base};`,
    '}',
  ]

  if (darkColors) {
    cssLines.push(
      '',
      '[data-theme="dark"] {',
      `  --color-surface: ${darkColors.surface};`,
      `  --color-surface-alt: ${darkColors.surfaceAlt};`,
      `  --color-text: ${darkColors.text};`,
      `  --color-text-muted: ${darkColors.textMuted};`,
      `  --color-border: ${darkColors.border};`,
      '}'
    )
  }

  const tailwind = `export default {
  theme: {
    extend: {
      colors: {
        brand: {
${Object.entries(colors.brand)
  .map(([key]) => `          ${key}: 'var(--color-brand-${key})',`)
  .join('\n')}
        },
        accent: {
${Object.entries(colors.accent)
  .map(([key]) => `          ${key}: 'var(--color-accent-${key})',`)
  .join('\n')}
        },
        surface: 'var(--color-surface)',
        'surface-alt': 'var(--color-surface-alt)',
        text: 'var(--color-text)',
        border: 'var(--color-border)',
      },
      spacing: {
${Object.keys(spacing)
  .map((key) => `        '${key}': 'var(--space-${key})',`)
  .join('\n')}
      },
      borderRadius: {
${Object.keys(radius)
  .map((key) => `        ${key}: 'var(--radius-${key})',`)
  .join('\n')}
      },
      boxShadow: {
${Object.keys(shadows)
  .map((key) => `        ${key}: 'var(--shadow-${key})',`)
  .join('\n')}
      },
      fontFamily: {
        sans: ['var(--font-sans)'],
      },
    },
  },
}
`

  return {
    tokens,
    css: cssLines.join('\n'),
    tailwind,
    json: JSON.stringify(tokens, null, 2),
  }
}
