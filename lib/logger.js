const httpLogger = require('pino-http')
const logger = require('pino')
const omit = require('lodash.omit')
const pick = require('lodash.pick')

const httpOpts = ['genReqId', 'useLevel', 'stream']

module.exports = async function (app, opts) {
  app.log = logger(omit(opts, httpOpts))

  app.use(httpLogger({
    logger: app.log,
    ...pick(opts, httpOpts)
  }))
}
