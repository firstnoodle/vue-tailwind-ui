module.exports = {
  purge: [],
  theme: {
    backgroundColor: theme => ({
      ...theme('colors'), // keeping the default colors for now
      page: 'var(--page-background-color)',
    }),
    textColor: theme => ({
      ...theme('colors'), // keeping the default colors for now
      default: 'var(--text-default-color)'
    })
  },
  variants: {},
  plugins: [],
}
