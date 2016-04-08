import { rollup } from 'rollup';
import rollupPaths from 'rollup-plugin-includepaths';
import npm from 'rollup-plugin-npm';
import common from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';


export default {
    entry: 'app/app.js',
    format: 'cjs',
    plugins: [rollupPaths(),npm(), common()],
    dest: 'bundle.js'
};
