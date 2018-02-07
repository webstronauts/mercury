# mercury

A [Node.js](https://nodejs.org) framework built on top of [Express](https://expressjs.com/).

<img src="https://media.giphy.com/media/jaBE1ctpbIv0k/200w_d.gif" width="200" />

[![CircleCI](https://circleci.com/gh/robinvdvleuten/mercury.svg?style=shield&circle-token=a09b28755aabd3e288318cc2860122932d9c5879)](https://circleci.com/gh/robinvdvleuten/mercury)
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
