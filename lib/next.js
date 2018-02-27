const next = require('next')

module.exports = async function (app, opts) {
  // Expose the Next instance to the application.
  app.next = next(opts)

  await app.next.prepare()
}
