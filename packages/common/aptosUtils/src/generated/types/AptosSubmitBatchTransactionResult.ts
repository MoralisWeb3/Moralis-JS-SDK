// $ref: #/components/schemas/SubmitBatchTransactionResult
// type: SubmitBatchTransactionResult
// properties:
// - transaction_failures ($ref: #/components/schemas/SubmitBatchTransactionResult/properties/transaction_failures)

export interface AptosSubmitBatchTransactionResultJSON {
  readonly transaction_failures: string[];
}

export interface AptosSubmitBatchTransactionResultInput {
  readonly transactionFailures: string[];
}

export class AptosSubmitBatchTransactionResult {
  public static create(input: AptosSubmitBatchTransactionResultInput | AptosSubmitBatchTransactionResult): AptosSubmitBatchTransactionResult {
    if (input instanceof AptosSubmitBatchTransactionResult) {
      return input;
    }
    return new AptosSubmitBatchTransactionResult(input);
  }

  public static fromJSON(json: AptosSubmitBatchTransactionResultJSON): AptosSubmitBatchTransactionResult {
    const input: AptosSubmitBatchTransactionResultInput = {
      transactionFailures: json.transaction_failures,
    };
    return AptosSubmitBatchTransactionResult.create(input);
  }

  /**
   * @description Summary of the failed transactions
   */
  public readonly transactionFailures: string[];

  private constructor(input: AptosSubmitBatchTransactionResultInput) {
    this.transactionFailures = input.transactionFailures;
  }

  public toJSON(): AptosSubmitBatchTransactionResultJSON {
    return {
      transaction_failures: this.transactionFailures,
    }
  }
}
