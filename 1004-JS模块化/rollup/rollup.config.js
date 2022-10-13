module.exports = {
  input: './src/index.js',
  output: [
    {
      name: 'nick',
      dir: './dist/cjs',
      format: 'cjs'
    },
    {
      name: 'nick',
      dir: './dist/amd',
      format: 'amd'
    },
    {
      name: 'nick',
      dir: './dist/esm',
      format: 'es'
    },
    {
      name: 'nick',
      dir: './dist/iife',
      format: 'iife'
    },
    {
      name: 'nick',
      dir: './dist/umd',
      format: 'umd'
    }
  ]
}
