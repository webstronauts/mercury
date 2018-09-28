# mercury

An opinionated framework built on top of [Express](https://expressjs.com/) and [avvio](https://www.npmjs.com/package/avvio).

<img src="https://media.giphy.com/media/jaBE1ctpbIv0k/200w_d.gif" width="200" />

[![Build Status](https://travis-ci.org/webstronauts/mercury.svg?branch=master)](https://travis-ci.org/webstronauts/mercury)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Usage

This app below starts a server and listens on port 4000 for connections;

```js
const app = require('@webstronauts/mercury')()

app.ready(err => {
  if (err) throw err

  app.post('/api/user', (req, res) => {
    // Return a JSON response.
    res.json({ foo: 'bar' })
  })
})

process.on('SIGTERM', async () => {
  // Shutdown application before exiting
  await app.shutdown()
  process.exit(0)
})

async function start () {
  await app.listen(4000, '0.0.0.0')

  const { port, address } = app.server.address()
  app.log.info(`Server running → ${address}:${port}`)
}

start()
```

## License

MIT © [The Webstronauts](https://www.webstronauts.co/?utm_source=mercury&utm_medium=github)
