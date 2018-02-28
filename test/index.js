import cheerio from 'cheerio'
import request from 'supertest'
import test from 'ava'
import mercury from '../index'

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

test('Next can be used to render routes', async t => {
  t.plan(2)

  const app = createMercuryInstance()

  app.ready(err => {
    if (err) throw err
    app.get('/foo', app.renderPage('/'))
  })

  const res = await request(app)
    .get('/foo')

  const $ = cheerio.load(res.text)

  t.is(res.status, 200)
  t.is($('[data-reactroot]').text(), 'Hello, world!')
})

test('Next can be used to render HTML', async t => {
  t.plan(2)

  const app = createMercuryInstance()

  app.ready(err => {
    if (err) throw err

    app.get('/bar', async (req, res) => {
      const html = await app.renderPageToHTML(req, res, '/')
      res.send(html)
    })
  })

  const res = await request(app)
    .get('/bar')

  const $ = cheerio.load(res.text)

  t.is(res.status, 200)
  t.is($('[data-reactroot]').text(), 'Hello, world!')
})

test('Next can be used to redirect requests', async t => {
  t.plan(2)

  const app = createMercuryInstance()

  app.ready(err => {
    if (err) throw err
    app.get('/baz', app.renderPage())
  })

  const res = await request(app)
    .get('/baz')

  t.is(res.status, 302)
  t.is(res.header.location, '/bar')
})
