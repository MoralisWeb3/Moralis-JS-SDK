import { BigNumber } from 'ethers';

import { AbiItem, Log } from '@moralisweb3/streams-typings';
import { JsonFragment, Interface } from '@ethersproject/abi';

export interface ParsedLog {
  name: string;
  params: Record<string, LogParam>;
}

export interface LogParam {
  value: LogParamValue;
  type: string;
}

export type LogParamValue = BigNumber | string;

export class LogParser {
  private readonly abiInterface: Interface;

  public constructor(abiItems: AbiItem[]) {
    this.abiInterface = new Interface(abiItems as JsonFragment[]);
  }

  public read(log: Log): ParsedLog {
    // Solidity supports max 3 topics. https://docs.soliditylang.org/en/latest/contracts.html#events
    const topics = [log.topic0, log.topic1, log.topic2, log.topic3].filter((t) => t !== null) as string[];

    const result = this.abiInterface.parseLog({
      data: log.data,
      topics,
    });

    const params: Record<string, LogParam> = {};

    for (const input of result.eventFragment.inputs) {
      params[input.name] = {
        type: input.type,
        value: result.args[input.name],
      };
    }

    return {
      name: result.name,
      params,
    };
  }
}
