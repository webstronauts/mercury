const express = require('express')
const flow = require('lodash.flow')

function Application (opts = {}) {
  const app = flow(
    // Top our Express instance with some Avvio sugar.
    require('./register'), require('./shutdown'), require('./listen')
  )(express())

  // Register some required plugins.
  app.register(require('./logger'), opts.logger)

  return app
}

Application.errors = require('./errors')

module.exports = Application
