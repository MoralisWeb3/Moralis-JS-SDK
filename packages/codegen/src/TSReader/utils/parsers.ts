/* eslint-disable @typescript-eslint/no-non-null-assertion */
import _ from 'lodash';
import ts from 'typescript';
import { TSDKMethodParsed } from '../types';
import { getTypeOfSymbolAndToString, parseTypeProps } from './utils';

export const parseSDKMethod = (prop: ts.Symbol, typeChecker: ts.TypeChecker, domainSDKPath: string[]) => {
  const propType = typeChecker.getTypeOfSymbolAtLocation(prop, prop.valueDeclaration!);

  const [propSignature] = typeChecker.getSignaturesOfType(propType, ts.SignatureKind.Call);
  const sdkMethod: TSDKMethodParsed = {
    path: [...domainSDKPath, prop.getName()].join('.'),
    desc: ts.displayPartsToString(prop.getDocumentationComment(typeChecker)),
    return: [],
    params: [],
  };

  const propParams = propSignature.getParameters();

  const paramsSymbol = propParams.find((p) => p.escapedName === 'params');
  if (paramsSymbol) {
    const paramsType = typeChecker.getTypeOfSymbolAtLocation(paramsSymbol, paramsSymbol.valueDeclaration!);

    sdkMethod.params = parseTypeProps(paramsType, typeChecker);
  }

  const returnedType = propSignature.getReturnType() as ts.TypeReference;

  const [extractedPromise] = returnedType.typeArguments! as ts.TypeReference[];

  extractedPromise.getProperties().forEach((xxx) => {
    if (xxx.getName() === 'result') {
      const le = typeChecker.getTypeOfSymbolAtLocation(xxx, xxx.valueDeclaration!);
      le.getProperties().forEach((ccc) => {
        // if (ccc.getName() === 'gas') {
        const isReq = (ccc.getFlags() & ts.SymbolFlags.Optional) === ts.SymbolFlags.Optional;
        console.log(
          `${_.camelCase(ccc.getName())}${isReq ? ':' : '?:'} ${getTypeOfSymbolAndToString(ccc, typeChecker)}`,
        );
      });
    }
  });

  sdkMethod.return = parseTypeProps(extractedPromise, typeChecker);

  return sdkMethod;
};
