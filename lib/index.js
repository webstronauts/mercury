const express = require('express')
const flow = require('lodash.flow')
const errors = require('./errors')
const listen = require('./listen')
const logger = require('./logger')
const register = require('./register')
const shutdown = require('./shutdown')

const mercury = module.exports = function (opts = {}) {
  const app = flow(
    // Top our Express instance with some Avvio sugar.
    register, shutdown, listen
  )(express())

  // Disable X-Powered-By header by default.
  app.disable('x-powered-by')

  // Load some plugins by default.
  app.load(logger, opts.logger)

  return app
}

// Expose static handler
mercury.static = express.static

// Expose error handlers
mercury.errors = errors
mercury.catchErrors = errors.catchErrors
