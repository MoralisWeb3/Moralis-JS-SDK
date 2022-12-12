const fs = require('fs');
const path = require('path');
const fse = require('fs-extra');

const DOCUMENTS_DIR = 'documents';
const OUT_DIR_DOCS = 'documentation/docs';

const outputDocumentsPath = path.join(__dirname, '..', OUT_DIR_DOCS, DOCUMENTS_DIR);

const ensureCleanOutputDir = async () => {
  await fse.emptyDirSync(outputDocumentsPath);
};

const createContributing = async () => {
  const readme = await fse.readFileSync(path.join(__dirname, '../CONTRIBUTING.md'), 'utf8');
  const readmePath = path.join(outputDocumentsPath, 'CONTRIBUTING.md');

  await fs.writeFileSync(readmePath, readme);
};

const createDocuments = async () => {
  const documents = fs.readdirSync(path.join(__dirname, '../documents'));

  for (const document of documents) {
    const documentPath = path.join(__dirname, '../documents', document);
    const documentContent = await fse.readFileSync(documentPath, 'utf8');

    const outputPath = path.join(outputDocumentsPath, document);
    await fs.writeFileSync(outputPath, documentContent);
  }
};

/**
 * Run all the code
 */
const buildDocuments = async () => {
  await ensureCleanOutputDir();

  await createContributing();
  await createDocuments();
};

module.exports = { buildDocuments };
