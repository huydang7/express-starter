const { build } = require('esbuild');

const options = {
  bundle: true,
  sourcemap: true,
  platform: 'node',
  entryPoints: ['./src/index.ts'],
  incremental: true,
  minify: true,
  outfile: 'dist/index.js',
};

build(options);
