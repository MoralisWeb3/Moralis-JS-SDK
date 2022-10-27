import { PropertySignature, SyntaxKind } from 'ts-morph';

export const getPropertiesOfPropertySignature = (propSignature: PropertySignature) => {
  const typeLiteral = propSignature.getFirstChildByKind(SyntaxKind.TypeLiteral);

  if (!typeLiteral) {
    return null;
  }

  return typeLiteral.getProperties();
};

export const getTypeLiteral = (propSignature: PropertySignature) =>
  propSignature.getFirstChildByKindOrThrow(SyntaxKind.TypeLiteral);

export const getPropertyByName = (propSignature: PropertySignature, propName: string) => {
  const typeLiteral = getTypeLiteral(propSignature);
  return typeLiteral.getProperty(propName);
};
