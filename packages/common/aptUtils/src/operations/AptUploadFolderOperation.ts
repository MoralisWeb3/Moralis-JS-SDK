import { AptIpfsFile, AptIpfsFileJSON, AptIpfsFileInput } from '../types/AptIpfsFile';
import { AptIpfsFileRequest, AptIpfsFileRequestJSON, AptIpfsFileRequestInput } from '../types/AptIpfsFileRequest';

export interface AptUploadFolderOperationRequestJSON {}

export interface AptUploadFolderOperationRequest {
  readonly body?: AptIpfsFileRequestInput[];
}

/**
 * @description Upload multiple files to IPFS and place them in a folder directory.
 */
export const AptUploadFolderOperation = {
  operationId: 'uploadFolder',
  httpMethod: 'post',
  routePattern: '/ipfs/uploadFolder',
  parameterNames: [],
  hasResponse: true,
  hasBody: true,

  parseResponse(json: AptIpfsFileJSON[]): AptIpfsFile[] {
    return json.map((item) => AptIpfsFile.fromJSON(item));
  },

  serializeRequest(request: AptUploadFolderOperationRequest): AptUploadFolderOperationRequestJSON {
    return {};
  },

  serializeBody(request: AptUploadFolderOperationRequest): AptIpfsFileRequestJSON[] | undefined {
    const body = request.body ? request.body.map((item) => AptIpfsFileRequest.create(item)) : undefined;
    return body ? body.map((item) => item.toJSON()) : undefined;
  },
};
