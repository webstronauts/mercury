const app = require('../index')()

async function start () {
  await app.listen(4000, '0.0.0.0')
  console.log(app)

  process.on('SIGTERM', async () => {
    console.log('Received SIGTERM asynchronously')
    await app.shutdown()
    process.exit(0)
  })

  // const { port, address } = app.server.address()
  // app.log.info(`Server running → ${address}:${port}`)
}

start()
