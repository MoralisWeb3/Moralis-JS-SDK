import { JsonFragment, JsonFragmentType } from '@ethersproject/abi';
import { EvmAddress, EvmAddressish, MoralisServerError, ServerErrorCode } from '@moralisweb3/core/lib';
import ethers, { BigNumberish, Contract, ContractFunction } from 'ethers';
import { assertProvider } from '../assert/assertProvider';

type Params = Record<string, unknown>;
export interface EcecuteFunctionOptions {
  contractAddress: EvmAddressish;
  abi: JsonFragment[];
  functionName: string;
  params?: Params;
  overrides?: {
    value?: BigNumberish;
    from?: EvmAddressish;
    gasLimit?: BigNumberish;
    gasPrice?: BigNumberish;
    nonce?: BigNumberish;
  };
}

const isContractFunction = <Result>(contractFunction: unknown): contractFunction is ContractFunction<Result> => {
  if (!contractFunction) {
    return false;
  }

  return true;
};

// const getParsedInputs = (params: EcecuteFunctionOptions["params"]) => {

// }

const allInputsMatchTopics = (inputs: readonly JsonFragmentType[], topics: string[]) => {
  return inputs.every((input, index) => input.type === topics[index]);
};

const getPossibleTopics = (functionDataArray: JsonFragment[]) => {
  return functionDataArray.map((data) => `${data.name}(${data.inputs?.map((input) => input.type).join(',')})`);
};

const getOverloadedFunctionData = (overloadedFunctionMatch: RegExpMatchArray, abi: EcecuteFunctionOptions['abi']) => {
  const nameWithoutTopics = overloadedFunctionMatch[1];
  const topics = overloadedFunctionMatch[2]
    .split(',')
    .map((topic) => topic.trim())
    .filter((topic) => !!topic);

  const functionDataArray = abi.filter((x) => x.name === nameWithoutTopics);

  if (functionDataArray.length === 0) {
    throw new MoralisServerError({
      code: ServerErrorCode.CONTRACT_EXECUTION_FAILED,
      message: 'Function does not exist in abi',
    });
  }

  const functionData = functionDataArray.find(({ inputs }) => {
    if (!inputs) {
      return false;
    }

    const hasSameInputs = (inputs?.length ?? 0) === topics.length;
    if (!hasSameInputs) {
      return false;
    }

    if (!allInputsMatchTopics(inputs, topics)) {
      return false;
    }

    return true;
  });

  if (!functionData) {
    const errorMessage = `Function with the provided topic does not exist in abi. Possible funcationNames: ${getPossibleTopics(
      functionDataArray,
    ).join(' ,')}`;

    throw new MoralisServerError({
      code: ServerErrorCode.CONTRACT_EXECUTION_FAILED,
      message: errorMessage,
    });
  }

  return functionData;
};

const getFunctionData = (functionName: EcecuteFunctionOptions['functionName'], abi: EcecuteFunctionOptions['abi']) => {
  // Check if function is an overloaded function definition. ex "getMessage(string)", or "getMessage()"
  const overloadedFunctionMatch = functionName.match(/^(.+)\((.*)\)$/);

  if (overloadedFunctionMatch) {
    return getOverloadedFunctionData(overloadedFunctionMatch, abi);
  }

  const functionDataArray = abi.filter((x) => x.name === functionName);

  const hasFunctionData = functionDataArray.length > 0;
  const hasOneFunctionData = functionDataArray.length > 0;

  if (!hasFunctionData) {
    throw new MoralisServerError({
      code: ServerErrorCode.CONTRACT_EXECUTION_FAILED,
      message: 'Function does not exist in abi',
    });
  }

  if (!hasOneFunctionData) {
    const errorMessage = `Multiple function definitions found in the abi. Please include the topic in the functionName. Possible funcationNames: ${getPossibleTopics(
      functionDataArray,
    ).join(' ,')}`;

    throw new MoralisServerError({
      code: ServerErrorCode.CONTRACT_EXECUTION_FAILED,
      message: errorMessage,
    });
  }

  return functionDataArray[0];
};

const assertParams = (functionData: JsonFragment, params: Params = {}) => {
  const missingParams: string[] = [];

  if (!functionData.inputs) {
    return;
  }

  for (const input of functionData.inputs) {
    if (!input.name) {
      continue;
    }

    const value = params[input.name];

    if (value == null) {
      missingParams.push(input.name);
    }
  }

  if (missingParams.length === 0) {
    return;
  }

  throw new MoralisServerError({
    code: ServerErrorCode.CONTRACT_EXECUTION_FAILED,
    message: `Missing values for required parameters: ${missingParams.join(', ')}`,
  });
};

// TODO: add generic types to make sure functionName is defined (and possible return gemeric typed result? Can we use typechain as well?)
// TODO: split up in read and write call (and wrap write call in EvmTransactionReceipt)
export const makeExecutefunction =
  (_provider: null | ethers.providers.JsonRpcSigner) =>
  async <Result>(options: EcecuteFunctionOptions) => {
    const provider = assertProvider(_provider);

    const contractAddress = EvmAddress.create(options.contractAddress);
    const { abi, functionName, params, overrides } = options;

    const functionData = getFunctionData(functionName, abi);
    // const stateMutability = functionData.stateMutability;
    // const isReadFunction = stateMutability === 'view' || stateMutability === 'pure';

    assertParams(functionData, params);
    const parsedParams = (functionData.inputs ?? []).map((input) => {
      if (params && input.name && params[input.name]) {
        return params[input.name];
      }
    });

    const contract = new Contract(contractAddress.checksum, abi).connect(provider);
    const contractMethod = contract[functionName];

    if (!isContractFunction<Result>(contractMethod)) {
      throw new MoralisServerError({
        code: ServerErrorCode.CONTRACT_EXECUTION_FAILED,
        message: 'Provided functionName does not exist',
      });
    }

    const result = contractMethod(...parsedParams, overrides);

    return result;
  };
