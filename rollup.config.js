import uglify from 'rollup-plugin-uglify';
import { minify } from 'uglify-es';

export default {
  input: "src/index.js",
  output: {
    file: "docs/dist/calendar.min.js",
    format: "iife"
  },
  plugins: [
    // uglify({mangle:true, compress:true}, minify)
  ]
};
