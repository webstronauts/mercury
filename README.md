# mercury

A [Node.js](https://nodejs.org) framework built on top of [Express](https://expressjs.com/).

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Usage

```js
const app = require('@webstronauts/mercury')()

app.get('/', (req, res) => {
  res.send('Hello, world!')
})

async function start () {
  await app.listen(4000, '0.0.0.0')

  const { port, address } = app.server.address()
  app.log.info(`Server running → ${address}:${port}`)
}

start()
```
