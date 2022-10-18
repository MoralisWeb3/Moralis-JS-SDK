import { Application } from 'typedoc';
import { ReadmeTheme } from './theme';

export function load(app: Application) {
  app.renderer.defineTheme('readme', ReadmeTheme);
}

export { ReadmeTheme };
