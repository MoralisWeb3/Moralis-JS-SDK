/* eslint-disable no-console */
//@ts-nocheck
import _ from 'lodash';
import ts from 'typescript';

function getDescriptionsFromInterface(filename: string, className: string) {
  const program = ts.createProgram([filename], { emitDeclarationOnly: true });
  const sourceFile = program.getSourceFile(filename);
  if (!sourceFile) {
    throw new Error('sourceFile empty');
  }
  const typeChecker = program.getTypeChecker();
  // Get the declaration node you're looking for by it's type name.
  // This condition can be adjusted to your needs
  const statement: ts.Statement | undefined = sourceFile.statements.find(
    (s) => ts.isClassDeclaration(s) && s.name?.text === className,
  );

  if (!statement) {
    throw new Error(`Class: '${className}' not found in file: '${filename}'`);
  }

  const type: ts.Type = typeChecker.getTypeAtLocation(statement);

  const wl = ['native', 'account', 'defi', 'token'];
  const props = type.getProperties().filter((prop) => wl.includes(prop?.name));

  for (const prop of props) {
    console.log('specter: ', prop.getName());
    const propType = typeChecker.getTypeOfSymbolAtLocation(prop, prop.valueDeclaration!);
    const kek = propType.getProperties().map((prop2) => {
      const prop2Type = typeChecker.getTypeOfSymbolAtLocation(prop2, prop.valueDeclaration!);
      const propSignature = typeChecker.getSignaturesOfType(prop2Type, ts.SignatureKind.Call)[0];
      const obj = {
        name: prop2.getName(),
        return: [],
      };

      const returnedType = propSignature.getReturnType() as ts.TypeReference;
      const [extractedPromise] = returnedType.typeArguments! as ts.TypeReference[];
      const [extractedApiResultAdapter] = extractedPromise.typeArguments! as ts.TypeReference[];
      extractedApiResultAdapter.getProperties().forEach((property) => {
        const name = _.camelCase(property.getName());
        const xxx = typeChecker.getTypeOfSymbolAtLocation(property, property.valueDeclaration!);
        const typex = typeChecker.typeToString(xxx, undefined, ts.TypeFormatFlags.NoTruncation);
        //@ts-ignore
        obj.return.push({ name, typex });
      });
      console.log('obj: ', obj);
      //   }
    });
    console.log(!!kek);
  }
}

getDescriptionsFromInterface('./packages/evmApi/src/EvmApi.ts', 'MoralisEvmApi');
// write to file or console log
// console.log(desc);

//   console.log(kek);
//   console.log(typeChecker.typeToString(propType, undefined, TypeFormatFlags.NoTruncation));
//   }

//   // Iterate over the `ts.Symbol`s representing Property Nodes of `ts.Type`
//   // for (const prop of type.getProperties()) {
//   const prop = type.getProperties()[0];
//   const x = typeChecker.getTypeOfSymbolAtLocation(prop, prop.valueDeclaration!);
//   // const responses = x.getProperty('responses');
//   const parameters = x.getProperty('parameters');
//   if (!parameters) {
//     return;
//   }
//   const parametersType = typeChecker.getTypeOfSymbolAtLocation(parameters, parameters.valueDeclaration!);

//   const query = parametersType.getProperty('query');
//   if (!query) {
//     return;
//   }

//   const queryType = typeChecker.getTypeOfSymbolAtLocation(query, query.valueDeclaration!);
//   queryType.getProperties().forEach((property) => {
//     const kek = typeChecker.getTypeOfSymbolAtLocation(property, property.valueDeclaration!);
//     console.log(typeChecker.typeToString(kek));
//   });
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

//   return fields;
