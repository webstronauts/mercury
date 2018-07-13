const decamelize = require('decamelize')
const hoek = require('hoek')
const { HttpError, InternalServerError } = require('http-errors')

const internals = {}

internals.serializeError = (error, message) => ({
  error: {
    code: decamelize(error.name).replace(/_error$/, ''),
    message: error.expose ? error.message : message
  }
})

internals.logError = function (err) {
  if (!(err instanceof HttpError)) {
    this.log.fatal(err.message)
  }
}

internals.defaultOptions = {
  message: 'An unexpected error occured',
  serializer: internals.serializeError,
  logger: internals.logError
}

const errorHandler = module.exports = async function (app, options) {
  const settings = hoek.applyToDefaults(internals.defaultOptions, options)

  app.ready(err => {
    if (err) {
      throw err
    }

    app.use((err, req, res, next) => {
      settings.logger.call(app, err)

      const error = err instanceof HttpError ? err : new InternalServerError()
      res.status(error.status).send(settings.serializer(error, settings.message))
    })
  })
}

errorHandler.catchErrors = function (fn) {
  return (req, res, next) => fn(req, res, next).catch(next)
}
