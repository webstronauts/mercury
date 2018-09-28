<div align="center">

# mercury ⚗️

An opinionated framework built on top of [Express](https://expressjs.com/) and [avvio](https://www.npmjs.com/package/avvio).

<hr />

[![License](https://img.shields.io/github/license/webstronauts/mercury.svg)](LICENSE.md)
[![Version](https://img.shields.io/npm/v/@webstronauts/mercury.svg)](https://www.npmjs.com/package/@webstronauts/mercury)
[![Build Status](https://travis-ci.org/webstronauts/mercury.svg?branch=master)](https://travis-ci.org/webstronauts/mercury)
[![Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

</div>

## Installation

This package is distributed via [NPM](https://www.npmjs.com/package/@webstronauts/mercury) which is bundled with [Node](https://nodejs.org/) and should be installed as one of your project's `dependencies`:

```
npm install --save @webstronauts/mercury
```

## Usage

Your application can be as simple as:

```js
// app.js
module.exports = function(app, options, next) {
  app.get('/', function(req, res) {
    res.send({hello: 'world'})
  })

  next()
}
```

If you are using Node 8+, you can use `async` functions too:

```js
// async-await-plugin.js
module.exports = async function(app, options) {
  app.get('/', async function(req, res) {
    res.send({hello: 'world'})
  })
}
```

Then you can start your application with;

```
mercury start plugin.js
```

## Inspiration

We're not re-inventing the wheel here. The inspiration for this framework comes from a couple of other awesome projects;

- https://github.com/mcollina/avvio
- https://github.com/fastify/fastify-cli

## Author(s)

Robin van der Vleuten ([@robinvdvleuten](https://twitter.com/robinvdvleuten)) - [The Webstronauts](https://www.webstronauts.co?utm_source=github&utm_medium=readme&utm_content=mercury)
