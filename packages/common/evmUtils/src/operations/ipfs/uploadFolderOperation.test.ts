import MoralisCore from '@moralisweb3/common-core';
import {
  uploadFolderOperation,
  UploadFolderRequest,
} from './uploadFolderOperation';

const ABI = [
  {
    path: 'moralis/logo.jpg',
    content: 'iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAApgAAAKYB3X3',
  },
];

describe('uploadFolderOperation', () => {
  let core: MoralisCore;

  beforeAll(() => {
    core = MoralisCore.create();
  });

  it('serializeRequest() serializes correctly and deserializeRequest() deserializes correctly', () => {
    const request: Required<UploadFolderRequest> = {
      abi: ABI,
    };

    const serializedRequest = uploadFolderOperation.serializeRequest(request, core);

    expect(serializedRequest.abi).toBe(JSON.stringify(request.abi));

    const deserializedRequest = uploadFolderOperation.deserializeRequest(serializedRequest, core);

    expect(deserializedRequest.abi).toStrictEqual(request.abi);
  });
});
