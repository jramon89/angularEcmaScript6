/*THIS FILE IS NOT IN USE*/
import {
    rollup
}
from 'rollup';
import rollupPaths from 'rollup-plugin-includepaths';
import npm from 'rollup-plugin-npm';
import common from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import css from 'rollup-plugin-stylus-css-modules';
import style from 'rollup-plugin-css-modules';


export default {
    entry: 'app/app.js',
    format: 'cjs',
    plugins: [rollupPaths(), npm(), common(), style()],
    dest: 'bundle.js'
};
