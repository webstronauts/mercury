export async function build (task) {
  await task.source('src/**/*.js').babel({
    presets: [
      ['env', {
        targets: { node: 'current' }
      }]
    ],
    plugins: [
      'transform-object-rest-spread',
      'transform-runtime'
    ],
    env: {
      test: {
        plugins: [
          'istanbul'
        ],
        sourceMaps: 'inline'
      }
    }
  }).target('dist')
}

export default async function (task) {
  await task.clear('dist').start('build')
}
