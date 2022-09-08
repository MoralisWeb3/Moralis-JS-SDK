/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-non-null-assertion */

import _ from 'lodash';
import ts from 'typescript';
import type { IParseApiModule, TSDKMethodParsed } from './types';
import { parseTypeProps, isDeprecated, getPropertiesOfSymbol } from './utils/utils';

const parseApiModule = ({ path, whitelist, className }: IParseApiModule) => {
  const program = ts.createProgram([path], { emitDeclarationOnly: true });
  const sourceFile = program.getSourceFile(path);

  if (!sourceFile) {
    throw new Error(`SourceFile ${path} is empty`);
  }

  const typeChecker = program.getTypeChecker();

  const apiModuleClass = sourceFile.statements.find((с) => ts.isClassDeclaration(с) && с.name?.text === className);

  if (!apiModuleClass) {
    throw new Error(`'${path}' not found in file: '${path}'`);
  }

  const apiModuleClassType = typeChecker.getTypeAtLocation(apiModuleClass);

  const apiModuleClassProps = apiModuleClassType.getProperties().filter((prop) => whitelist.includes(prop?.name));

  if (!apiModuleClassProps?.length) {
    throw new Error(`'${className}' has no readable properties in '${path}'`);
  }

  const sdkMethods: TSDKMethodParsed[] = [];

  apiModuleClassProps.forEach((domain) => {
    const domainTypeProps = getPropertiesOfSymbol(domain, typeChecker);

    if (!domainTypeProps?.length) {
      console.warn(
        `'${domain.getName()}' has no readable methods in '${path}', so it'll be used as method itself. Ignore this message if it's expected`,
      );
    }

    domainTypeProps.forEach((method) => {
      if (isDeprecated(method)) {
        return;
      }

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
      sdkMethods.push(sdkMethod);
    });
    return sdkMethods;
  });
};

export default parseApiModule;
