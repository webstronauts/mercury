import next from 'next'

function resolveQuery (req) {
  return { ...req.app.locals, ...req.params, ...req.query }
}

export default async function (app, opts) {
  // Expose the Next instance to the application.
  app.next = next(opts)

  // Prepare the Next instance.
  await app.next.prepare()

  // Expose a helper function for rendering pages.
  app.renderPage = function (path) {
    return (req, res) => {
      app.next.render(req, res, path || req.path, resolveQuery(req))
    }
  }

  app.renderPageToHTML = function (req, res, path) {
    return app.next.renderToHTML(req, res, path || req.path, resolveQuery(req))
  }
}
