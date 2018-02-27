const cheerio = require('cheerio')
const request = require('supertest')
const test = require('ava')
const mercury = require('../lib')

function createMercuryInstance () {
  return mercury({ logger: { level: 'silent' } })
}

test('Mercury can be booted', async t => {
  t.plan(2)

  const app = createMercuryInstance()

  app.get('/', (req, res) => {
    res.send('Hello, world!')
  })

  const res = await request(app)
    .get('/')

  t.is(res.status, 200)
  t.is(res.text, 'Hello, world!')
})

test('Next.js can be used to handle paths', async t => {
  t.plan(2)

  const app = createMercuryInstance()

  app.after(err => {
    if (err) throw err
    app.get('*', app.next.getRequestHandler())
  })

  const res = await request(app)
    .get('/')

  const $ = cheerio.load(res.text)

  t.is(res.status, 200)
  t.is($('[data-reactroot]').text(), 'Hello, world!')
})
