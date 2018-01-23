const avvio = require('avvio')

module.exports = function (app) {
  avvio(app, {
    expose: {
      use: 'register'
    }
  })

  return app
}
