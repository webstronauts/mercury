import wrap from 'lodash.wrap'

export default function (app) {
  app.listen = wrap(app.listen, (listen, ...args) => new Promise(async (resolve, reject) => {
    // Make sure the loaded plugins are all ready prior to start listening.
    await app.ready()

    // Expose the returned server object to the Express instance.
    app.server = listen.apply(app, [...args, () => process.nextTick(resolve)])
  }))

  return app
}
