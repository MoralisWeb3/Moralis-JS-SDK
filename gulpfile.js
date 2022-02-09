/* eslint-disable prefer-template */
/* eslint-disable prefer-arrow-callback */
const babel = require('gulp-babel');
const browserify = require('browserify');
const derequire = require('gulp-derequire');
const gulp = require('gulp');
const insert = require('gulp-insert');
const path = require('path');
const rename = require('gulp-rename');
const source = require('vinyl-source-stream');
const terser = require('gulp-terser');
const watch = require('gulp-watch');

const BUILD = process.env.PARSE_BUILD || 'browser';
const VERSION = require('./package.json').version;
const SRC = ['src/**/*.js', '!src/__tests__/**/*.js', '!src/interfaces/**/*.js'];

const transformRuntime = [
  '@babel/plugin-transform-runtime',
  {
    corejs: 3,
    helpers: true,
    regenerator: true,
    useESModules: false,
  },
];

const PRESETS = {
  browser: [
    [
      '@babel/preset-env',
      {
        targets: '> 0.25%, not dead',
      },
    ],
    '@babel/preset-react',
  ],
  weapp: [
    [
      '@babel/preset-env',
      {
        targets: '> 0.25%, not dead',
      },
    ],
    '@babel/preset-react',
  ],
  node: [
    [
      '@babel/preset-env',
      {
        targets: { node: '8' },
      },
    ],
  ],
  'react-native': ['module:metro-react-native-babel-preset'],
  web3api: [
    [
      '@babel/preset-env',
      {
        targets: { browsers: '> 0.25%, not dead', node: '8' },
      },
    ],
  ],
  solanaapi: [
    [
      '@babel/preset-env',
      {
        targets: { browsers: '> 0.25%, not dead', node: '8' },
      },
    ],
  ],
};
const PLUGINS = {
  browser: [
    transformRuntime,
    '@babel/plugin-transform-flow-comments',
    '@babel/plugin-proposal-class-properties',
    'inline-package-json',
    ['transform-inline-environment-variables', { exclude: ['SERVER_RENDERING'] }],
  ],
  weapp: [
    transformRuntime,
    '@babel/plugin-transform-flow-comments',
    '@babel/plugin-proposal-class-properties',
    'inline-package-json',
    ['transform-inline-environment-variables', { exclude: ['SERVER_RENDERING'] }],
  ],
  node: [
    '@babel/plugin-transform-flow-comments',
    'inline-package-json',
    'transform-inline-environment-variables',
  ],
  'react-native': [
    '@babel/plugin-transform-flow-comments',
    'inline-package-json',
    'transform-inline-environment-variables',
  ],
  web3api: [
    transformRuntime,
    '@babel/plugin-transform-flow-comments',
    '@babel/plugin-proposal-class-properties',
    'inline-package-json',
    'transform-inline-environment-variables',
  ],
  solanaapi: [
    transformRuntime,
    '@babel/plugin-transform-flow-comments',
    '@babel/plugin-proposal-class-properties',
    'inline-package-json',
    'transform-inline-environment-variables',
  ],
};

const getDevHeader = () => {
  const nextVersion = process.env.NEXT_VERSION;

  if (!nextVersion) {
    throw new Error('NEXT_VERSION not set');
  }

  return (
    '/**\n' +
    ' * Moralis JavaScript SDK v' +
    nextVersion +
    '' +
    '\n' +
    ' *\n' +
    ' * The source tree of this library can be found at\n' +
    ' *   https://github.com/MoralisWeb3/Moralis-JS-SDK\n' +
    ' */\n'
  );
};

const getFullHeader = () => {
  const nextVersion = process.env.NEXT_VERSION;

  if (!nextVersion) {
    throw new Error('NEXT_VERSION not set');
  }

  return (
    '/**\n' +
    ' * Moralis JavaScript SDK v' +
    nextVersion +
    '' +
    '\n' +
    ' *\n' +
    ' * Copyright (c) 2015-present, Moralis.\n' +
    ' * All rights reserved.\n' +
    ' *\n' +
    ' * The source tree of this library can be found at\n' +
    ' *   https://github.com/MoralisWeb3/Moralis-JS-SDK\n' +
    ' * This source code is licensed under the BSD-style license found in the\n' +
    ' * LICENSE file in the root directory of this source tree. An additional grant\n' +
    ' * of patent rights can be found in the PATENTS file in the same directory.\n' +
    ' */\n'
  );
};

gulp.task('compile', function () {
  return (
    gulp
      .src(SRC)
      .pipe(
        babel({
          presets: PRESETS[BUILD],
          plugins: PLUGINS[BUILD],
        })
      )
      // Second pass to kill BUILD-switched code
      .pipe(
        babel({
          plugins: ['minify-dead-code-elimination'],
        })
      )
      .pipe(gulp.dest(path.join('lib', BUILD)))
  );
});

