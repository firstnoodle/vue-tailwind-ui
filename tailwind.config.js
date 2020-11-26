module.exports = {
  purge: [],
  theme: {
    backgroundColor: theme => ({
      ...theme('colors'), // keeping the default colors for now
      default: 'var(--background-default-color)',
      action: 'var(--action)',
      'light-blue-40': 'var(--light-blue-40)',
      'golden-sun-lighter': 'var(--golden-sun-lighter)',
      'lava-red-darker': 'var(--lava-red-darker)',
    }),
    borderColor: theme => ({
      ...theme('colors'),
      brand: 'var(--brand-color)',
      action: 'var(--action-color)',
      subtle: 'var(--border-subtle-color)',
      default: 'var(--border-default-color)',
      strong: 'var(--border-strong-color)',
    }),
    textColor: theme => ({
      ...theme('colors'), // keeping the default colors for now
      brand: 'var(--brand-color)',
      action: 'var(--action-color)',
      primary: 'var(--text-primary-color)',
      secondary: 'var(--text-secondary-color)',
      'light-blue-darker': 'var(--light-blue-darker)'
    }),
    extend: {
      cursor: {
        grab: 'grab',
      },
      maxWidth: {
        '7xl': '80rem',
        '8xl': '90rem',
      },
      boxShadow: {
        'inner-sm': 'inset 0 1px 3px 0 rgba(0, 0, 0, 0.06)',
      }
    }
  },
  variants: {
    backgroundColor: ['active', 'focus', 'group-focus', 'responsive', 'hover', 'group-hover'],
    borderStyle: [ 'focus-within', 'last'],
    borderColor: ['first', 'focus', 'focus-within', 'hover', 'group-focus', 'last', 'responsive'],
    boxShadow: ['focus', 'focus-within', 'responsive'],
    margin: ['first', 'last', 'responsive'],
    opacity: ['focus', 'focus-within', 'group-focus', 'hover'],
    padding: ['first', 'last', 'responsive'],
    textColor: ['group-hover', 'hover'],
    zIndex: ['focus', 'hover']
  },
  plugins: [],
}
