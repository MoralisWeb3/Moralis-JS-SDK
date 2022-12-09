import { MarkdownTheme } from 'typedoc-plugin-markdown';

import { DeclarationReflection, PageEvent, Reflection } from 'typedoc';
import { getPageTitle } from 'typedoc-plugin-markdown/dist/utils/front-matter';

export class ReadmeTheme extends MarkdownTheme {
  publicPath = '/docs';

  formatContents(contents: string): string {
    return `${contents
      .replace(/[\r\n]{3,}/g, '\n\n')
      .replace(/!spaces/g, '')
      .replace(/^\s+|\s+$/g, '')}\n`;
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

  toUrl(mapping: any, reflection: DeclarationReflection) {
    let url = `/${reflection.getFullName().replace(/[.]/g, '/').replace('@', '').toLowerCase()}.md`;
    if (reflection.kindString === 'Module') {
      url = url.replace('.md', '/index.md');
    }
    return url;
  }

  getSlug(page: PageEvent<any>) {
    return page.url.replace(/\.[^.$]+$/, '').replace('/.', '-');
  }

  render(page: PageEvent<Reflection>): string {
    return `${this.formatContents(page.template(page) as string)}`;
  }
}
