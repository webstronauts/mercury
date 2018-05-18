const avvio = require('avvio')

module.exports = function (app) {
  avvio.express(app)
  return app
}
