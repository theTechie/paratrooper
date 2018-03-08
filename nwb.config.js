module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'Paratrooper',
      externals: {
        react: 'React'
      }
    }
  }
}
