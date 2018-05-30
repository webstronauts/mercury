module.exports = async function (app, options) {
  app.get('/', (req, res) => {
    res.send('Hello, world!')
  })
}
