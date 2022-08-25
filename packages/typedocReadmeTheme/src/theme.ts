import { MarkdownTheme } from 'typedoc-plugin-markdown';

import { DeclarationReflection, PageEvent, Reflection } from 'typedoc';
import { getPageTitle } from 'typedoc-plugin-markdown/dist/utils/front-matter';

// reference to https://docs.moralis.io/docs/nodejs-technical-references
const PARENT_ID = '6306b23a7acda000913f9ed7';
// id for the technical references
const CATEGORY_ID = '630696f4ab47c500b41899b7';

export class ReadmeTheme extends MarkdownTheme {
  formatContents(contents: string): string {
    return `${contents
      .replace(/[\r\n]{3,}/g, '\n\n')
      .replace(/!spaces/g, '')
      .replace(/^\s+|\s+$/g, '')}\n`;
  }

  makeFrontMatter(page: PageEvent<Reflection>): string {
    return `---
title: "${this.getTitle(page)}"
category: ${CATEGORY_ID}
parentDoc: ${PARENT_ID}
hidden: false
---
`;
  }
  getTitle(page: PageEvent<Reflection>) {
    if (page.url === this.entryDocument) {
      return page.url === page.project.url ? this.indexTitle || page.model.name : 'Readme';
    }
    if (page.url === 'modules.md' && this.indexTitle) {
      return this.indexTitle;
    }
    return getPageTitle(page as PageEvent<unknown>);
  }

  getRelativeUrl(url: string) {
    return encodeURI(url.replace('.md', ''));
  }

  toUrl(mapping: any, reflection: DeclarationReflection) {
    return `${reflection.getFullName().replace(/[/.]/g, '-').replace('@', '').toLowerCase()}.md`;
  }

  getSlug(page: PageEvent<any>) {
    return page.url.replace(/\.[^.$]+$/, '').replace('/.', '-');
  }

  render(page: PageEvent<Reflection>): string {
    return `${this.makeFrontMatter(page)}${this.formatContents(page.template(page) as string)}`;
  }
}
