#!/usr/bin/env node
import { join } from 'path';
import { prompt, ListQuestion } from 'inquirer';
import { addPrettier, execWithSpinner, installDepsWithPackageManager } from './utils';
import { baseGenerator as reactGenerator } from './generators/react';
import { baseGenerator as expressGenerator } from './generators/express';
import { yarnWorkspaceGenerator } from './generators/yarnWorkspace';
import { nextGenerator } from './generators/next';
import _ from 'lodash';
// import { addPrettier, execWithSpinner, installDepsWithPackageManager } from './utils';

const questions: ListQuestion[] = [
  {
    type: 'list',
    name: 'stack',
    message: '🧙 : Select a core stack for your dApp ...',
    choices: [
      {
        value: 'only-backend',
        name: 'TODO: Only backend      [choice of available backends in step 2.]',
      },
      {
        value: 'next',
        name: 'TODO: NextJS            [only frontend]',
      },
      // {
      //   value: 'react',
      //   name: 'TODO: React             [with a choice of available backends]',
      // },
      // {
      //   value: 'vanilla',
      //   name: 'TODO: Vanilla HTML+JS   [with a choice of available backends]',
      // },
    ],
  },
  {
    type: 'list',
    name: 'backend',
    when(answers) {
      return answers.stack !== 'next';
    },
    message: '🧙 : Select a backend for your dApp ...',
    choices: [
      {
        value: 'express',
        name: 'TODO: Express',
      },
      {
        value: 'firebase',
        name: 'TODO: Firebase',
      },
    ],
  },
];

async function main() {
  const { stack, backend } = await prompt<{
    stack: 'only-backend' | 'next' | 'react' | 'vanilla';
    backend: 'express' | 'firebase' | null;
  }>(questions);

  const isClientServer = stack !== 'next' && stack !== 'only-backend';

  const name = await prompt<{ name: string }>({
    type: 'input',
    name: 'name',
    message: '🧙 : What name would you like to use for your new project? ...',
  }).then((answer) => _.kebabCase(answer.name));

  const destination = join(process.cwd(), name);

  if (isClientServer) {
    await yarnWorkspaceGenerator(name, destination);
  }

  switch (backend) {
    case 'express':
      await expressGenerator(name, destination, isClientServer);
      break;
    case undefined:
      break;
    default:
      throw new Error(`The ${backend} backend is not implemented`);
  }

  switch (stack) {
    case 'react':
      await reactGenerator(name, destination, isClientServer);
      break;
    case 'next':
      await nextGenerator(name, destination);
  }

  const { packageManager } = await prompt({
    type: 'list',
    name: 'packageManager',
    message: '🧙 : Select a package manager for installing dependencies ...',
    choices: ['yarn', 'npm', 'pnpm'],
  });

  await addPrettier(destination);

  await installDepsWithPackageManager(packageManager, destination);

  await execWithSpinner('npm run format', destination, 'Running prettier format');

  console.log(`The ${name} project created successfully\nProject path: ${destination}`);
}
main();