gulp.task('compile-web3api', function () {
  return (
    gulp
      .src('src/MoralisWeb3Api.js')
      .pipe(
        babel({
          presets: PRESETS[BUILD],
          plugins: PLUGINS[BUILD],
        })
      )
      // Second pass to kill BUILD-switched code
      .pipe(
        babel({
          plugins: ['minify-dead-code-elimination'],
        })
      )
      .pipe(rename('index.js'))
      .pipe(gulp.dest(path.join('lib', BUILD)))
  );
});

gulp.task('compile-solanaapi', function () {
  return (
    gulp
      .src('src/MoralisSolanaApi.js')
      .pipe(
        babel({
          presets: PRESETS[BUILD],
          plugins: PLUGINS[BUILD],
        })
      )
      // Second pass to kill BUILD-switched code
      .pipe(
        babel({
          plugins: ['minify-dead-code-elimination'],
        })
      )
      .pipe(rename('index.js'))
      .pipe(gulp.dest(path.join('lib', BUILD)))
  );
});

gulp.task('browserify', function (cb) {
  const stream = browserify({
    builtins: ['_process', 'events', 'timers'],
    entries: 'lib/browser/Parse.js',
    standalone: 'Moralis',
  })
    .exclude('xmlhttprequest')
    .ignore('_process')
    .ignore('@walletconnect/web3-provider')
    .ignore('magic-sdk')
    .ignore('@web3auth/web3auth')
    .bundle();
  stream.on('end', () => {
    cb();
  });
  return stream
    .pipe(source('moralis.js'))
    .pipe(derequire())
    .pipe(insert.prepend(getDevHeader()))
    .pipe(gulp.dest('./dist'));
});

gulp.task('browserify-weapp', function (cb) {
  const stream = browserify({
    builtins: ['_process', 'events', 'timers'],
    entries: 'lib/weapp/Parse.js',
    standalone: 'Moralis',
  })
    .exclude('xmlhttprequest')
    .ignore('_process')
    .ignore('@walletconnect/web3-provider')
    .ignore('@web3auth/web3auth')
    .ignore('magic-sdk')
    .bundle();
  stream.on('end', () => {
    cb();
  });
  return stream
    .pipe(source('moralis.weapp.js'))
    .pipe(derequire())
    .pipe(insert.prepend(getDevHeader()))
    .pipe(gulp.dest('./dist'));
});

gulp.task('browserify-web3api', function (cb) {
  const stream = browserify({
    builtins: ['_process', 'events', 'timers'],
    entries: 'lib/web3api/index.js',
    standalone: 'Web3Api',
  })
    .exclude('xmlhttprequest')
    .ignore('_process')
    .bundle();
  stream.on('end', () => {
    cb();
  });
  return stream
    .pipe(source('moralis.web3api.js'))
    .pipe(derequire())
    .pipe(insert.prepend(getDevHeader()))
    .pipe(gulp.dest('./dist'));
});

gulp.task('browserify-solanaapi', function (cb) {
  const stream = browserify({
    builtins: ['_process', 'events'],
    entries: 'lib/solanaapi/index.js',
    standalone: 'SolanaApi',
  })
    .exclude('xmlhttprequest')
    .ignore('_process')
    .bundle();
  stream.on('end', () => {
    cb();
  });
  return stream
    .pipe(source('moralis.solanaapi.js'))
    .pipe(derequire())
    .pipe(insert.prepend(getDevHeader()))
    .pipe(gulp.dest('./dist'));
});

gulp.task('minify', function () {
  return gulp
    .src('dist/moralis.js')
    .pipe(terser())
    .pipe(insert.prepend(getFullHeader()))
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest('./dist'));
});

gulp.task('minify-weapp', function () {
  return gulp
    .src('dist/moralis.weapp.js')
    .pipe(terser())
    .pipe(insert.prepend(getFullHeader()))
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest('./dist'));
});

gulp.task('minify-web3api', function () {
  return gulp
    .src('dist/moralis.web3api.js')
    .pipe(terser())
    .pipe(insert.prepend(getFullHeader()))
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest('./dist'));
});

gulp.task('minify-solanaapi', function () {
  return gulp
    .src('dist/moralis.solanaapi.js')
    .pipe(terser())
    .pipe(insert.prepend(getFullHeader()))
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest('./dist'));
});

gulp.task('watch', function () {
  return (
    watch(SRC, { ignoreInitial: false, verbose: true })
      .pipe(
        babel({
          presets: PRESETS[BUILD],
          plugins: PLUGINS[BUILD],
        })
      )
      // Second pass to kill BUILD-switched code
      .pipe(
        babel({
          plugins: ['minify-dead-code-elimination'],
        })
      )
      .pipe(gulp.dest(path.join('lib', BUILD)))
  );
});
