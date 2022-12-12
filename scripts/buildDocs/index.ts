import { buildDemoDownloads } from './buildDemoDownloads';
import { buildDemoReadmes } from './buildDemoReadmes';
import { prepareBuildDocs, prepareDocsSite } from './prepare';
import { generateTypeDocMarkdownFiles } from './generateTypeDocMarkdownFiles';
import { buildDocumentationSite } from './buildDocumentationSite';

/**
 * NOTE: this requires that `yarn install` and `yarn build` has been run first.
 * Otherwise the demo downloads will not be available.
 *
 * This buids the documentation site with markdowns for:
 * - Demos
 * - Modules as defined in typedoc.json
 * It also creates a downloads page for each demo.
 *
 * To configure the documentation site, see /documentation
 * To configure the markdown generation of the source-code, see /typedoc.json
 */
const main = async () => {
  console.log(`🔥 Building docs (prepare markdown files)`);
  prepareBuildDocs();
  buildDemoReadmes();
  generateTypeDocMarkdownFiles();

  console.log(`\n🔥 Building docs (prepare documentation site)`);
  prepareDocsSite();
  buildDocumentationSite();

  console.log(`\n🔥 Building docs (generating download files)`);
  await buildDemoDownloads();

  console.log(`🏁 buildDocs complete!`);
};

main();
