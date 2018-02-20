const request = require('supertest')
const test = require('ava')
const mercury = require('../lib')

test('mercury can be booted', async t => {
  t.plan(2)

  const app = mercury()

  app.get('/', (req, res) => {
    res.send('Hello, world!')
  })

  const res = await request(app)
    .get('/')

  t.is(res.status, 200)
  t.is(res.text, 'Hello, world!')
})
