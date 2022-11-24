import path from 'path';
import fs from 'fs';
import minimist from 'minimist';
import getURL from './index';

/* eslint no-sync:0 no-console:0 */
const usage = fs.readFileSync(path.resolve(__dirname, '../usage.txt'), 'utf8');
const args = minimist(process.argv.slice(2), {
  boolean: ['debug']
});

args.version = args._[0] || args.version || 'stable';

if (args.help || args.h) {
  console.error(usage);
  process.exitCode = 1;
} else {
  getURL(args as any)
    .then(pkg => console.log(pkg.url))
    .catch(err => { process.nextTick(() => { throw err; }); });
}
