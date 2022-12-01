#!/usr/bin/env node
/* eslint-disable etc/no-commented-out-code */
import { join } from 'path';
import { prompt, ListQuestion } from 'inquirer';
import { addPrettier, execWithSpinner, installDepsWithPackageManager } from './utils';
// import { baseGenerator as reactGenerator } from './generators/react';
// import { baseGenerator as expressGenerator } from './generators/express';
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
        value: 'next',
        name: 'NextJS            [only frontend]',
      },
    ],
  },
  // {
  //   type: 'list',
  //   name: 'backend',
  //   when(answers) {
  //     return answers.stack !== 'next';
  //   },
  //   message: '🧙 : Select a backend for your dApp ...',
  //   choices: [
  //     {
  //       value: 'express',
  //       name: 'TODO: Express',
  //     },
  //     {
  //       value: 'firebase',
  //       name: 'TODO: Firebase',
  //     },
  //   ],
  // },
];

async function main() {
  const { confirmBeta } = await prompt({
    name: 'confirmBeta',
    type: 'confirm',
    message:
      'Note: This tool is still in beta, and in active development. Many changes and updates are coming, which may impact your experience. Reach out to us in forum.moralis.io or in our discord for any feedback.',
  });

  if (!confirmBeta) {
    throw new Error('To use this tool you need to confirm participation in beta');
  }

  const { stack } = await prompt<{
    stack: 'only-backend' | 'next' | 'react' | 'vanilla';
    // backend: 'express' | 'firebase' | null;
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

  // switch (backend) {
  //   case 'express':
  //     await expressGenerator(name, destination, isClientServer);
  //     break;
  //   case undefined:
  //     break;
  //   default:
  //     throw new Error(`The ${backend} backend is not implemented`);
  // }

  switch (stack) {
    // case 'react':
    //   await reactGenerator(name, destination, isClientServer);
    //   break;
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

  console.log(
    `The ${name} project created successfully\nProject path: ${destination}\nWrite 'cd ${name}' and '${packageManager} run dev'`,
  );
}
main();
