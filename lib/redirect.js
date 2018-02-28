import Router from 'next/router'

export default (ctx, target, as = target, code = 302) => {
  if (ctx.res) {
    ctx.res.writeHead(code, { Location: as })
    ctx.res.end()
    return
  }

  Router.replace(target, as)
}
