const createError = require('http-errors')
const request = require('supertest')
const test = require('ava')
const mercury = require('../lib/index')

test('Errors are serialized', async t => {
  t.plan(2)

  const app = mercury({ logger: 'fatal' })
  app.load(mercury.errors)

  const message = 'This route cannot be found 🙈'

  app.get('/', (req, res) => {
    throw new createError.NotFound(message)
  })

  const res = await request(app)
    .get('/')

  t.is(res.status, 404)
  t.deepEqual(res.body, { error: { code: 'not_found', message } })
})
