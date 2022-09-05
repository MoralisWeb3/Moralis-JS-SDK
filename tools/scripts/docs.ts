import ts from 'typescript';

function extractTypeSignature(filename: string, aliasName: string) {
  const program: ts.Program = ts.createProgram([filename], { emitDeclarationOnly: true });
  const sourceFile = program.getSourceFile(filename);
  if (!sourceFile) {
    throw new Error('sourceFile empty');
  }
  const typeChecker: ts.TypeChecker = program.getTypeChecker();
  // Get the declaration node you're looking for by it's type name.
  // This condition can be adjusted to your needs
  const statement: ts.Statement | undefined = sourceFile.statements.find(
    (s) => ts.isInterfaceDeclaration(s) && s.name.text === aliasName,
  );
  //   console.log(statement);
  if (!statement) {
    throw new Error(`Type: '${aliasName}' not found in file: '${filename}'`);
  }
  const type: ts.Type = typeChecker.getTypeAtLocation(statement);
  //   console.log(type);
  const fields: string[] = [];
  // Iterate over the `ts.Symbol`s representing Property Nodes of `ts.Type`
  //@ts-ignore
  //   we need getDocumentationComment()
  //   console.log(type.getProperties()[0].getFlags());
  //   for (const prop of type.getProperties()) {
  const prop = type.getProperties()[0];
  const name: string = prop.getName();
  const propType: ts.Type = typeChecker.getTypeOfSymbolAtLocation(prop, statement);
  const propTypeName = typeChecker.typeToString(propType, undefined, ts.TypeFormatFlags.NoTruncation);
  //   console.log(propType.getProperties()[0]);
  function serializeSymbol(symbol: ts.Symbol) {
    return {
      name: symbol.getName(),
      documentation: ts.displayPartsToString(symbol.getDocumentationComment(typeChecker)),
      type: typeChecker.typeToString(
        typeChecker.getTypeOfSymbolAtLocation(symbol, symbol.valueDeclaration!),
        undefined,
        ts.TypeFormatFlags.NoTruncation,
      ),
    };
  }
  const symbol = propType.getProperties()[0];
  const kek = typeChecker.getTypeOfSymbolAtLocation(symbol, symbol.valueDeclaration!);
  console.log((kek.getProperties()[0]));
  //   fields.push(`${name}: ${propTypeName};`);
  //   }
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
