export default function (app) {
  app.shutdown = function () {
    app.emit('shutdown')

    return new Promise((resolve, reject) => {
      app.server.close(() => resolve())
    })
  }

  return app
}
