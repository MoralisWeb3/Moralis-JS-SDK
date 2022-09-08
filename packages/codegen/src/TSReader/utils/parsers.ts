/* eslint-disable @typescript-eslint/no-non-null-assertion */
import ts from 'typescript';
import { TSDKMethodParsed } from '../types';
import { parseTypeProps } from './utils';

export const parseSDKMethod = (prop: ts.Symbol, typeChecker: ts.TypeChecker, domainSDKPath: string[]) => {
  const propType = typeChecker.getTypeOfSymbolAtLocation(prop, prop.valueDeclaration!);

  const [propSignature] = typeChecker.getSignaturesOfType(propType, ts.SignatureKind.Call);
  const sdkMethod: TSDKMethodParsed = {
    path: [...domainSDKPath, prop.getName()].join('.'),
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

  sdkMethod.return = parseTypeProps(extractedPromise, typeChecker);

  return sdkMethod;
};
