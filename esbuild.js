const { build } = require('esbuild');

const common = {
  entryPoints: ['./oddslib.mjs'],
  bundle: true,
  platform: 'node',
};

build({
  ...common,
  outfile: 'dist/oddslib.cjs.js',
});

build({
  ...common,
  outfile: 'dist/oddslib.esm.js',
  format: 'esm'
});
    
