module.exports = {
  purge: [],
  theme: {
    backgroundColor: theme => ({
      ...theme('colors'), // keeping the default colors for now
      page: 'var(--page-background-color)',
    }),
    borderColor: theme => ({
      ...theme('colors'),
      subtle: 'var(--border-subtle-color)',
      default: 'var(--border-default-color)',
      strong: 'var(--border-strong-color)'
    }),
    textColor: theme => ({
      ...theme('colors'), // keeping the default colors for now
      primary: 'var(--text-primary-color)',
      secondary: 'var(--text-secondary-color)',
      action: 'var(--text-action-color)'
    }),
    extend: {
      cursor: {
        grab: 'grab',
      }
    }
  },
  variants: {
    margin: ['first', 'last', 'responsive']
  },
  plugins: [],
}
