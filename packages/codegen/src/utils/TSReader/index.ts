/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable no-console */

// import { writeJsonSync } from 'fs-extra';
import ts from 'typescript';
import { getParsedPropsTypes, getTargetPropertyType } from './utils/utils';

function parseGeneratedOpenApiActions(filename: string): Array<any> {
  const interfaceName = 'operations';
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

    const queryType = getTargetPropertyType(targetMethodType, 'query', typeChecker);
    const pathType = getTargetPropertyType(targetMethodType, 'path', typeChecker);
    const respType = getTargetPropertyType(targetMethodType, 'application/json', typeChecker);

    const propObj = {
      name: prop.getName(),
      desc: ts.displayPartsToString(prop.getDocumentationComment(typeChecker)),
      parameters: {
        query: queryType && getParsedPropsTypes(queryType, typeChecker),
        path: pathType && getParsedPropsTypes(pathType, typeChecker),
      },
      response: respType && typeChecker.typeToString(respType),
    };

    fields.push(propObj);
  }

  return fields;
}

const desc = parseGeneratedOpenApiActions('./packages/evmApi/src/generated/types.ts');

// writeJsonSync(file, object[, options] [, callback])

// console.log(desc);
// write to file or console log
console.log('desc: ', JSON.stringify(desc, null, 2));
