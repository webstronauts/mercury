# mercury

An opinionated framework built on top of [Express](https://expressjs.com/) and [Next.js](https://github.com/zeit/next.js/).

<img src="https://media.giphy.com/media/jaBE1ctpbIv0k/200w_d.gif" width="200" />

[![Build Status](https://semaphoreci.com/api/v1/projects/6c426a6f-60a5-4716-9f09-797a2913ad55/1814984/shields_badge.svg)](https://semaphoreci.com/webstronauts/mercury)
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
