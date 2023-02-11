#!/usr/bin/env node
import { CMDGenerator } from './CMDGenerator';
import { NextAppGenerator } from '@create-moralis-dapp/next';
import { ExpressAppGenerator } from '@create-moralis-dapp/express';
import { ReactCraAppGenerator } from '@create-moralis-dapp/react-cra';

async function main() {
  return new CMDGenerator([new NextAppGenerator(), new ExpressAppGenerator(), new ReactCraAppGenerator()]).run();
}
main();
