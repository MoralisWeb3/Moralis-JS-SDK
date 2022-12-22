import { NodePlopAPI } from 'plop';
import autocompletePrompt from 'inquirer-autocomplete-prompt';
import setNextGenerators from './next/generators';
import setSdkGenerators from './sdk/generators';
import setExpressGenerators from './express/generators';

// == Types ================================================================

// == Constants ============================================================

// == Exports ==============================================================

export default function (plop: NodePlopAPI) {
  plop.setPrompt('autocomplete', autocompletePrompt);
  setNextGenerators(plop);
  setSdkGenerators(plop);
  setExpressGenerators(plop);
}
