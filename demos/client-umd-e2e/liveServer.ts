import { start } from 'live-server';

start({
  port: 8080,
  host: 'localhost',
  root: '../client-umd',
  open: false,
  mount: [['/packages/moralis/dist/moralis.min.js', '../../node_modules/moralis/dist/moralis.min.js']],
});
