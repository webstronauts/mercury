const express = require('express')
const flow = require('lodash.flow')
const register = require('./register')
const listen = require('./listen')

module.exports = function (opts = {}) {
  // Top our Express instance with some Avvio sugar.
  const app = flow(register, listen)(express())

  // Register some required plugins.
  app.register(require('./logger'), opts.logger)

  return app
}
