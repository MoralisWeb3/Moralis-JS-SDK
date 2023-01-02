import path from 'path';

export const DEMO_FOLDER = 'demos';
// Documentation source files
export const DOCS_SRC_FOLDER = 'documentation';
export const DOCS_DOCUMENTS_FOLDER = 'docs';
export enum DocumentsFolders {
  API = 'api',
  DEMOS = 'demos',
}

// Documentation build files
const DOCS_BUILD_FOLDER = 'docs-build';
export enum DocumentsOutFolders {
  DOWNLOADS = 'downloads',
}

const HOSTED_DOCS_URL = 'https://moralisweb3.github.io/Moralis-JS-SDK';
const GITHUB_ROOT = 'https://github.com/MoralisWeb3/Moralis-JS-SDK';
const GITHUB_REF_BRANCH = 'main';

export const DOWNLOAD_COMPRESSION_LEVEL = 9;

const rootPath = path.join(__dirname, '..', '..');

export const paths = {
  projectRoot: rootPath,
  documentationRoot: path.join(rootPath, DOCS_SRC_FOLDER),
  demosRoot: path.join(rootPath, DEMO_FOLDER),
  documentationApi: path.join(rootPath, DOCS_SRC_FOLDER, DOCS_DOCUMENTS_FOLDER, DocumentsFolders.API),
  documentationDemos: path.join(rootPath, DOCS_SRC_FOLDER, DOCS_DOCUMENTS_FOLDER, DocumentsFolders.DEMOS),
  outRoot: path.join(rootPath, DOCS_BUILD_FOLDER),
  outDownloads: path.join(rootPath, DOCS_BUILD_FOLDER, DocumentsOutFolders.DOWNLOADS),
};

export const urls = {
  hostedDocsRoot: HOSTED_DOCS_URL,
  hostedDocsDownloads: `${HOSTED_DOCS_URL}/${DocumentsOutFolders.DOWNLOADS}`,
  githubDemos: `${GITHUB_ROOT}/tree/${GITHUB_REF_BRANCH}/${DEMO_FOLDER}`,
};
