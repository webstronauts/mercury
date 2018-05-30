const request = require('supertest')
const test = require('ava')
const mercury = require('../lib/index')

test('Mercury can be booted', async t => {
  t.plan(3)

  const app = mercury({ logger: 'fatal' })

  app.get('/', (req, res) => {
    res.send('Hello, world!')
  })

  const res = await request(app)
    .get('/')

  t.is(res.status, 200)
  t.is(res.text, 'Hello, world!')
  t.falsy(res.headers['x-powered-by'])
})

test.cb('Additional plugins can be loaded', t => {
  t.plan(4)

  const app = mercury({ logger: 'fatal' })

  function nestedPlugin (app, opts, done) {
    t.pass()
    done()
  }

  function plugin (app, opts, done) {
    t.pass()

    app.load(nestedPlugin)
    done()
  }

  app.load(plugin)

  app.ready(function (err) {
    t.falsy(err)
    t.pass()
    t.end()
  })
})
