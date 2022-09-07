/* eslint-disable no-console */
import _ from 'lodash';
import ts from 'typescript';

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

export const getParsedPropsTypes = (parentType: ts.Type, typeChecker: ts.TypeChecker) =>
  parentType.getProperties().map((childProp) => {
    const childPropType = typeChecker.getTypeOfSymbolAtLocation(childProp, childProp.valueDeclaration!);
    return {
      name: _.camelCase(childProp.getName()),
      type: typeChecker.typeToString(childPropType, undefined, ts.TypeFormatFlags.NoTruncation),
    };
  });

// export const stringifyType = (parentType: ts.Type, typeChecker: ts.TypeChecker) => {}

// return {
//   name: _.camelCase(childProp.getName()),
//   type: typeChecker.typeToString(childPropType, undefined, ts.TypeFormatFlags.NoTruncation),
// };

// const targetPropTypeProps = targetPropertyType.getProperties();

// return targetPropTypeProps.map((propChild) => {
//   const propChildType = typeChecker.getTypeOfSymbolAtLocation(propChild, propChild.valueDeclaration!);
//   return {
//     name: _.camelCase(propChild.getName()),
//     type: typeChecker.typeToString(propChildType, undefined, ts.TypeFormatFlags.NoTruncation),
//   };
// });

// export const parseProperty = (parentType: ts.Type, propertyName: string, typeChecker: ts.TypeChecker) => {
//   const property = parentType.getProperty(propertyName);
//   if (!property) {
//     return null;
//   }

//   const propertyType = typeChecker.getTypeOfSymbolAtLocation(property, property.valueDeclaration!);
//   return propertyType.getProperties().map((childProperty) => {
//     const kek = typeChecker.getTypeOfSymbolAtLocation(childProperty, childProperty.valueDeclaration!);
//     return {
//       name: _.camelCase(childProperty.getName()),
//       type: snakeToCamel(typeChecker.typeToString(kek, undefined, ts.TypeFormatFlags.NoTruncation)),
//     };
//   });
// };
