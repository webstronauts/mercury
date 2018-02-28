import express from 'express'
import flow from 'lodash.flow'
import listen from './listen'
import logger from './logger'
import next from './next'
import register from './register'
import shutdown from './shutdown'

export default function mercury (opts = {}) {
  const app = flow(
    // Top our Express instance with some Avvio sugar.
    register, shutdown, listen
  )(express())

  // Register some required plugins.
  app.register(logger, opts.logger)
  app.register(next, opts.next)

  return app
}
