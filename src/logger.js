import httpLogger from 'pino-http'
import logger from 'pino'
import omit from 'lodash.omit'
import pick from 'lodash.pick'

const httpOptions = ['genReqId', 'useLevel', 'stream']

export default async function (app, options) {
  app.log = logger(omit(options, httpOptions))

  app.use(httpLogger({
    logger: app.log,
    ...pick(options, httpOptions)
  }))
}
