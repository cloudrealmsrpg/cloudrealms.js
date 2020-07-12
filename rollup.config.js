// import buble from 'rollup-plugin-buble';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
// import nodeResolve from '@rollup/plugin-node-resolve';
// import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import pkg from './package.json';

const { version, author, name, main, license, description } = pkg;

const banner = `\
/**
 * ${name} v${version}
 * ${description}
 *
 * @author ${author}
 * @license ${license}
 * @preserve
 */
`;

export default {
    input: 'src/cloudrealms.js',
    output: {
        file: main,
        name,
        format: 'umd',
        banner,
    },
    watch: {
        exclude: ['node_modules/**'],
        include: ['src/**'],
    },
    plugins: [babel({ babelHelpers: 'bundled' })],
};
