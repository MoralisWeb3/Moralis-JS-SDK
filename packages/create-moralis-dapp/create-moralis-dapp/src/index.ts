#!/usr/bin/env node
import _ from 'lodash';
import { CMDGenerator } from './CMDGenerator';
import { NextAppGenerator } from '@create-moralis-dapp/next';
import { ExpressAppGenerator } from '@create-moralis-dapp/express';

async function main() {
  return new CMDGenerator([new NextAppGenerator(), new ExpressAppGenerator()]).run();
}
main();
