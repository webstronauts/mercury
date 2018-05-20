const request = require('supertest')
const test = require('ava')

const createMercuryInstance = () => require('../lib/index')({
  logger: { level: 'error' }
})

test('Mercury can be booted', async t => {
  t.plan(3)

  const mercury = createMercuryInstance()

  mercury.get('/', (req, res) => {
    res.send('Hello, world!')
  })

  const res = await request(mercury)
    .get('/')

  t.is(res.status, 200)
  t.is(res.text, 'Hello, world!')
  t.falsy(res.headers['x-powered-by'])
})

test.cb('Additional plugins can be loaded', t => {
  t.plan(3)

  const mercury = createMercuryInstance()

  function nestedPlugin (mercury, opts, done) {
    t.pass()
    done()
  }

  function plugin (mercury, opts, done) {
    t.pass()

    mercury.load(nestedPlugin)
    done()
  }

  mercury.load(plugin)

  mercury.ready(function () {
    t.pass()
    t.end()
  })
})
