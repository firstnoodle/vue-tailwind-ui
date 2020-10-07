module.exports = {
  purge: [],
  theme: {
    backgroundColor: theme => ({
      ...theme('colors'), // keeping the default colors for now
      page: 'var(--page-background-color)',
    }),
    textColor: theme => ({
      ...theme('colors'), // keeping the default colors for now
      primary: 'var(--text-primary-color)',
      secondary: 'var(--text-secondary-color)',
      action: 'var(--text-action-color)'
    })
  },
  variants: {
    margin: ['first', 'last', 'responsive']
  },
  plugins: [],
}
