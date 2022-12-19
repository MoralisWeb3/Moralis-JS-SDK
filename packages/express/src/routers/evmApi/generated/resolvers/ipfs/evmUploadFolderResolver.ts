import {
  UploadFolderJSONRequest,
  uploadFolderOperation,
} from 'moralis/common-evm-utils';
import { NextFunction, Response, Request } from 'express';
import { OperationResolver } from '@moralisweb3/api-utils';
import Moralis from 'moralis';


type RequestBody = Pick<UploadFolderJSONRequest, | 'abi'>


export const evmUploadFolderResolver  = async (
  req: Request<any, any, RequestBody, any>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { raw } = await new OperationResolver(uploadFolderOperation, Moralis.EvmApi.baseUrl, Moralis.Core).fetch(
      uploadFolderOperation.deserializeRequest({  ...req.body,  }, Moralis.Core),
    );

    return res.send(raw);
  } catch (error) {
    return next(error);
  }
};