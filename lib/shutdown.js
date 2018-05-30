module.exports = function (app) {
  app.shutdown = function () {
    app.emit('shutdown')

    return new Promise((resolve, reject) => {
      if (!app.server) {
        return resolve()
      }

      app.server.close(() => resolve())
    })
  }

  return app
}
