/* eslint-disable no-console */
import _ from 'lodash';
import ts from 'typescript';
import { getParsedPropsTypes, isDeprecated } from './utils/utils';
//@ts-nocheck

// ============= WhiteList of SDK Domains =======================
const wl = ['nft', 'token', 'defi', 'events', 'transaction', 'balance', 'block', 'resolve', 'ipfs', 'utils'];
// ===============================================================

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
    throw new Error(`'${className}' not found in file: '${filename}'`);
  }

  const statementType: ts.Type = typeChecker.getTypeAtLocation(statement);

  const statementProps = statementType.getProperties().filter((prop) => wl.includes(prop?.name));
  //@ts-ignore
  const sdkMethodsParsed: {
    name: string;
    return: never[];
    params: never[];
  }[] = [];

  statementProps.forEach((prop) => {
    const propType = typeChecker.getTypeOfSymbolAtLocation(prop, prop.valueDeclaration!);
    propType.getProperties().forEach((prop2) => {
      if (isDeprecated(prop2)) {
        return;
      }

      const prop2Type = typeChecker.getTypeOfSymbolAtLocation(prop2, prop.valueDeclaration!);

      const propSignature = typeChecker.getSignaturesOfType(prop2Type, ts.SignatureKind.Call)[0];
      const sdkMethod = {
        name: `${prop.getName()}.${prop2.getName()}`,
        return: [],
        params: [],
      };

      const propParams = propSignature.getParameters();

      const paramsSymbol = propParams.find((p) => p.escapedName === 'params');
      if (paramsSymbol) {
        const paramsType = typeChecker.getTypeOfSymbolAtLocation(paramsSymbol, paramsSymbol.valueDeclaration!);
        //@ts-ignore
        sdkMethod.params = getParsedPropsTypes(paramsType, typeChecker);
      }

      const returnedType = propSignature.getReturnType() as ts.TypeReference;
      const [extractedPromise] = returnedType.typeArguments! as ts.TypeReference[];

      extractedPromise.getProperties().forEach((property) => {
        const name = _.camelCase(property.getName());
        const xxx = typeChecker.getTypeOfSymbolAtLocation(property, property.valueDeclaration!);
        const typex = typeChecker.typeToString(xxx, undefined, ts.TypeFormatFlags.NoTruncation);
        //@ts-ignore
        sdkMethod.return.push({ name, typex });
      });
      sdkMethodsParsed.push(sdkMethod);
    });
  });

  return sdkMethodsParsed;
}

const descs = getDescriptionsFromInterface('./packages/evmApi/src/EvmApi.ts', 'MoralisEvmApi');
console.log(JSON.stringify(descs[0], null, 1));
