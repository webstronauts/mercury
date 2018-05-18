const request = require('supertest')
const test = require('ava')
const mercury = require('../lib/index')

function createMercuryInstance () {
  return mercury({ logger: { level: 'silent' } })
}

test('Mercury can be booted', async t => {
  t.plan(3)

  const app = createMercuryInstance()

  app.get('/', (req, res) => {
    res.send('Hello, world!')
  })

  const res = await request(app)
    .get('/')

  t.is(res.status, 200)
  t.is(res.text, 'Hello, world!')
  t.falsy(res.headers['x-powered-by'])
})
