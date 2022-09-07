/* eslint-disable no-console */
import _ from 'lodash';
import ts from 'typescript';
import { snakeToCamel } from './format';

const getTargetSymbol = (
  parentProps: ts.Symbol[],
  targetPropertyName: string,
  typeChecker: ts.TypeChecker,
): ts.Symbol | undefined => {
  const [targetProperty] = parentProps.map((parentProp) => {
    const parentPropType = typeChecker.getTypeOfSymbolAtLocation(parentProp, parentProp.valueDeclaration!);
    const targetSymbol = parentPropType.getProperty(targetPropertyName);
    if (!targetSymbol) {
      return getTargetSymbol(parentPropType.getProperties(), targetPropertyName, typeChecker);
    }
    return targetSymbol;
  });
  return targetProperty;
};

export const parseTypesOfTargetProperty = (
  parentType: ts.Type,
  targetPropertyName: string,
  typeChecker: ts.TypeChecker,
) => {
  const parentProps = parentType.getProperties();

  if (!parentProps) {
    throw new Error('Provided parentType has no properties');
  }

  const targetPropSymbol = getTargetSymbol(parentProps, targetPropertyName, typeChecker);
  if (!targetPropSymbol) {
    return null;
  }

  const targetPropertyType = typeChecker.getTypeOfSymbolAtLocation(
    targetPropSymbol,
    targetPropSymbol.valueDeclaration!,
  );

  return typeChecker.typeToString(targetPropertyType, undefined, ts.TypeFormatFlags.NoTruncation);
  // const targetPropTypeProps = targetPropertyType.getProperties();

  // return targetPropTypeProps.map((propChild) => {
  //   const propChildType = typeChecker.getTypeOfSymbolAtLocation(propChild, propChild.valueDeclaration!);
  //   return {
  //     name: _.camelCase(propChild.getName()),
  //     type: typeChecker.typeToString(propChildType, undefined, ts.TypeFormatFlags.NoTruncation),
  //   };
  // });
};

export const parseProperty = (parentType: ts.Type, propertyName: string, typeChecker: ts.TypeChecker) => {
  const property = parentType.getProperty(propertyName);
  if (!property) {
    return null;
  }

  const propertyType = typeChecker.getTypeOfSymbolAtLocation(property, property.valueDeclaration!);
  return propertyType.getProperties().map((childProperty) => {
    const kek = typeChecker.getTypeOfSymbolAtLocation(childProperty, childProperty.valueDeclaration!);
    return {
      name: _.camelCase(childProperty.getName()),
      type: snakeToCamel(typeChecker.typeToString(kek, undefined, ts.TypeFormatFlags.NoTruncation)),
    };
  });
};
