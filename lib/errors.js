const decamelize = require('decamelize')
const createError = require('http-errors')

async function errorHandler (app, options) {
  const serializeError = (error, message) => ({
    error: {
      code: decamelize(error.name).replace(/_error$/, ''),
      message: error.expose ? error.message : message
    }
  })

  const logError = error => {
    if (!(error instanceof createError.HttpError)) {
      app.log.error(error.message)
    }
  }

  const message = options.message || 'An unexpected error occured'
  const serialize = options.serialize || serializeError
  const logger = options.logger || logError

  app.ready((err, done) => {
    if (err) {
      return done(err)
    }

    app.use((err, req, res, next) => {
      logger(err)

      const error = createError(err)
      res.status(error.status).send(serialize(error, message))
    })
  })
}

errorHandler.catchErrors = function (fn) {
  return (req, res, next) => fn(req, res, next).catch(next)
}

module.exports = errorHandler
