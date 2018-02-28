import redirect from '../lib/redirect'

const Baz = () => null

Baz.getInitialProps = (ctx) => {
  redirect(ctx, '/bar')
  return {}
}

export default Baz
