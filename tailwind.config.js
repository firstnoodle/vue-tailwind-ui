module.exports = {
  purge: [],
  theme: {
    backgroundColor: theme => ({
      ...theme('colors'), // keeping the default colors for now
      page: 'var(--page-background-color)',
    }),
    borderColor: theme => ({
      ...theme('colors'),
      brand: 'var(--brand-color)',
      action: 'var(--action-color)',
      subtle: 'var(--border-subtle-color)',
      default: 'var(--border-default-color)',
      strong: 'var(--border-strong-color)'
    }),
    textColor: theme => ({
      ...theme('colors'), // keeping the default colors for now
      brand: 'var(--brand-color)',
      action: 'var(--action-color)',
      primary: 'var(--text-primary-color)',
      secondary: 'var(--text-secondary-color)',
    }),
    extend: {
      cursor: {
        grab: 'grab',
      },
      maxWidth: {
        '7xl': '80rem',
        '8xl': '90rem',
      }
    }
  },
  variants: {
    backgroundColor: ['active', 'focus', 'group-focus', 'responsive', 'hover', 'group-hover'],
    borderStyle: ['last'],
    borderColor: ['first', 'focus', 'group-focus', 'last', 'responsive', 'focus-within'],
    boxShadow: ['focus', 'focus-within', 'responsive'],
    margin: ['first', 'last', 'responsive'],
    textColor: ['group-hover', 'hover'],
    zIndex: ['focus', 'hover']
  },
  plugins: [],
}
