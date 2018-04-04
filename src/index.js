import express from 'express'
import flow from 'lodash.flow'
import errors, { catchErrors } from './errors'
import listen from './listen'
import logger from './logger'
import register from './register'
import shutdown from './shutdown'

function mercury (opts = {}) {
  const app = flow(
    // Top our Express instance with some Avvio sugar.
    register, shutdown, listen
  )(express())

  // Disable X-Powered-By header by default.
  app.disable('x-powered-by')

  // Register some plugins by default.
  app.register(logger, opts.logger)

  return app
}

// Expose static handler
mercury.static = express.static

// Expose error handlers
mercury.errors = errors
mercury.catchErrors = catchErrors

export default mercury
