import ts from 'typescript';
import { TSDKMethodParsed } from '../types';

const xxx = (symbol: ts.Symbol, typeChecker: ts.TypeChecker) => {
  const methodType = typeChecker.getTypeOfSymbolAtLocation(method, domain.valueDeclaration!);

  const [propSignature] = typeChecker.getSignaturesOfType(methodType, ts.SignatureKind.Call);
  const sdkMethod: TSDKMethodParsed = {
    path: `${className.replace('Moralis', '')}.${domain.getName()}.${method.getName()}`,
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
};
