#!/usr/bin/env node
require('shelljs/global');

set('-e');

env.TEMP_DIR = env.HOME + '/valid_deps_temp';
env.SCRIPT_DIR = __dirname;

cd(env.SCRIPT_DIR);

if (process.argv[2]) {
  env.PACKAGE = process.argv[2] + '/package.json';
  if (!test('-f', env.PACKAGE)) {
    echo('Not found ' + env.PACKAGE);
    exit(1);
  }
  env.PACKAGES = [env.PACKAGE];
} else {
  env.PACKAGES = exec('find . -name package.json -maxdepth 3 -not -path "*/.*"');
}

for (const i in env.PACKAGES.split('\n')) {
  env.PACKAGE = env.PACKAGES.split('\n')[i];
  env.PACKAGE_DIR = exec('dirname $PACKAGE').replace(/\n+$/, '');
  echo('PACKAGE_DIR: ' + env.PACKAGE_DIR);
  cd(env.SCRIPT_DIR);
  echo('---------------------------------------------------');
  echo('| package: ' + env.PACKAGE_DIR);
  echo('---------------------------------------------------');
  echo();
  echo('Copying ' + env.PACKAGE_DIR + ' project...');
  rm('-rf', env.TEMP_DIR);
  cp('-R', env.PACKAGE_DIR, env.TEMP_DIR);
  cd(env.TEMP_DIR);
  rm('-rf', 'node_modules');
  echo('Installing...');
  exec('npm install --loglevel error --no-progress');
  echo('Building...');
  exec('npm run build');
}

rm('-rf', env.TEMP_DIR);
