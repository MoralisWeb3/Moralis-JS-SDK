/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable no-console */
// import _ from 'lodash';
import ts from 'typescript';
import { parseTypesOfTargetProperty } from './utils/utils';

function getDescriptionsFromInterface(filename: string, interfaceName: string): Array<any> {
  const program = ts.createProgram([filename], { emitDeclarationOnly: true });
  const sourceFile = program.getSourceFile(filename);
  if (!sourceFile) {
    throw new Error('sourceFile empty');
  }
  const typeChecker = program.getTypeChecker();
  // Get the declaration node you're looking for by it's type name.
  // This condition can be adjusted to your needs
  const statement: ts.Statement | undefined = sourceFile.statements.find(
    (s) => ts.isInterfaceDeclaration(s) && s.name.text === interfaceName,
  );

  if (!statement) {
    throw new Error(`Interface: '${interfaceName}' not found in file: '${filename}'`);
  }
  const type: ts.Type = typeChecker.getTypeAtLocation(statement);

  const fields = [];

  // Iterate over the `ts.Symbol`s representing Property Nodes of `ts.Type`
  for (const prop of type.getProperties()) {
    const targetMethodType = typeChecker.getTypeOfSymbolAtLocation(prop, prop.valueDeclaration!);

    const propObj: any = {
      name: prop.getName(),
      desc: ts.displayPartsToString(prop.getDocumentationComment(typeChecker)),
      parameters: {
        query: [],
        path: [],
      },
      //   response,
    };

    propObj.parameters.query = parseTypesOfTargetProperty(targetMethodType, 'query', typeChecker);
    propObj.parameters.path = parseTypesOfTargetProperty(targetMethodType, 'path', typeChecker);
    propObj.response = parseTypesOfTargetProperty(targetMethodType, 'application/json', typeChecker);
    // console.log(lelX);
    fields.push(propObj);

    // const parameters = targetMethodType.getProperty('parameters');
    // if (!parameters) {
    //   continue;
    // }
    // const parametersType = typeChecker.getTypeOfSymbolAtLocation(parameters, parameters.valueDeclaration!);

    // /**
    //  * Reading "parameters
    //  */
    // propObj.parameters.query = parseProperty(parametersType, 'query', typeChecker);
    // propObj.parameters.path = parseProperty(parametersType, 'path', typeChecker);

    // /**
    //  * Reading response
    //  */

    // const responses = targetMethodType.getProperty('responses');
    // if (!responses) {
    //   continue;
    // }
    // const responsesType = typeChecker.getTypeOfSymbolAtLocation(responses, responses.valueDeclaration!);

    // const wow = parseTypesOfTargetProperty(responsesType, 'application/json', typeChecker);
    // console.log(!!wow);
    // fields.push(propObj);
  }

  return fields;
}

const desc = getDescriptionsFromInterface('./packages/evmApi/src/generated/types.ts', 'operations');
// console.log(desc);
// write to file or console log
console.log('desc: ', JSON.stringify(desc, null, 2));
