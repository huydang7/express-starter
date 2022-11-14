const esbuild = require('esbuild');
// const copyStaticFiles = require('esbuild-copy-static-files');

esbuild.build({
  entryPoints: ['src/index.ts'],
  outfile: 'dist/index.js',
  bundle: true,
  minify: true,
  platform: 'node',
  sourcemap: false,
  watch: false,
  // plugins: [
  //   copyStaticFiles({
  //     src: 'public',
  //     dest: 'dist/public',
  //     dereference: true,
  //     errorOnExist: false,
  //     preserveTimestamps: true,
  //     recursive: true,
  //   }),
  //   copyStaticFiles({
  //     src: 'files',
  //     dest: 'dist/files',
  //     dereference: true,
  //     errorOnExist: false,
  //     preserveTimestamps: true,
  //     recursive: true,
  //   }),
  // ],
});
