import decamelize from 'decamelize'
import hoek from 'hoek'
import createError from 'http-errors'

const internals = {}

internals.defaultOptions = {
  message: 'An unexpected error occured',
  serializer: internals.serializeError,
  logger: internals.logError
}

export default async function errorHandler (app, options) {
  const settings = hoek.applyToDefaults(internals.defaultOptions, options)

  app.ready((err, done) => {
    if (err) {
      return done(err)
    }

    app.use((err, req, res, next) => {
      settings.logger.apply(app, [err])

      const error = createError(err)
      res.status(error.status).send(settings.serialize(error, settings.message))
    })
  })
}

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

export function catchErrors (fn) {
  return (req, res, next) => fn(req, res, next).catch(next)
}
