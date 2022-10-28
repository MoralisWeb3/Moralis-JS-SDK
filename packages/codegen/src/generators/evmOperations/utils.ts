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

// address: EvmAddress.create(request.address, core).lowercase,
// chain: EvmChainResolver.resolve(request.chain, core).apiHex,

export const parseDataType = (name: string, type: string, _hasQuestion?: boolean) => {
  if (name.includes('address')) {
    return {
      requestType: 'EvmAddressish',
      dataType: 'EvmAddress',
      serialize: (domain: string) => `${domain}.${_.camelCase(name)}.toString()`,
      deSerialize: (domain: string, core: string) => `EvmAddress.create(${domain}.${_.camelCase(name)}, ${core})`,
      getRequestUrlParams: () => `EvmAddress.create(request.${_.camelCase(name)}, core).lowercase`,
    };
  }
  if (name.includes('chain')) {
    return {
      requestType: 'EvmChainish',
      dataType: 'EvmChain',
      serialize: (domain: string) => `EvmChainResolver.resolve(${domain}.${_.camelCase(name)}, core).apiHex`,
      deSerialize: (domain: string, core: string) => `EvmChain.create(${domain}.${_.camelCase(name)}, ${core})`,
      getRequestUrlParams: () => `EvmChainResolver.resolve(request.${_.camelCase(name)}, core).apiHex`,
    };
  }
  if (name.includes('abi')) {
    return {
      requestType: 'unknown',
      dataType: undefined,
      serialize: (domain: string) => `${domain}.${_.camelCase(name)}`,
      deSerialize: (domain: string, _core: string) => `${domain}.${_.camelCase(name)}`,
      getRequestUrlParams: () => `request.${_.camelCase(name)}`,
    };
  }

  if (type === 'number') {
    return {
      requestType: undefined,
      dataType: undefined,
      serialize: (domain: string) => `${domain}.${_.camelCase(name)}`,
      deSerialize: (domain: string, _core: string) => `${domain}.${_.camelCase(name)}`,
      getRequestUrlParams: () => `maybe(request.${_.camelCase(name)}, String)`,
    };
  }

  return {
    requestType: undefined,
    dataType: undefined,
    serialize: (domain: string) => `${domain}.${_.camelCase(name)}`,
    deSerialize: (domain: string, _core: string) => `${domain}.${_.camelCase(name)}`,
    getRequestUrlParams: () => `request.${_.camelCase(name)}`,
  };
};
