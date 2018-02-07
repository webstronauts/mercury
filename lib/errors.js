const decamelize = require('decamelize')
const { HttpError, InternalServerError } = require('http-errors')

function serializeError (error, message) {
  return {
    error: {
      code: decamelize(error.name).replace(/_error$/, ''),
      message: error.expose ? error.message : message
    }
  }
}

async function errorHandler (app, options) {
  const message = options.message || 'An unexpected error occured'
  const serialize = options.serialize || serializeError

  app.use((err, req, res, next) => {
    app.log.error(err.message)

    const error = err instanceof HttpError ? err : new InternalServerError()
    res.status(error.status).send(serialize(error, message))
  })
}

errorHandler.catchErrors = function (fn) {
  return (req, res, next) => fn(req, res, next).catch(next)
}

module.exports = errorHandler
