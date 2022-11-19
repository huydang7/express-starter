const esbuild = require('esbuild');

esbuild.build({
  entryPoints: ['src/index.ts'],
  outfile: 'dist/index.js',
  bundle: true,
  minify: true,
  platform: 'node',
  sourcemap: false,
  watch: false,
});
