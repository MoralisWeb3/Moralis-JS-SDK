#!/usr/bin/env node
import { join } from 'path';
import { prompt, ListQuestion } from 'inquirer';
import { installDepsWithPackageManager } from './utils';
import { baseGenerator as reactGenerator } from './generators/react';
import { baseGenerator as expressGenerator } from './generators/express';
import { yarnWorkspaceGenerator } from './generators/yarnWorkspace';
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
      {
        value: 'react',
        name: 'TODO: React             [with a choice of available backends]',
      },
      {
        value: 'vanilla',
        name: 'TODO: Vanilla HTML+JS   [with a choice of available backends]',
      },
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

  const { name } = await prompt<{ name: string }>({
    type: 'input',
    name: 'name',
    message: '🧙 : What name would you like to use for your new project? ...',
  });

  const destination = join(process.cwd(), name);

  if (isClientServer) {
    await yarnWorkspaceGenerator(name, destination);
  }

  // let {}

  switch (backend) {
    case 'express':
      await expressGenerator(name, destination, isClientServer);
      break;
    case null:
      break;
    default:
      throw new Error(`The ${backend} backend is not implemented`);
  }

  switch (stack) {
    case 'react':
      await reactGenerator(name, destination, isClientServer);
      break;
  }

  console.log({ stack, backend });

  const { packageManager } = await prompt({
    type: 'list',
    name: 'packageManager',
    message: '🧙 : Select a package manager for installing dependencies ...',
    choices: ['yarn', 'npm', 'pnpm'],
  });

  await installDepsWithPackageManager(packageManager, destination);

  console.log(`The ${name} project created successfully\nProject path: ${destination}`);

  // await execWithSpinner('npm run format', destination, 'Running prettier format');
}
main();
