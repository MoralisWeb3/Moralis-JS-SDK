/* eslint-disable no-console */
import ts from 'typescript';

function getDescriptionsFromInterface(filename: string, interfaceName: string) {
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

  const fields: object[] = [];
  // console.log(type.getProperties()?.[0].getDeclarations()[0]);

  // Iterate over the `ts.Symbol`s representing Property Nodes of `ts.Type`
  // for (const prop of type.getProperties()) {
  const prop = type.getProperties()[0];
  const x = typeChecker.getTypeOfSymbolAtLocation(prop, prop.valueDeclaration!);
  // const responses = x.getProperty('responses');
  const parameters = x.getProperty('parameters');
  if (!parameters) {
    return;
  }
  const parametersType = typeChecker.getTypeOfSymbolAtLocation(parameters, parameters.valueDeclaration!);

  const query = parametersType.getProperty('query');
  if (!query) {
    return;
  }

  const queryType = typeChecker.getTypeOfSymbolAtLocation(query, query.valueDeclaration!);
  queryType.getProperties().forEach((property) => {
    const kek = typeChecker.getTypeOfSymbolAtLocation(property, property.valueDeclaration!);
    console.log(typeChecker.typeToString(kek));
  });
  // console.log(typeChecker.typeToString(queryType.getProperties()[0]));
  // const path = parametersType.getProperty('path');
  //@ts-ignore
  // query?.valueDeclaration?.forEachChild((child) => console.log((child?.symbol?.members)));
  //@ts-ignore
  // parameters?.getDeclarations()?.map((parameter) => console.log(parameter?.name?.text));
  // console.log(parameters?.getDeclarations());
  // fields.push({
  //   name: prop.getName(),
  //   description: ts.displayPartsToString(prop.getDocumentationComment(typeChecker)),
  //   type: x.replaceAll('|', ','),
  // });
  // }

  return fields;
}

const desc = getDescriptionsFromInterface('./packages/evmApi/src/generated/types.ts', 'operations');
// write to file or console log
console.log(desc);
