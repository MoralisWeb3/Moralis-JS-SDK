/* eslint-disable @typescript-eslint/no-non-null-assertion */
import _ from 'lodash';
import ts from 'typescript';
import { TParsedType } from '../types';

const iterateUntilGetTargetSymbol = (
  parentProps: ts.Symbol[],
  targetPropertyName: string,
  typeChecker: ts.TypeChecker,
): ts.Symbol | undefined => {
  const [targetProperty] = parentProps.map((parentProp) => {
    const parentPropType = typeChecker.getTypeOfSymbolAtLocation(parentProp, parentProp.valueDeclaration!);
    const targetSymbol = parentPropType.getProperty(targetPropertyName);
    if (!targetSymbol) {
      return iterateUntilGetTargetSymbol(parentPropType.getProperties(), targetPropertyName, typeChecker);
    }
    return targetSymbol;
  });
  return targetProperty;
};

export const getTargetPropertyType = (parentType: ts.Type, targetPropertyName: string, typeChecker: ts.TypeChecker) => {
  const parentProps = parentType.getProperties();

  if (!parentProps) {
    throw new Error('Provided parentType has no properties');
  }

  const targetPropSymbol = iterateUntilGetTargetSymbol(parentProps, targetPropertyName, typeChecker);
  if (!targetPropSymbol) {
    return null;
  }

  return typeChecker.getTypeOfSymbolAtLocation(targetPropSymbol, targetPropSymbol.valueDeclaration!);
};

export const parseTypeProps = (parentType: ts.Type, typeChecker: ts.TypeChecker): TParsedType[] =>
  parentType.getProperties().map((childProp) => {
    return {
      name: _.camelCase(childProp.getName()),
      type: getTypeOfSymbolAndToString(childProp, typeChecker),
    };
  });

export const isDeprecated = (symbol: ts.Symbol) => {
  const docsTags = symbol.getJsDocTags();
  const deprecatedTag = docsTags.find((docsTag) => docsTag.name === 'deprecated');
  return Boolean(deprecatedTag);
};

export const getTypeOfSymbolAndToString = (
  symbol: ts.Symbol,
  typeChecker: ts.TypeChecker,
  flag = ts.TypeFormatFlags.NoTruncation,
) => {
  const type = typeChecker.getTypeOfSymbolAtLocation(symbol, symbol.valueDeclaration!);

  return typeChecker.typeToString(type, undefined, flag);
};

export const getPropertiesOfSymbol = (symbol: ts.Symbol, typeChecker: ts.TypeChecker) => {
  const type = typeChecker.getTypeOfSymbolAtLocation(symbol, symbol.valueDeclaration!);
  return type.getProperties();
};
