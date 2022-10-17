import { NodePlopAPI } from 'plop';
import autocompletePrompt from 'inquirer-autocomplete-prompt';
import setGenerators from './generators';

// == Types ================================================================

// == Constants ============================================================

// == Exports ==============================================================

export default function (plop: NodePlopAPI) {
  plop.setPrompt('autocomplete', autocompletePrompt);

  setGenerators(plop);
}
