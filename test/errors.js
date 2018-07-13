const { NotFound } = require('http-errors')
const request = require('supertest')
const test = require('ava')
const mercury = require('../lib/index')

test('Errors are serialized', async t => {
  t.plan(2)

  const app = mercury({ logger: 'silent' })
  app.load(mercury.errors)

  const message = 'This route cannot be found 🙈'

  app.get('/', (req, res) => {
    throw new NotFound(message)
  })

  const res = await request(app)
    .get('/')

  t.is(res.status, 404)
  t.deepEqual(res.body, { error: { code: 'not_found', message } })
})

test('Error message is generic when it should not be exposed', async t => {
  t.plan(2)

  const app = mercury({ logger: 'silent' })
  app.load(mercury.errors)

  app.get('/', (req, res) => {
    const err = new Error('This message should not be exposed')
    err.name = 'FatalSecurityError'

    throw err
  })

  const res = await request(app)
    .get('/')

  t.is(res.status, 500)
  t.deepEqual(res.body, { error: { code: 'internal_server', message: 'An unexpected error occured' } })
})
