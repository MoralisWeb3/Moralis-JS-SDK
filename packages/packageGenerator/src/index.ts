import { OperationV3Parser } from './OperationParser';
import { TypeScriptOutput } from './imported/output/TypeScriptOutput';
import { operations as aptosOperations } from '@moralisweb3/common-aptos-utils';

function main() {
  const output = new TypeScriptOutput();
  const operantionV3Parser = new OperationV3Parser(aptosOperations);
  const parsedOperations = operantionV3Parser.parse();
  console.log(parsedOperations);
}
main();
