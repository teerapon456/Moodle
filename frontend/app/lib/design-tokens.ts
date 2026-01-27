// ========================================
// DESIGN TOKENS
// สำหรับจัดการสีและ spacing ให้สม่ำเสมอ
// ========================================

export const colors = {
  // Brand Colors
  primary: {
    50: '#FEF2F2',
    100: '#FEE2E2',
    200: '#FECACA',
    300: '#FCA5A5',
    400: '#F87171',
    500: '#EF4444',
    600: '#DC2626',
    700: '#B91C1C',
    800: '#991B1B',
    900: '#7F1D1D',
    // Theme Colors
    main: '#A21D21',
    dark: '#7A1818',
    light: '#C92828',
    lighter: '#E53E3E',
  },

  // Semantic Colors
  success: {
    50: '#F0FDF4',
    100: '#DCFCE7',
    200: '#BBF7D0',
    300: '#86EFAC',
    400: '#4ADE80',
    500: '#22C55E',
    600: '#16A34A',
    700: '#15803D',
    800: '#166534',
    900: '#14532D',
  },

  warning: {
    50: '#FFFBEB',
    100: '#FEF3C7',
    200: '#FDE68A',
    300: '#FCD34D',
    400: '#FBBF24',
    500: '#F59E0B',
    600: '#D97706',
    700: '#B45309',
    800: '#92400E',
    900: '#78350F',
  },

  error: {
    50: '#FEF2F2',
    100: '#FEE2E2',
    200: '#FECACA',
    300: '#FCA5A5',
    400: '#F87171',
    500: '#EF4444',
    600: '#DC2626',
    700: '#B91C1C',
    800: '#991B1B',
    900: '#7F1D1D',
  },

  info: {
    50: '#EFF6FF',
    100: '#DBEAFE',
    200: '#BFDBFE',
    300: '#93C5FD',
    400: '#60A5FA',
    500: '#3B82F6',
    600: '#2563EB',
    700: '#1D4ED8',
    800: '#1E40AF',
    900: '#1E3A8A',
  },

  // Neutral Colors
  gray: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },

  // Background Colors
  background: {
    primary: '#FFFFFF',
    secondary: '#F9FAFB',
    tertiary: '#F3F4F6',
    dark: '#111827',
    darkSecondary: '#1F2937',
    darkTertiary: '#374151',
  },

  // Text Colors
  text: {
    primary: '#111827',
    secondary: '#4B5563',
    tertiary: '#6B7280',
    inverse: '#FFFFFF',
    dark: {
      primary: '#F9FAFB',
      secondary: '#D1D5DB',
      tertiary: '#9CA3AF',
    }
  },

  // Border Colors
  border: {
    primary: '#E5E7EB',
    secondary: '#D1D5DB',
    tertiary: '#9CA3AF',
    dark: {
      primary: '#374151',
      secondary: '#4B5563',
      tertiary: '#6B7280',
    }
  },
};

export const spacing = {
  // Base spacing unit (4px)
  unit: 4,

  // Spacing scale
  0: '0px',
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  5: '20px',
  6: '24px',
  8: '32px',
  10: '40px',
  12: '48px',
  16: '64px',
  20: '80px',
  24: '96px',
  32: '128px',
  40: '160px',
  48: '192px',
  56: '224px',
  64: '256px',

  // Common spacing values
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  '2xl': '48px',
  '3xl': '64px',
  '4xl': '96px',
  '5xl': '128px',
};

export const typography = {
  // Font families
  fontFamily: {
    sans: ['Inter', 'Noto Sans Thai', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
    mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'Monaco', 'monospace'],
  },

  // Font sizes
  fontSize: {
    xs: '12px',
    sm: '14px',
    base: '16px',
    lg: '18px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '30px',
    '4xl': '36px',
    '5xl': '48px',
    '6xl': '60px',
    '7xl': '72px',
    '8xl': '96px',
    '9xl': '128px',
  },

  // Font weights
  fontWeight: {
    thin: '100',
    extralight: '200',
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
    black: '900',
  },

  // Line heights
  lineHeight: {
    none: '1',
    tight: '1.25',
    snug: '1.375',
    normal: '1.5',
    relaxed: '1.625',
    loose: '2',
  },
};

export const borderRadius = {
  none: '0px',
  sm: '2px',
  base: '4px',
  md: '6px',
  lg: '8px',
  xl: '12px',
  '2xl': '16px',
  '3xl': '24px',
  full: '9999px',
};

export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
};

export const transitions = {
  // Transition durations
  duration: {
    75: '75ms',
    100: '100ms',
    150: '150ms',
    200: '200ms',
    300: '300ms',
    500: '500ms',
    700: '700ms',
    1000: '1000ms',
  },

  // Transition timing functions
  easing: {
    linear: 'linear',
    ease: 'ease',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
  },

  // Common transitions
  default: 'all 150ms ease-in-out',
  fast: 'all 100ms ease-in-out',
  slow: 'all 300ms ease-in-out',
};

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

export const zIndex = {
  hide: -1,
  auto: 'auto',
  base: 0,
  docked: 10,
  dropdown: 1000,
  sticky: 1100,
  banner: 1200,
  overlay: 1300,
  modal: 1400,
  popover: 1500,
  skipLink: 1600,
  toast: 1700,
  tooltip: 1800,
};

// ========================================
// COMPONENT-SPECIFIC TOKENS
// ========================================

export const card = {
  padding: {
    sm: spacing.md,
    md: spacing.lg,
    lg: spacing.xl,
  },
  borderRadius: borderRadius.lg,
  shadow: shadows.md,
  border: `1px solid ${colors.border.primary}`,
};

export const button = {
  padding: {
    sm: `${spacing.sm} ${spacing.md}`,
    md: `${spacing.md} ${spacing.lg}`,
    lg: `${spacing.lg} ${spacing.xl}`,
  },
  borderRadius: borderRadius.md,
  fontWeight: typography.fontWeight.medium,
  transition: transitions.default,

  variants: {
    primary: {
      backgroundColor: colors.primary.main,
      color: colors.text.inverse,
      '&:hover': {
        backgroundColor: colors.primary.dark,
      },
    },
    secondary: {
      backgroundColor: 'transparent',
      color: colors.primary.main,
      border: `1px solid ${colors.primary.main}`,
      '&:hover': {
        backgroundColor: colors.primary.main,
        color: colors.text.inverse,
      },
    },
  },
};

export const input = {
  padding: `${spacing.md} ${spacing.lg}`,
  borderRadius: borderRadius.md,
  border: `1px solid ${colors.border.primary}`,
  fontSize: typography.fontSize.base,
  transition: transitions.default,

  '&:focus': {
    outline: 'none',
    borderColor: colors.primary.main,
    boxShadow: `0 0 0 3px ${colors.primary.main}20`,
  },
};

export default {
  colors,
  spacing,
  typography,
  borderRadius,
  shadows,
  transitions,
  breakpoints,
  zIndex,
  card,
  button,
  input,
};
