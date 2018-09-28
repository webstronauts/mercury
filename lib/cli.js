#!/usr/bin/env node
const path = require('path')
const assert = require('assert')
const meow = require('meow')
const pump = require('pump')
const mercury = require('./index')

const {PORT = 3000} = process.env

const cli = meow(
  `
  Usage
    $ mercury <script>

  Options
    --port, -p  Port to listen on (default to $PORT or 3000)
    --address, -a  Address to listen on (default to 0.0.0.0)
    --log-level -l  Log level (default to fatal)
    --pretty-logs -P  Prints pretty logs
`,
  {
    flags: {
      port: {
        type: 'string',
        alias: 'p',
        default: PORT,
      },
      address: {
        type: 'string',
        alias: 'a',
        default: '0.0.0.0',
      },
      logLevel: {
        type: 'string',
        alias: 'l',
        default: 'fatal',
      },
      prettyLogs: {
        type: 'boolean',
        alias: 'P',
        default: false,
      },
    },
  },
)

async function run(file = '.', opts) {
  const plugin = require(path.resolve(process.cwd(), file))

  const defaultOptions = {
    logger: {level: opts.logLevel},
  }

  if (opts.prettyLogs) {
    const pinoColada = require('pino-colada')()
    defaultOptions.logger.stream = pinoColada
    pump(pinoColada, process.stdout, assert.ifError)
  }

  const app = mercury(defaultOptions).load(plugin)

  await app.listen(opts.port, opts.address)

  const {port, address} = app.server.address()
  app.log.info(`Server running → ${address}:${port}`)

  return app
}

module.exports = {run}

if (require.main === module) {
  require('dotenv').config()
  run(cli.input[0], cli.flags)
}
