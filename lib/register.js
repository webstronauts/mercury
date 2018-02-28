import avvio from 'avvio'

export default function (app) {
  avvio(app, {
    expose: {
      use: 'register'
    }
  })

  return app
}
