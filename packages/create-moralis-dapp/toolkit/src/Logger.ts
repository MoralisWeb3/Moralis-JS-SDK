import ora from 'ora';

export class Logger {
  public static async spinnerPromise<TPromise>(
    promise: PromiseLike<TPromise>,
    options: ora.Options & { successText?: string; failText?: string },
  ) {
    const spinner = ora(options).start();

    try {
      const result = await promise;

      spinner.succeed(options.successText);

      return result;
    } catch (error) {
      spinner.fail(options.failText);

      throw error;
    }
  }
}
