import { PropertySignature, SyntaxKind } from 'ts-morph';

export const getPropertiesOfPropertySignature = (propSignature: PropertySignature) => {
  const typeLiteral = propSignature.getFirstChildByKindOrThrow(SyntaxKind.TypeLiteral);

  return typeLiteral.getProperties();
};

export const getTypeLiteral = (propSignature: PropertySignature) =>
  propSignature.getFirstChildByKindOrThrow(SyntaxKind.TypeLiteral);

export const getPropertyByName = (propSignature: PropertySignature, propName: string) => {
  const typeLiteral = getTypeLiteral(propSignature);
  return typeLiteral.getProperty(propName);
};
