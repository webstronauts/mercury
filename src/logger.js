import httpLogger from 'pino-http'
import logger from 'pino'
import omit from 'lodash.omit'
import pick from 'lodash.pick'

const httpOpts = ['genReqId', 'useLevel', 'stream']

export default async function (app, opts) {
  app.log = logger(omit(opts, httpOpts))

  app.use(httpLogger({
    logger: app.log,
    ...pick(opts, httpOpts)
  }))
}
