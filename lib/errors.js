const decamelize = require('decamelize')
const hoek = require('hoek')
const createError = require('http-errors')

const internals = {}

internals.serializeError = (error, message) => ({
  error: {
    code: decamelize(error.name).replace(/_error$/, ''),
    message: error.expose ? error.message : message
  }
})

internals.logError = function (error) {
  if (!(error instanceof createError.HttpError)) {
    this.log.error(error.message)
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
      settings.logger.apply(app, [err])

      const error = createError(err)
      res.status(error.status).send(settings.serializer(error, settings.message))
    })
  })
}

errorHandler.catchErrors = function (fn) {
  return (req, res, next) => fn(req, res, next).catch(next)
}
