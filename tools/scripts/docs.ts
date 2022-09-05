import ts from 'typescript';

function extractTypeSignature(filename: string, interfaceName: string) {
  const program: ts.Program = ts.createProgram([filename], { emitDeclarationOnly: true });
  const sourceFile = program.getSourceFile(filename);
  if (!sourceFile) {
    throw new Error('sourceFile empty');
  }
  const typeChecker: ts.TypeChecker = program.getTypeChecker();
  // Get the declaration node you're looking for by it's type name.
  // This condition can be adjusted to your needs
  const statement: ts.Statement | undefined = sourceFile.statements.find(
    (s) => ts.isInterfaceDeclaration(s) && s.name.text === interfaceName,
  );
  //   console.log(statement);
  if (!statement) {
    throw new Error(`Interface: '${interfaceName}' not found in file: '${filename}'`);
  }
  const type: ts.Type = typeChecker.getTypeAtLocation(statement);

  const fields: object[] = [];
  // Iterate over the `ts.Symbol`s representing Property Nodes of `ts.Type`
  for (const prop of type.getProperties()) {
    fields.push({
      name: prop.getName(),
      description: ts.displayPartsToString(prop.getDocumentationComment(typeChecker)),
    });
  }
  return fields;
}

const typeBSignature = extractTypeSignature('./packages/evmApi/src/generated/types.ts', 'operations');
// write to file or console log
console.log(typeBSignature);
/*
type TypeB = {
  prop1: string;
}
 */
