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
