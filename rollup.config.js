import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import buble from 'rollup-plugin-buble';
import multiEntry from 'rollup-plugin-multi-entry';
import babel from '@rollup/plugin-babel';
import pkg from './package.json';

const { version, author, name, main, license, description, module } = pkg;

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

export default [
    {
        input: 'src/index.js',
        output: {
            file: main,
            name,
            sourcemap: true,
            format: 'umd',
            banner,
        },
        plugins: [
            resolve({
                module: false,
                browser: true,
            }),
            commonjs({ include: 'node_modules/**' }),
            babel({
                babelHelpers: 'runtime',
                exclude: 'node_modules/**',
            }),
            buble(),
        ],
    },
    {
        input: 'src/index.js',
        output: {
            file: module,
            name,
            sourcemap: true,
            format: 'esm',
            banner,
        },
        plugins: [
            resolve({
                module: false,
                browser: true,
            }),
            commonjs({ include: 'node_modules/**' }),
            babel({ babelHelpers: 'runtime', exclude: 'node_modules/**' }),
        ],
    },
    {
        input: 'tests/**/*.test.js',
        output: {
            file: 'dist/tests.bundle.js',
            name: 'lib',
            sourcemap: true,
            format: 'iife',
            banner,
            globals: {
                chai: 'chai',
                it: 'it',
                describe: 'describe',
            },
        },
        external: ['chai', 'it', 'describe'],
        plugins: [
            resolve({
                module: false,
                browser: true,
            }),
            commonjs({ include: 'node_modules/**' }),
            babel({ babelHelpers: 'runtime', exclude: 'node_modules/**' }),
            multiEntry(),
            buble(),
        ],
    },
];
