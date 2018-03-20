import express from 'express'
import flow from 'lodash.flow'
import listen from './listen'
import logger from './logger'
import register from './register'
import shutdown from './shutdown'

export default function mercury (opts = {}) {
  const app = flow(
    // Top our Express instance with some Avvio sugar.
    register, shutdown, listen
  )(express())

  // Register some plugins by default.
  app.register(logger, opts.logger)

  return app
}
