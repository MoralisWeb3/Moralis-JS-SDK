import path from 'path';
import fs from 'fs';
import { paths, urls } from './constants';
import { getAllDemoFolders } from './getAllDemoFolders';

export const getDownloadName = (name: string) => `${name}.zip`;
const getDownloadUrl = (name: string) => `${urls.hostedDocsDownloads}/${getDownloadName(name)}`;
const getGithubUrl = (name: string) => `${urls.githubDemos}/${name}`;

const getDemoReadme = (demoFolder: string) => {
  const readmePath = path.join(paths.demosRoot, demoFolder, 'README.md');

  if (!fs.existsSync(readmePath)) {
    console.log(`❌ No readme found for demo ${demoFolder}, creating empty readme.`);
    return null;
  }

  const readmeData = fs.readFileSync(readmePath, 'utf8');

  return readmeData;
};

const makeMarkdownHeader = (demoName: string) => {
  return `\
[Download](${getDownloadUrl(demoName)})

[View code](${getGithubUrl(demoName)})

---
`;
};

const createDemoMarkdown = (demoName: string, readmeData: string | null) => {
  let markdown = `${makeMarkdownHeader(demoName)}`;

  if (readmeData) {
    // Remove title header
    if (readmeData.startsWith('#')) {
      markdown += readmeData.substring(readmeData.indexOf('\n') + 1);
    } else {
      markdown += readmeData;
    }
  }

  return markdown;
};

const saveDemoMarkdown = (demoName: string, markdown: string) => {
  const output = path.join(paths.documentationDemos, `${demoName}.md`);
  fs.writeFileSync(output, markdown, 'utf-8');
};

export const buildDemoReadme = async (demoName: string) => {
  console.log(`⏳ Building readme for demo ${demoName}...`);

  const readmeData = getDemoReadme(demoName);
  const markdown = createDemoMarkdown(demoName, readmeData);
  saveDemoMarkdown(demoName, markdown);

  console.log(`✅ Saved readme for demo ${demoName}.`);
};

export const buildDemoReadmes = async () => {
  console.log('⏳ Starting buildDemoReadmes');

  const allDemoFolders = getAllDemoFolders();
  allDemoFolders.forEach(buildDemoReadme);

  console.log('✅ Complete buildDemoReadmes');
};
