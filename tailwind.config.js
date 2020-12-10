module.exports = {
  purge: ['./src/**/*.js', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: theme => ({
       'test': "url('/src/assets/HeaderImage.jpg')",
      })
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
