const express = require('express')
const flow = require('lodash.flow')

function mercury (opts = {}) {
  const app = flow(
    // Top our Express instance with some Avvio sugar.
    require('./register'), require('./shutdown'), require('./listen')
  )(express())

  // Register some required plugins.
  app.register(require('./logger'), opts.logger)
  app.register(require('./next'), opts.next)

  return app
}

mercury.errors = require('./errors')

module.exports = mercury
