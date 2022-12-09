const path = require('path');
const fse = require('fs-extra');
const { buildDocuments } = require('./buildDocuments');
const { buildDemoDocs } = require('./buildDemoDocs');
const { tryChildProcess } = require('./utils/childProcess');

const documentationPath = path.join(__dirname, '..', 'documentation');
const outPath = path.join(__dirname, '..', 'docs-out');
const rootPath = path.join(__dirname, '..');

const run = async () => {
  console.log('⏳ Cleaning generated markdowns...');
  fse.emptyDirSync(path.join(documentationPath, 'docs'));

  console.log('⏳ Cleaning docs-output');
  fse.emptyDirSync(path.join(outPath));

  console.log('⏳ Generating Typedoc markdown files');
  tryChildProcess(`yarn --cwd "${rootPath}" typedoc`);

  console.log('⏳ Building documents..');
  await buildDocuments();

  console.log('⏳ Building demo docs...');
  await buildDemoDocs();

  console.log('⏳ Install dependencies for documentation site...');
  tryChildProcess(`yarn --cwd "${rootPath}" documentation/ install`);

  console.log('⏳ Building documentation site...');
  tryChildProcess(`yarn --cwd "${rootPath}" documentation/ build --out-dir "${outPath}"`);
  console.log('✅ Done!');
};

run();
