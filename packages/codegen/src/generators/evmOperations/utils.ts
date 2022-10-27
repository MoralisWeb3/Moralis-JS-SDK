import _ from 'lodash';
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

export const parseDataType = (name: string, _type: string, _hasQuestion?: boolean) => {
  if (name.includes('address')) {
    return {
      requestType: 'EvmAddressish',
      dataType: 'EvmAddress',
      serialize: (domain: string) => `${domain}.${name}.toString()`,
      deSerialize: (domain: string, core: string) => `EvmAddress.create(${domain}.${_.camelCase(name)}, ${core})`,
    };
  }
  if (name.includes('chain')) {
    return {
      requestType: 'EvmChainish',
      dataType: 'EvmChain',
      serialize: (domain: string) => `EvmChainResolver.resolve(${domain}.${_.camelCase(name)}, core).apiHex`,
      deSerialize: (domain: string, core: string) => `EvmChain.create(${domain}.${_.camelCase(name)}, ${core})`,
    };
  }
  if (name.includes('abi')) {
    return {
      requestType: 'unknown',
      dataType: undefined,
      serialize: (domain: string) => `${domain}.${_.camelCase(name)}`,
      deSerialize: (domain: string, _core: string) => `${domain}.${_.camelCase(name)}`,
    };
  }
  return {
    requestType: undefined,
    dataType: undefined,
    serialize: (domain: string) => `${domain}.${_.camelCase(name)}`,
    deSerialize: (domain: string, _core: string) => `${domain}.${_.camelCase(name)}`,
  };
};
