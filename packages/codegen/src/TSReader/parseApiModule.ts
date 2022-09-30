/* eslint-disable no-console */
import ts from 'typescript';
import type { ParseApiModuleParams, SDKMethodParsed } from './types';
import { parseSDKMethod } from './utils/parsers';
import { isDeprecated, getPropertiesOfSymbol, isMethodBlacklisted } from './utils/utils';

const parseApiModule = ({ path, whitelist, className }: ParseApiModuleParams, blacklistedMethods?: string[]) => {
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

  const sdkMethods: SDKMethodParsed[] = [];

  apiModuleClassProps.forEach((domain) => {
    const domainTypeProps = getPropertiesOfSymbol(domain, typeChecker);

    if (!domainTypeProps?.length) {
      const methodName = domain.getName();
      if (isDeprecated(domain) || isMethodBlacklisted(methodName, blacklistedMethods)) {
        return;
      }

      console.warn(`'${methodName}' has no readable methods in '${path}', so it'll be used as method itself`);

      sdkMethods.push(parseSDKMethod(domain, typeChecker, [className.replace('Moralis', '')]));
    }

    domainTypeProps.forEach((method) => {
      if (isDeprecated(method) || isMethodBlacklisted(method.getName(), blacklistedMethods)) {
        return;
      }

      sdkMethods.push(parseSDKMethod(method, typeChecker, [className.replace('Moralis', ''), domain.getName()]));
    });
  });
  return sdkMethods;
};

export default parseApiModule;
