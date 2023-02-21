/* eslint-disable no-console */
import { BigNumber } from '@ethersproject/bignumber';
import { AbiItem, Log } from '@moralisweb3/streams-typings';
import { JsonFragment, Interface, Indexed } from '@ethersproject/abi';

export interface ParsedLog {
  name: string;
  params: Record<string, LogParam>;
}

export interface LogParam {
  value: LogParamValue;
  type: string;
}

export type LogParamValue = BigNumber | string | BigNumber[];

export class LogParser {
  private readonly abiInterface: Interface;

  public constructor(abiItems: AbiItem[]) {
    this.abiInterface = new Interface(abiItems as JsonFragment[]);
  }

  public read(log: Log): ParsedLog {
    console.log("the log is", log)
    // Solidity supports max 3 topics. https://docs.soliditylang.org/en/latest/contracts.html#events
    const topics = [log.topic0, log.topic1, log.topic2, log.topic3].filter((t) => t !== null) as string[];

    const result = this.abiInterface.parseLog({
      data: log.data,
      topics,
    });

    const params: Record<string, LogParam> = {};

    for (const input of result.eventFragment.inputs) {
      const {type, name} = input;
      let value = result.args[name];
  
      if (!(value instanceof Indexed)) {
        // If the value is not found and the parameter is not indexed, get the value from the result.args array
        const index = result.eventFragment.inputs.indexOf(input);
        value = result.args[index];
      }
  
      params[name] = {
        type,
        value,
      };
    }

    return {
      name: result.name,
      params,
    };
  }
}