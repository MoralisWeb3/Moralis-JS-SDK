#!/usr/bin/env node
import { join } from 'path';
import { prompt } from 'inquirer';
import { addPrettier, execWithSpinner, installDepsWithPackageManager } from './utils';
import { yarnWorkspaceGenerator, nextGenerator, expressGenerator } from './generators';
import _ from 'lodash';

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

  const { stack } = await prompt({
    type: 'list',
    name: 'stack',
    message: '🧙 : Select a core stack for your dApp ...',
    choices: [
      {
        value: { stack: 'next', isFrontendWithBackend: false },
        name: 'NextJS            [only frontend]',
      },
      {
        value: { stack: 'expressOnly', isFrontendWithBackend: false },
        name: 'express-server    [no frontend]',
      },
    ],
  });

  const name = await prompt<{ name: string }>({
    type: 'input',
    name: 'name',
    message: '🧙 : What name would you like to use for your new project? ...',
  }).then((answer) => _.kebabCase(answer.name));

  const destination = join(process.cwd(), name);

  if (stack.isFrontendWithBackend) {
    await yarnWorkspaceGenerator(name, destination);
  }

  switch (stack.stack) {
    case 'next':
      await nextGenerator(name, destination);
      break;
    case 'expressOnly':
      await expressGenerator(name, destination, stack.isFrontendWithBackend);
      break;
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
