const request = require('supertest')
const test = require('ava')
const cli = require('../lib/cli')

test('should start the server', async t => {
  t.plan(1)

  const app = await cli.run('./example/index.js', {logLevel: 'error'})
  const res = await request(app).get('/')

  t.is(res.text, 'Hello, world!')

  await app.shutdown()
})
