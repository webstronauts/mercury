const httpLogger = require('pino-http')
const logger = require('pino')
const omit = require('lodash.omit')
const pick = require('lodash.pick')

const httpOptions = ['genReqId', 'useLevel', 'stream']

module.exports = async function (app, options) {
  app.log = logger(
    omit(options, [ ...httpOptions, 'stream' ]),
    options.stream || process.stdout
  )

  app.use(httpLogger({
    logger: app.log,
    ...pick(options, httpOptions)
  }))
}
